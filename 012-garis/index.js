(function(global) {

    var canvas, gl, program;

    glUtils.SL.init({ callback:function() { main(); }});
    
    function main() {
        // Mendaftarkan Callback di atas ke Window's Event Listener
        window.addEventListener('resize', resizer);

        // Mendapatkan elemen Canvas, lalu cek apakah WebGL tersedia
        canvas = document.getElementById('glcanvas'),
        gl = glUtils.checkWebGL(canvas);

        // Menginisialisasi Shaders dan Program
        var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
            fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
        
        program = glUtils.createProgram(gl, vertexShader, fragmentShader);
        gl.useProgram(program);
        resizer();
    }

    function resizer() {
        // Callback ketika layar berubah ukurannya
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Mode Viewport berikut akan manarik ulur ukuran objek 
        //gl.viewport(0, 0, canvas.width, canvas.height);

        // Mode Viewport berikut akan menjaga posisi dan proporsi ukuran objek
        var viewwidth = 0;
        var viewheight = 0;
        var leftpadding = 0;
        var toppadding = 0;
        if (canvas.width <= canvas.height) {
            viewwidth = viewheight = canvas.width;
            toppadding = (canvas.height - viewheight) / 2;
        } else {
            viewwidth = viewheight = canvas.height;
            leftpadding = (canvas.width - viewwidth) / 2;
        }
        gl.viewport(leftpadding, toppadding, viewwidth, viewheight);

        // Lakukan penggambaran
        render();
    }

    function render() {
        // Menuliskan posisi verteks-verteks ke sebuah Vertex Shader
        var n = initBuffers();
        if (n < 0) {
            console.log('Gagal mengatur posisi verteks-verteks');
            return;
        }

        // Bersihkan ke warna biru
        gl.clearColor(0, 0, 1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Gambar garis-garis
        // gl.drawArrays(gl.LINES, 0, n);          // n garis dihasilkan oleh 2n verteks
        // gl.drawArrays(gl.LINE_STRIP, 0, n);     // n garis dihasilkan oleh n+1 verteks
        gl.drawArrays(gl.LINE_LOOP, 0, n);      // n garis dihasilkan oleh n verteks
    }

    function initBuffers() {
        
        var vertices = new Float32Array([
            -0.5, -0.5,
            -0.5, +0.5,
            0.0, +0.5,
            0.0, 0.0,
            +0.5, -0.5
        ]);
        
        // Jumlah verteks
        var n = 5;

        // Membuat sebuah objek Buffer
        var vertexBuffer = gl.createBuffer();
        if (!vertexBuffer) {
            console.log('Gagal membuat objek Buffer');
            return -1;
        }

        // Mengikatkan objek Buffer ke target
        //  target: ARRAY_BUFFER, ELEMENT_ARRAY_BUFFER
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        // Menuliskan data ke objek Buffer
        //  target, size,
        //  usage: STATIC_DRAW, STREAM_DRAW, DYNAMIC_DRAW
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        var aPosition = gl.getAttribLocation(program, 'aPosition');
        if (aPosition < 0) {
            console.log('Gagal mendapatkan lokasi penyimpanan aPosition');
            return -1;
        }

        // Menugaskan objek Buffer ke variabel aPosition
        //  index, size, type, normalized, stride, pointer
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
        // Mengaktifkan penugasan ke variabel aPosition
        gl.enableVertexAttribArray(aPosition);

        return n;
    }

    // Callback ketika layar berubah ke mode penuh
    function onFullScreenChange() {
        if (!document.fullscreenElement &&
            !document.mozFullScreenElement &&
            !document.webkitFullscreenElement &&
            !document.msFullscreenElement) {
                resizer();
            }
    }
    document.addEventListener('fullscreenchange', onFullScreenChange);
    document.addEventListener('mozfullscreenchange', onFullScreenChange);
    document.addEventListener('webkitfullscreenchange', onFullScreenChange);

    // Fungsi berikut adalah yang dipanggil ketika tombol 'full screen' dipencet
    global.fullscreen = function() {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.msRequestFullscreen) {
            canvas.msRequestFullscreen();
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        } else if (canvas.mozRequestFullScreen) {
            canvas.mozRequestFullScreen();
        }
    }
})(window || this);
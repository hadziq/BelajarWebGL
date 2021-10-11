(function(global) {

    var canvas, gl, program, points = [];

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
        
        var aPosition = gl.getAttribLocation(program, 'aPosition');
        var uFragColor = gl.getUniformLocation(program, 'uFragColor');

        // UI events
        canvas.addEventListener('mousedown', function (event) {
            onMouseDown(event, aPosition, uFragColor);
        })

        resizer();
    }

    function onMouseDown(event, aPosition, uFragColor) {
        var point = uiUtils.pixelInputToGLCoord(event, canvas);
        point.c = [Math.random(), Math.random(), Math.random(), 1.0];
        points.push(point);
        render(aPosition, uFragColor);
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

    function render(aPosition, uFragColor) {
        // Bersihkan ke warna biru tua
        gl.clearColor(0, 0, 0.2, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Gambar titik-titik pada posisi yang telah diklik
        for (var i = 0; i < points.length; i++) {
            var point = points[i], color = point.c;
            // Lewatkan data posisi titik ke variabel aPosition di vertex shader
            gl.vertexAttrib3f(aPosition, point.x, point.y, 0.0);
            // Lewatkan data warna titik ke variabel uFragColor di fragment shader
            console.log("color: " + color);
            gl.uniform4f(uFragColor, color[0], color[1], color[2], color[3]);
            // Gambarkan
            gl.drawArrays(gl.POINTS, 0, 1);
        }
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
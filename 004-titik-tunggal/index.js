(function() {

    var VSHADER_SOURCE = `
        void main() {
            gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
            gl_PointSize = 10.0;
        }
    `;

    var FSHADER_SOURCE = `
        void main() {
            gl_FragColor = vec4(0.5019607843137255, 0.0, 0.0, 1.0);
            // warna merah maroon
        }
    `;
    
    // Dapatkan elemen Canvas, lalu cek apakah WebGL tersedia
    var canvas = document.getElementById('glcanvas'),
        gl = glUtils.checkWebGL(canvas),

        // inisialisasi Shaders dan Program
        vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, VSHADER_SOURCE),
        fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, FSHADER_SOURCE),
        program = glUtils.createProgram(gl, vertexShader, fragmentShader);

    gl.useProgram(program);

    // Bersihkan ke warna hitam
    gl.clearColor(0, 0, 0, 1);

    // Bersihkan Canvas' buffer
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Gambar sebuah titik
    gl.drawArrays(gl.POINTS, 0, 1);
})();
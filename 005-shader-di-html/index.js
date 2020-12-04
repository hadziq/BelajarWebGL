(function() {

    glUtils.SL.sourceFromHtml();
    var VSHADER_SOURCE = glUtils.SL.Shaders.v1.vertex;
    var FSHADER_SOURCE = glUtils.SL.Shaders.v1.fragment;
    
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
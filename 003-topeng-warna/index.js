(function() {
    
    var canvas = document.getElementById('glcanvas'),
        gl = glUtils.checkWebGL(canvas);

    // Bersihkan ke warna hitam
    gl.clearColor(1, 0, 0, 1);

    // Matikan kanal warna merah! -> walhasil jadi hitam
    gl.colorMask(false, true, true, true);

    // Bersihkan Canvas' buffer
    gl.clear(gl.COLOR_BUFFER_BIT);
})();
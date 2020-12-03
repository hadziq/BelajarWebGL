(function() {
    
    var canvas = document.getElementById('glcanvas'),
        gl = glUtils.checkWebGL(canvas);

    console.log(gl.getContextAttributes());
    console.log(gl);

    // Bersihkan ke warna hitam
    gl.clearColor(0, 0, 0, 1);

    // Bersihkan Canvas' buffer
    gl.clear(gl.COLOR_BUFFER_BIT);
})();
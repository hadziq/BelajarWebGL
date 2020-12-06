(function() {

    glUtils.SL.init({ callback:function() { main(); }});
    
    function main() {
        // Dapatkan elemen Canvas, lalu cek apakah WebGL tersedia
        var canvas1 = document.getElementById('glcanvas1'),
            canvas2 = document.getElementById('glcanvas2'),
            canvas3 = document.getElementById('glcanvas3'),
            canvas4 = document.getElementById('glcanvas4'),
            gl1 = glUtils.checkWebGL(canvas1),
            gl2 = glUtils.checkWebGL(canvas2),
            gl3 = glUtils.checkWebGL(canvas3),
            gl4 = glUtils.checkWebGL(canvas4);

        // Bersihkan ke warna hitam
        gl1.clearColor(0, 0, 0, 1);

        // Bersihkan Canvas' buffer
        gl1.clear(gl1.COLOR_BUFFER_BIT);

        // Bersihkan ke warna merah
        gl2.clearColor(1, 0, 0, 1);

        // Bersihkan Canvas' buffer
        gl2.clear(gl2.COLOR_BUFFER_BIT);

        // Bersihkan ke warna hijau
        gl3.clearColor(0, 1, 0, 1);

        // Bersihkan Canvas' buffer
        gl3.clear(gl3.COLOR_BUFFER_BIT);

        // Bersihkan ke warna biru
        gl4.clearColor(0, 0, 1, 1);

        // Bersihkan Canvas' buffer
        gl4.clear(gl4.COLOR_BUFFER_BIT);
    }
})();
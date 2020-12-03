(function(global) {

    var glUtils = {
        VERSION: '0.0.1',
        checkWebGL: function(canvas) {
            
            // Cek apakah WebGl tersedia di peramban
            var contexts = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"],
                gl;
            for (let i = 0; i < contexts.length; i++) {
                try {
                    gl = canvas.getContext(contexts[i]);
                } catch (e) {}
                if (gl) {
                    break;
                }
            }
            if (!gl) {
                alert("Maaf, WebGL tidak tersedia di peramban ini. Silakan unduh versi terbaru dari Chrome atau Firefox.");
            }
            return gl;
        }
    }

    // Mengekspos glUtils secara global
    global.glUtils = glUtils;
})(window || this);
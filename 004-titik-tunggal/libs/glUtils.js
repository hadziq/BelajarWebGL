(function(global) {

    var glUtils = {

        VERSION: '0.0.1',

        checkWebGL: function(canvas) {
            
            // Cek apakah WebGl tersedia di peramban
            var contexts = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"],
                gl;
            for (let i = 0; i < contexts.length; i++) {
                try {
                    //gl = canvas.getContext(contexts[i]);
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
        },

        getShader: function(gl, type, source) {
            
            // Mendapatkan, mengompilasi, dan mengembalikan sebuah objek Shader termaktub
            var shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);

            // Cek apakah kompilasi berhasil?
            //  API: 
            //  gl.SHADER_TYPE, gl.DELETE_STATUS, gl.COMPILE_STATUS
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.log("Terjadi kesalahan saat mengompilasi Shaders: " + gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        },

        createProgram: function(gl, vertexShader, fragmentShader) {
            
            // Membuat dan mengembalikan sebuah program Shader
            var program = gl.createProgram();
            gl.attachShader(program, vertexShader);

            // API:
            // gl.detachShader(program, shader):
            //  harus dilakukan sebelum me-Link program
            //gl.detachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);

            // Cek bahwa program Shader telah dapat di-Link-kan ke WebGL
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                var error = gl.getProgramInfoLog(program);
                console.log('Gagal me-Link program: ' + error);
                gl.deleteProgram(program);
                gl.deleteShader(fragmentShader);
                gl.deleteShader(vertexShader);
                return null;
            }

            // API:
            // gl.isProgram(program)
            // gl.isShader(shader)
            console.log(gl.isShader(vertexShader));
            //console.log(gl.isShader(program));
            console.log(gl.isProgram(program));

            // API:
            // gl.getAttachedShaders(program);
            // gl.getShaderSource
            console.log(gl.getAttachedShaders(program));
            var shaders = gl.getAttachedShaders(program);
            for (var i=0; i<shaders.length; i++) {
                console.log(gl.getShaderSource(shaders[i]));
            }

            // Validasi dan gunakan
            gl.validateProgram(program);
            if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
                var error = gl.getProgramInfoLog(program);
                console.log('Gagal memvalidasi program: ' + error);
                gl.deleteProgram(program);
                gl.deleteShader(fragmentShader);
                gl.deleteShader(vertexShader);
                return null;
            }

            return program;
        }
    }

    // Mengekspos glUtils secara global
    global.glUtils = glUtils;
})(window || this);
function checkWebGL(canvas) {

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

function main() {

    var canvas = document.getElementById("glcanvas"),
        gl = checkWebGL(canvas);

    // Bersihkan ke warna hitam
    gl.clearColor(0, 0, 0, 1);

    // Bersihkan Canvas' buffer
    gl.clear(gl.COLOR_BUFFER_BIT);
}
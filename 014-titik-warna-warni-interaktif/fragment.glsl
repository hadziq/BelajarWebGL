precision mediump float;

// Uniforms dikirimkan ke vertex shader dan fragment shader
//  dan mengandung nilai yang sama di sepanjang jalannya frame
//  saat dirender. Contoh aplikasi lain yang potensial adalah posisi cahaya
uniform vec4 uFragColor;

void main()
{
    gl_FragColor=uFragColor;
}
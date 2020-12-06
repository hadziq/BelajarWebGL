// Meskipun tipe data di JS adalah vec3,
//  GLSL mampu menangkapnya secara otomatis sebagai vec4
attribute vec4 aPosition;
void main()
{
    gl_Position=vec4(aPosition);
    gl_PointSize=10.;
}
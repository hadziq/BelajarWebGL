KONSEP:

- API: getContextAttributes

Atribut-atribut:

- alpha
  - Jika nilainya "true", maka Drawing Buffer memiliki sebuah kanal Alpha agar OpenGL di lokasi tujuan dapat melakukan operasi Alpha dan Composite dengan halaman aplikasi. Jika nilainya "false", maka Alpha Buffer tidak disediakan.
- depth
  - Jika nilainya "true", maka Drawing Buffer memiliki sebuah Depth Buffer sekurang-kurangnya 16 bits. Jika nilainya "false", maka Depth Buffer tidak disediakan.
- stencil
  - Jika nilainya "true", maka Drawing Buffer memiliki sebuah Stencil Buffer sekurang-kurangya 8 bits. Jika nilainya "false", maka Stencil Buffer tidak disediakan.
- antialias
  - Jika nilanya "true" dan implementasi mendukung Antialiasing, maka Drawing Buffer akan melakukan Antialiasing menggunakan teknik Multisample/Supersample. Jika nilainya "false" atau implementasi tidak mendukung Antialiasing, maka Antialiasing tidak dilakukan.
- premultipliedAlpha
  - Jika nilainya "true", maka Page Compositor akan mengasumsikan Drawing Buffer mengandung warna-warna dengan Premultiplied Alpha. Jika nilainya "false", maka Page Compositor akan mengasumsikan bahwa warna-warna di Drawing Buffer tidak ter-Premultiplied. Penanda ini diabaikan jika penandanya "false".

TODO: Selesaikan dokumentasi atributnya

(function(global){

    var uiUtils = {
        VERSION: '0.0.1',
        pixelInputToGLCoord: function (event, canvas) {
            // Temukan x dan y dari lokasi klik
            var x = event.clientX, y = event.clientY;
    
            // Hitung midX dan midY
            var midX = canvas.width/2, midY = canvas.height/2;
    
            // Dapatkan kotak pembatas dari target klik tetikus (object Canvas)
            var rect = event.target.getBoundingClientRect();
    
            // Konversikan nilai x dan y ke ruang WebGL = antara -1.0 dan 1.0
            // Jika misalkan kondisi lebar dan tinggi adalah 640 x 480, maka
            //  (x - 0) - midpoint => -/+ dari 0 (-320 ke 320) => / midpoint = -1.0 sampai 1.0
            x = ((x - rect.left) - midX) / midX;
    
            // midpoint - (y-0) -> -/+ dari 0 (-240 ke +240) => / midpoint = -1.0 sampai 1.0
            y = (midY - (y - rect.top)) / midY;
    
            console.log(x + " " + y);

            return {
                x: x,
                y: y
            }
        }
    }

    global.uiUtils = uiUtils;

}(window || this));
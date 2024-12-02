let fileInput = document.getElementById('file-input');
let scanButton = document.getElementById('scan-button');
let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let result = document.getElementById('result');

// Add event listener to file input
fileInput.addEventListener('change', (e) => {
    // Get the selected file
    let file = fileInput.files[0];
    
    // Create a new image object
    let img = new Image();
    
    // Set the image source to the selected file
    img.src = URL.createObjectURL(file);
    
    // Add event listener to the image object
    img.onload = () => {
        // Get the image width and height
        let width = img.width;
        let height = img.height;
        
        // Set the canvas width and height
        canvas.width = width;
        canvas.height = height;
        
        // Get the 2D drawing context of the canvas
        let ctx = canvas.getContext('2d');
        
        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0);
        
        // Get the canvas data URL
        let dataURL = canvas.toDataURL();
// Decode the QR code
decodeQRCode(dataURL);
};
});

// Add event listener to scan button
scanButton.addEventListener('click', () => {
// Get access to the user's camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        // Set the video source to the user's camera
        video.srcObject = stream;
        
        // Play the video
        video.play();
        
        // Add event listener to the video object
        video.addEventListener('canplay', () => {
            // Get the video width and height
            let width = video.videoWidth;
            let height = video.videoHeight;
            
            // Set the canvas width and height
            canvas.width = width;
            canvas.height = height;
            
            // Get the 2D drawing context of the canvas
            let ctx = canvas.getContext('2d');
            
            // Draw the video on the canvas
            ctx.drawImage(video, 0, 0);
            
            // Get the canvas data URL
            let dataURL = canvas.toDataURL();
            
            // Decode the QR code
            decodeQRCode(dataURL);
        });
    })
    .catch((error) => {
        console.error('Error accessing camera:', error);
    });
});

// Function to decode QR code
function decodeQRCode(dataURL) {
// Use the jsQR library to decode the QR code
let code = jsQR(dataURL, canvas.width, canvas.height);

// Check if the QR code was decoded successfully
if (code) {
    // Display the decoded QR code data
    result.textContent = code.data;
} else {
    // Display an error message
    result.textContent = 'Error decoding QR code';
}
}


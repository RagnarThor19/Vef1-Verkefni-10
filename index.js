let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let audioBuffer;

// Function to load the audio file
function loadAudio() {
    fetch('sounds/BRUH (MEME) Sound Effect.mp3')
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(decodedAudio => {
            audioBuffer = decodedAudio;
        });
}

// Call this function when the script loads to ensure the audio is ready to play
loadAudio();

let count = 0;

document.getElementById("increaseButton").onclick = function() {
    count++;
    document.getElementById("countLabel").innerHTML = count;

    // Play the sound using Web Audio API
    let source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
};

// Ensure that the audio context is resumed on user interaction due to browser restrictions
document.addEventListener('click', function() {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
});

let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let audioBuffer;

function loadAudio() {
    fetch('sounds/BRUH (MEME) Sound Effect.mp3')
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(decodedAudio => {
            audioBuffer = decodedAudio;
        });
}

loadAudio();

let count = 0;

document.getElementById("increaseButton").onclick = function() {
    count++;
    document.getElementById("countLabel").innerHTML = count;

    //Spila hljóðið með að nota Web Audio API
    let source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
};

//passar að hljóðið heldur áfram
document.addEventListener('click', function() {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
});

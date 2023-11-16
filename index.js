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
    //gera þannig að það bætist alltaf 1 við, svo seinna 2, svo seinna 3...
    let increment = 1;
    if (count >= 100000) {
        increment = 1000;
    } else if (count >= 10000) {
        increment = 100;
    } else if (count >= 1000) {
        increment = 10;
    } else if (count >= 500) {
        increment = 5;
    } else if (count >= 300) {
        increment = 3;
    } else if (count >= 100) {
        increment = 2;
    }

    count += increment;
    document.getElementById("countLabel").innerHTML = count;

    // Spila hljóðið með Web Audio API
    let source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
};

//passa að hljóðið heldur áfram
document.addEventListener('click', function() {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
});

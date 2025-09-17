let progress = document.getElementById('progress');
let song = document.getElementById('song');
let play = document.getElementById('play');


song.onloadedmetadata = function() {
    progress.max = song.duration;
    progress.value = song.currentTime;
}

function playPause() {
    if (play.classList.contains('fa-pause')) {
        song.pause();
        play.classList.remove('fa-pause');
        play.classList.add('fa-play');
    } else {
        song.play();
        play.classList.add('fa-pause');
        play.classList.remove('fa-play');
    }
}

if(song.play()){
    setInterval(() => {
        progress.value = song.currentTime;
    }, 500);
}

progress.onchange = function() {
    song.play();
    song.currentTime = progress.value;
    play.classList.add('fa-pause');
    play.classList.remove('fa-play');
}
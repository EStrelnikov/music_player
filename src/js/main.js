import { Playlist } from "./playlist.js";
import { store } from "./store.js";

const now_playing = document.querySelector(".now-playing");
const track_name = document.querySelector(".track-name");
const playpause_btn = document.querySelector(".playpause-track");
const next_btn = document.querySelector(".next-track");
const prev_btn = document.querySelector(".prev-track");
const seek_slider = document.querySelector(".seek_slider");
const volume_slider = document.querySelector(".volume_slider");
const curr_time = document.querySelector(".current-time");
const total_duration = document.querySelector(".total-duration");
const curr_track = document.createElement("audio");
const wavesContainer = document.querySelector(".audio-player__waves");
const playlistContainer = document.querySelector(".playlist");

const playlist = new Playlist();
playlist.render();

let updateTimer;

const wavesurfer = WaveSurfer.create({
  container: wavesContainer,
  waveColor: "#4F4A85",
  progressColor: "#383351",
});
wavesurfer.setVolume(0);

seek_slider.addEventListener("change", () => seekTo());
wavesurfer.addEventListener("interaction", (e) => seekTo(e));
volume_slider.addEventListener("change", () => setVolume());
prev_btn.addEventListener("click", () => prevTrack());
next_btn.addEventListener("click", () => nextTrack());
playpause_btn.addEventListener("click", () => playpauseTrack());
playlistContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("item")) return;
  const idItem = Number(e.target.id);
  store.isPlaying = true;
  store.track_index = idItem;
  loadTrack(idItem);
  playpause_btn.children[0].src = "../assets/img/pause.svg";
});

loadTrack(store.track_index);

async function loadTrack(track_index) {
  curr_track.pause();
  clearInterval(updateTimer);
  reset();
  await wavesurfer.load(store.music_list[track_index].src);
  curr_track.src = store.music_list[track_index].src;
  curr_track.load();
  wavesurfer.seekTo(0);
  store.isPlaying ? wavesurfer.play() : wavesurfer.pause();
  track_name.textContent = store.music_list[track_index].name;
  now_playing.textContent =
    "Playing music " +
    (store.track_index + 1) +
    " of " +
    store.music_list.length;
  updateTimer = setInterval(setUpdate, 1000);
  if (store.isPlaying) curr_track.play();
  curr_track.addEventListener("ended", nextTrack);
  playlist.update(track_index);
  localStorage.setItem("track_index", track_index);
}

function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function playpauseTrack() {
  store.isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  wavesurfer.play();
  curr_track.play();
  store.isPlaying = true;
  playpause_btn.children[0].src = "../assets/img/pause.svg";
}

function pauseTrack() {
  wavesurfer.pause();
  curr_track.pause();
  store.isPlaying = false;
  playpause_btn.children[0].src = "../assets/img/play.svg";
}

function nextTrack() {
  store.track_index < store.music_list.length - 1
    ? (store.track_index += 1)
    : (store.track_index = 0);
  loadTrack(store.track_index);
}

function prevTrack() {
  store.track_index > 0
    ? (store.track_index -= 1)
    : (store.track_index = store.music_list.length - 1);
  loadTrack(store.track_index);
}

function seekTo(time) {
  let seekto = time
    ? Number(time.toFixed())
    : curr_track.duration * (seek_slider.value / 100);
  if (time) {
    seek_slider.value = time;
  } else {
    wavesurfer.seekTo(seek_slider.value / 100);
    store.isPlaying ? wavesurfer.play() : wavesurfer.pause();
  }
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

export const store = {
  track_index: Number(localStorage.getItem("track_index")) || 0,
  isPlaying: false,
  isRandom: false,
  music_list: [
    {
      name: "Гимн России",
      src: "../assets/audio/гимн России.mp3",
    },
    {
      name: "Король и Шут - Лесник",
      src: "../assets/audio/Король и Шут - Лесник.mp3",
    },
    {
      name: "Black Strobe — I'm a Man",
      src: "../assets/audio/Black Strobe — I'm a Man.mp3",
    },
    {
      name: "Eminem feat. Nate Dogg - Till I Collapse",
      src: "../assets/audio/Eminem feat. Nate Dogg - Till I Collapse.mp3",
    },
    {
      name: "Кино - Перемен",
      src: "../assets/audio/Кино - Перемен.mp3",
    },
  ],
};

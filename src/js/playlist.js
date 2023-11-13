import { store } from "./store.js";

export class Playlist {
  constructor() {
    this.playlist = document.querySelector(".playlist");
    this.currentIndexSong = localStorage.getItem("track_index");
    this.audiolist = store.music_list;
    this.itemsList = [];
  }

  render() {
    this.audiolist.forEach((elem, index) => {
      const item = document.createElement("p");
      item.classList.add("item");
      if (!this.currentIndexSong && index === 0) item.classList.add("active");
      if (index === Number(this.currentIndexSong)) item.classList.add("active");
      item.setAttribute("id", index);
      item.innerText = `${index + 1}. ${elem.name}`;
      this.playlist.append(item);
      this.itemsList.push(item);
    });
  }

  update(indexTrack) {
    this.itemsList.forEach((elem, index) =>
      index === indexTrack
        ? elem.classList.add("active")
        : elem.classList.remove("active")
    );
  }
}

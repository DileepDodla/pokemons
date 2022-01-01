import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pokemon';
  audio: HTMLAudioElement;
  constructor() {
    this.audio = new Audio("assets/pokemon.mp3");
    this.audio.load();
    this.audio.currentTime = 26;
    this.audio.loop = true;
  }
  playMusic() {
    if (this.audio.paused)
      this.audio.play();
    else
      this.audio.pause();
  }
}

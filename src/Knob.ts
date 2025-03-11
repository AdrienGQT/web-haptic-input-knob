import { gsap, snap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { DragController } from "./DragController";
import { DotIndicator } from "./DotIndicator";
gsap.registerPlugin(Draggable);

export class Knob {
  knobHTML: HTMLElement;
  lightRingHTML: HTMLElement;
  tickEmitterHTML: HTMLAudioElement | null = null;
  tickReady: boolean = true;
  dragController: DragController;

  dotIndicator: DotIndicator;

  constructor() {
    // Get HTML Knob elements
    this.knobHTML = document.querySelector("#knob") as HTMLElement;
    this.lightRingHTML = this.knobHTML.querySelector(
      "#lightRing"
    ) as HTMLElement;

    // Instantiate screen dot indicator
    this.dotIndicator = new DotIndicator();

    // Instantiate the drag controller
    this.dragController = new DragController(this.knobHTML, this.dotIndicator);
    this.dragController.html.addEventListener(
      "snapPointReached",
      this.onSnapPointReached
    );
  }

  onSnapPointReached = (e: any) => {
    console.log(e)
    const snapInterval: number = e.detail.snapInterval;
    this.emitTick(snapInterval);
  };

  emitTick = (snapInterval: number) => {
    if (this.tickReady) {
      this.tickReady = false;

      this.tickEmitterHTML = document.createElement("audio");
      this.tickEmitterHTML.src = "/tick-2.wav";
      this.tickEmitterHTML.currentTime = 0.002;
      this.tickEmitterHTML.preservesPitch = false;
      this.tickEmitterHTML.playbackRate = 2;
      this.tickEmitterHTML.volume = 1;
      this.tickEmitterHTML.play();

      setTimeout(() => {
        this.tickEmitterHTML?.remove();
        navigator.vibrate(60);
        this.tickReady = true;
      }, 200);
    }
  };
}

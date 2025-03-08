import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

export class Knob {
  knobHTML: HTMLElement;
  knobDraggableHTML: HTMLElement;
  lightRingHTML: HTMLElement;
  tickEmitterHTML: HTMLAudioElement;
  constructor() {
    this.knobHTML = document.querySelector("#knob") as HTMLElement;
    this.knobDraggableHTML = this.knobHTML.querySelector(
      "#knobDraggable"
    ) as HTMLElement;
    this.lightRingHTML = this.knobHTML.querySelector(
      "#lightRing"
    ) as HTMLElement;

    this.createTickEmitter();

    this.createDraggable(this.knobDraggableHTML);

    this.knobHTML.addEventListener("mousedown", this.onMouseDown);
    this.knobHTML.addEventListener("mouseup", this.onMouseUp);
  }

  createTickEmitter = () => {
    this.tickEmitterHTML = document.createElement("audio");
    this.tickEmitterHTML.src = "/tick-2.wav";
    this.tickEmitterHTML.autoplay = true;
    this.tickEmitterHTML.volume = 0.2;
  };

  createDraggable = (element: HTMLElement) => {
    let tickEmitterHTMLRef = this.tickEmitterHTML;
    Draggable.create(element, {
      type: "rotation",
      liveSnap: true,
      snap: function (endValue) {
        return Math.round(endValue / 20) * 20;
      },
      onDrag: function () {
        console.log(this.rotation);
        if (this.rotation % 20 === 0) {
          let tickEmitterHTMLRefClone = tickEmitterHTMLRef.cloneNode(
            true
          ) as HTMLAudioElement;
          document.body.appendChild(tickEmitterHTMLRefClone);

          setTimeout(() => {
            tickEmitterHTMLRefClone.remove();
            navigator.vibrate(100);
          }, 185);
        }
      },
    });
  };

  onMouseDown = () => {
    this.lightRingHTML.classList.toggle("redLight");
    this.lightRingHTML.classList.toggle("greenLight");
  };

  onMouseUp = () => {
    this.lightRingHTML.classList.toggle("redLight");
    this.lightRingHTML.classList.toggle("greenLight");
  };
}

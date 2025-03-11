import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { DotIndicator } from "./DotIndicator";
import { ModeManager } from "./ModeManager";
gsap.registerPlugin(Draggable);

export class DragController {
  html: HTMLElement;
  dotIndicator: DotIndicator;

  snapInterval: number
  constructor(knobHTML: HTMLElement, dotIndicator: DotIndicator) {
    this.html = knobHTML.querySelector("#dragController") as HTMLElement;
    this.dotIndicator = dotIndicator;

    this.snapInterval = 35

    // Create GSAP Draggable
    this.createDraggable(this.html, this.updateDotIndicator, this.findClosestSnap, this.snapInterval);
  }

  createDraggable = (
    element: HTMLElement,
    updateDotIndicator: Function,
    findClosestSnap: Function,
    snapInterval : number
  ) => {
    // Create custom event
    const snapPointReached = new CustomEvent("snapPointReached", {
      detail:{
        snapInterval: snapInterval
      }
    });

    // GSAP Draggable
    Draggable.create(element, {
      type: "rotation",
      liveSnap: true,
      snap: function (value) {
        // To create a smooth snap effect we should use this equation :
        //
        // Sin( ( 2pi / (.) ) * x + B ) * (A * pi) + x
        //
        // With (.) the gap between two snap points (the period of the curve)
        // With A the strength of the snap /!\ If value is too high it can create a bounce effect /!\
        const snapStrength = snapInterval / 20;
        // With B the shift of the sine function
        const snapShiftDeg = 90;
        const snapShiftRad = snapShiftDeg * (Math.PI / 180);

        return (
          Math.sin(((2 * Math.PI) / snapInterval) * value + snapShiftRad * 2) *
            (snapStrength * Math.PI) +
          value
        );
      },
      onDrag: function () {
        updateDotIndicator(this.rotation);

        // If snap point reached, dispatch custom event
        if (Math.round(this.rotation) % snapInterval === 0) {
          this.target.dispatchEvent(snapPointReached);
        }
      },
      onDragEnd: function () {
        let currentRotation = this.rotation;
        let closestSnap = findClosestSnap(currentRotation, snapInterval)
        this.rotation = closestSnap

        // Create a reference of target to use it inside fromTo
        let targetRef = this.target;

        gsap.fromTo(
          this.target,
          {
            rotation: currentRotation,
          },
          {
            rotation: closestSnap,
            duration: 0.2,
            onUpdate: function () {
              const value = gsap.getProperty(this.targets()[0], "rotation");
              updateDotIndicator(value);
            },
            onComplete: function () {
              targetRef.dispatchEvent(snapPointReached);
            },
          }
        );
      },
    });
  };

  updateDotIndicator = (rotation: number) => {
    this.dotIndicator.containerHTML.style.transform = `translate(-50%) rotate(${rotation}deg)`;
  };

  findClosestSnap = (number: number, step: number) => {
    return Math.round(number / step) * step;
  };
}

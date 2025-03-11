import { Knob } from "./Knob";

export class ModeManager {
  constructor(knob: Knob) {
    knob.knobHTML.addEventListener("click", this.nextMod);
  }

  nextMod = () => {
    console.log("Switching to next mod");
  };
}

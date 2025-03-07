import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

export class Knob{
    KnobHTML
    lightRingHTML
    constructor(){
        this.KnobHTML = document.querySelector('#knob') as HTMLElement
        this.lightRingHTML = this.KnobHTML.querySelector('#lightRing') as HTMLElement
        
        this.KnobHTML.addEventListener('mousedown', this.onMouseDown)
        this.KnobHTML.addEventListener('mouseup', this.onMouseUp)
    }

    onMouseDown = () => {
        this.lightRingHTML.classList.toggle('redLight')
        this.lightRingHTML.classList.toggle('greenLight')
    }

    onMouseUp = () => {
        this.lightRingHTML.classList.toggle('redLight')
        this.lightRingHTML.classList.toggle('greenLight')
    }
}
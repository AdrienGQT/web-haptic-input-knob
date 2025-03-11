import { Knob } from './Knob'
import { ModeManager } from './ModeManager'
import './style.css'

const onContentLoaded = () => {
  let knob = new Knob()
  new ModeManager(knob)
}

window.addEventListener('DOMContentLoaded', onContentLoaded)
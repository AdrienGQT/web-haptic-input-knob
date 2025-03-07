import { Knob } from './Knob'
import './style.css'

const onContentLoaded = () => {
  new Knob()
}

window.addEventListener('DOMContentLoaded', onContentLoaded)
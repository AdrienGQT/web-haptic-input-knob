export class DotIndicator{
    containerHTML: HTMLElement
    HTML: HTMLElement
    constructor(){
        this.containerHTML = document.querySelector('#dotIndicatorContainer') as HTMLElement
        this.HTML = document.querySelector('#dotIndicator') as HTMLElement
        console.log('dotIndicator', this.containerHTML)
    }   
}
// import { PolymerElement, html } from "@polymer/polymer/polymer-element";
import { LitElement, html, css } from "lit-element";

export class PedruleAscensor extends LitElement{
    static get properties() {
        return {
            showV: {
                type: Boolean,
                reflect: true,
                attribute: 'show-v',
            },

            showH: {
                type: Boolean,
                reflect: true,
                attribute: 'show-h'
            },

            sizeV: {
                type: Number,
                // observer: '__sizeVChanged'
            },

            sizeH: {
                type: Number,
                // observer: '__sizeHChanged'
            },

            deltaV: {
                type: Number,
                // observer: '__deltaVChanged'
            },

            deltaH: {
                type: Number,
                // observer: '__deltaHChanged'
            },

            isHorizontalScroll: {
                type: Boolean,
            }
        }
    }

    static get styles() {
        return css`
            :host{
                pointer-events: none;
                /* @apply --layout-horizontal; */
                display: flex;
                --weight-scroll-container: 6px;
                position: absolute;
                -webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;
                cursor: pointer;
                --background-ascensor: #eeeeee;
                --color-ascensor: #111111;
            }

            .container{
                background: var(--background-ascensor);
                transition: width .1s ease-out;
                overflow: hidden;
            }

            .scrollBar{
                background: var(--color-ascensor);
            }

            #containerH{
                width: calc(100% - var(--weight-scroll-container));
            }

            #ascensorH{
                 height: var(--weight-scroll-container);
            }

            #containerV{
               height : 100%;
               width : var(--weight-scroll-container);
            }

            div.hide{
                opacity: 0;
                pointer-events: none;
            }

            div.show{
                opacity: 1;
                pointer-events: all;
            }

            :host(:hover){
                --weight-scroll-container: 12px;

            }

            .self-end {
                align-self: flex-end;
            }
            `
    }

    render() {
        return html`
        <div id="containerH" class="${this._hideH(this.showH)} self-end container" @mouseenter="${this._enableHorizontalScroll}" @mouseleave="${this._disableHorizontalScroll}">
            <div id="ascensorH" class="scrollBar"></div>
        </div>

        <div id="containerV" class="${this._hideV(this.showV)} container">
            <div id="ascensorV" class="scrollBar"></div>
        </div>        
        `
    }

    set sizeV(value) {
        const oldValue = this._sizeV;
        this._sizeV = value;
        this.requestUpdate('sizeV', oldValue);
        // this.__sizeVChanged(value);
    }

    get sizeV() {
        return this._sizeV;
    }

    set sizeH(value) {
        const oldValue = this._sizeH;
        this._sizeH = value;
        this.requestUpdate('sizeH', oldValue);
        // this.__sizeHChanged(value);
    }

    get sizeH() {
        return this._sizeH;
    }

    set deltaH(value) {
        const oldValue = this._deltaH;
        this._deltaH = value;
        this.requestUpdate('deltaH', oldValue);
        // this.__deltaHChanged(value);
    }

    get deltaH() {
        return this._deltaH;
    }

    set deltaV(value) {
        const oldValue = this._deltaV;
        this._deltaV = value;
        this.requestUpdate('deltaV', oldValue);
        // this.__deltaVChanged(value);
    }

    get deltaV() {
        return this._deltaV;
    }

    get ascensorV() {
        return this.shadowRoot.querySelector('#ascensorV');
    }

    get ascensorH() {
        return this.shadowRoot.querySelector('#ascensorH');
    }

    get containerH() {
        return this.shadowRoot.querySelector('#containerH');
    }

    get containerV() {
        return this.shadowRoot.querySelector('#containerV');
    }

    constructor() {
        super();
        this.isHorizontalScroll = false;
    }

    updated(changedProperties) {
        if(changedProperties.has('deltaV')) this.__deltaVChanged(this.deltaV);
        if(changedProperties.has('deltaH')) this.__deltaHChanged(this.deltaH);
        if(changedProperties.has('sizeH')) this.__sizeHChanged(this.sizeH);
        if(changedProperties.has('sizeV')) this.__sizeVChanged(this.sizeV);
    }

    _hideH(showH){
        return showH ? 'show' : 'hide';
    }

    _hideV(showV){
        return showV ? 'show' : 'hide';
    }

    __sizeVChanged(arg) {
        this.ascensorV.style.height = `${arg}px`
    }

    __sizeHChanged(arg) {
        // we set width of horizontal scroll but we diminute it from width of vertical scroll
        this.ascensorH.style.width = `${arg - this.containerV.getBoundingClientRect().width}px`; 
    }

    __deltaVChanged(arg) {
        this.ascensorV.style.transform = `translateY(${arg}px)`;
    }

    checkDeltaV(delta) {
        if (isNaN(delta) || delta === undefined || delta < 0) return 0;
        if (delta > (this.containerV.getBoundingClientRect().height - this.ascensorV.getBoundingClientRect().height)) return this.containerV.getBoundingClientRect().height - this.ascensorV.getBoundingClientRect().height;
        return delta;
    }

    __deltaHChanged(arg) {
        this.ascensorH.style.transform = `translateX(${arg}px)`;
    }

    checkDeltaH(delta) {
        if (isNaN(delta) || delta === undefined || delta < 0) return 0;
        if (delta > (this.containerH.getBoundingClientRect().width - this.ascensorH.getBoundingClientRect().width)) return this.containerH.getBoundingClientRect().width - this.ascensorH.getBoundingClientRect().width;
        return delta;
    }

    _enableHorizontalScroll(event) {
        this.isHorizontalScroll = true;
    }

    _disableHorizontalScroll() {
        this.isHorizontalScroll = false;
    }
}
if (!customElements.get('pedrule-scrollbar')) customElements.define('pedrule-scrollbar', PedruleAscensor);
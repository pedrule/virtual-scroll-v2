// import { PolymerElement, html } from '@polymer/polymer/polymer-element';
// import { LitElement } from "lit-element";
import {ScrollVirtualBehavior} from './ScrollVirtualBehavior';
import {InstanceBehavior} from './InstanceBehavior';

// import '@polymer/iron-flex-layout/iron-flex-layout';
// import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import { LitElement, html } from 'lit-element';

export default class PedruleVirtualScroll extends InstanceBehavior(ScrollVirtualBehavior(LitElement)) {
    static get properties() {
        return {

            _height: {
                type: Number,
                // computed: '__setHeight(items, unitarySize)',
                // observer: '__heightChanged'
            },

            width: {
                type: Number,
                reflect: true,
                converter(value) {
                    return Number(value);
                }
                // observer: '__widthChanged'
            },

            items: {
                type: Array,
                // observer: '__itemsChanged',
                // value: []
            },
        }
    }

    static get styles() {
        return [
            this.styleTemplate,
            this.containerStyle
        ]
    }


    set items(value) {
        let oldValue = this._items;
        this._items = value;
        this.requestUpdate('items', oldValue);
        this.__itemsChanged(value);
        this._height = this.__setHeight(value, this.unitarySize);
    }

    get items() {
        return this._items;
    }

    set _height(value) {
        let oldValue = this.__height;
        this.__height = value;
        if(value !== undefined && value !== false) {
            this.requestUpdate('_height', oldValue);
            this.__heightChanged(value, oldValue);
        }
    }

    get _height() {
        return this.__height;
    }

    set width(value) {
        let oldValue = this._width;
        this._width = value;
        this.requestUpdate('width', oldValue);
        // this.__widthChanged(value);
    }

    get width() {
        return this._width;
    }

    get templateItem() {
        return html`
            <div style="height: 65px; background: tan;position: absolute">Ceci est un test</div>
        `
    }
    
    constructor() {
        super();
        this.items = [];
    }
    
    render() {
        return html`
            ${this.containerTemplate}
            ${this.scrollTemplate}`
    }

    firstUpdated(changedProperties) {
        if(changedProperties.width) this.__widthChanged(changedProperties.width);
        this.computeSizeOfHost();
        this.__observeSlot();
        this.evaluateScroll();
        this.deltaH = this.deltaV = 0;
    }

    /**
     * function that computed total size of element by factorizacion of unitarySize of an item and total count of items through 
     * length of items array
     * @param {Array} items 
     * @param {Number} unitarySize 
     */
    __setHeight(items, unitarySize) {
        return items && unitarySize ? unitarySize.height*items.length : false;
    }

    /**
     * retrieve new value of height property and assign it to css style of element
     * @observer
     * @param {Number} arg 
     */
    __heightChanged(arg, prev) {
        if(arg != undefined && arg !== prev){ 
            this.container.style.height = `${arg}px`;
            // this.__resetInstances();
            this.evaluateScroll();
        }
    }

    /**
     * retrieve new value of width property and assign it to each instances of instances array property
     * @observer
     * @param {Number} arg 
     */
    __widthChanged(arg) {
        this.instances.forEach(item => item.style.width = `${arg}px`);
        this.container.style.width = `${arg}px`;
    }

    __itemsChanged(arg) {
        this.__resetInstances();
        if (arg) this.instances.forEach((instance, index) => (instance.item = arg[index]));
    }
}

// const initElement = () =>  {
//     if(!customElements.get('pedrule-virtual-scroll')) customElements.define('pedrule-virtual-scroll', PedruleVirtualScroll);
// }

// export { initElement, PedruleVirtualScroll }
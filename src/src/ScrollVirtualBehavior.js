
import { ScrollBehavior  } from '../scrollBehavior/index';

export const ScrollVirtualBehavior = superClass => class extends ScrollBehavior(superClass) {
    static get properties() {
        return {
            lastIndex: {
                type: Number,
                // observer: '__lastIndexChanged'
            },
        }
    }

    set lastIndex(value) {
        const oldValue = this._lastIndex;
        this._lastIndex = value;
        this.requestUpdate('lastIndex', oldValue);
        this.__lastIndexChanged(value, oldValue);
    }

    get lastIndex() {
        return this._lastIndex;
    }

    /**
     * each time delta property changes we set lastIndex property 
     * @observer
     * @param {Number} arg 
     * @param {Number} prev 
     */
    __deltaVChanged(arg, prev) {
        super.__deltaVChanged(arg);
        if(this.unitarySize && arg != undefined)this.lastIndex = this.numberInstance + Math.floor(arg*this.ratioV/this.unitarySize.height);
    }

    /**
     * each time lastIndex changes function update instances accordingly to 
     * display gracefully virtualist
     * @observer
     * @param {Number} arg 
     * @param {Number} prev 
     */
    __lastIndexChanged(arg, prev){
        // we don't do anything if it is the first set on property
        if(arg && prev){
            if(arg > prev){
                for(let i = prev; i< arg; i++) {
                    let indexOfItem = i%this.numberInstance;
                    let loop = Math.floor(i/this.numberInstance);
                    let item = this.instances[indexOfItem];
                    if(item) {
                        item.item = this.items[i];
                        item.index = i;
                        item.style.transform = `translate3d(0, ${(loop*(this.numberInstance*this.unitarySize.height))+(indexOfItem*this.unitarySize.height)}px, 0)`
                    }
                }
            }

            if(arg < prev){
                if(prev>arg+this.numberInstance)prev = arg + this.numberInstance //this is to be sure to not doing more that a loop in instances displayed to avoid to have bugs
                for(let i = arg; i< prev; i++) {
                    let indexOfItem = (i-this.numberInstance)%this.numberInstance;
                    let loop = Math.floor((i-this.numberInstance)/this.numberInstance);
                    let item = this.instances[indexOfItem];
                    if(item) {
                        item.item = this.items[(i-this.numberInstance)];
                        item.index = i-this.numberInstance;
                        item.style.transform = `translate3d(0, ${(loop*(this.numberInstance*this.unitarySize.height))+(indexOfItem*this.unitarySize.height)}px, 0)`
                    }
                }
            }
        }
    }
}
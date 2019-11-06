import { SizeBehavior } from "./SizeBehavior";
export const InstanceBehavior = SuperClass => class extends SizeBehavior(SuperClass){
    static get properties() {
        return {
             //number of instances of items related to size of each one in the available visibility area 
            numberInstance: {
                type: Number,
                // computed: '__computeNumberOfInstance(unitarySize)', 
                observer: '__adjustNumberOfInstances'
            }
        }
    }

    /**
     * getter which allow to
     */
    get instances() {
        return this.querySelectorAll(this.nameOfContainer);
    }

    set numberInstance(value) {
        const oldValue = this._numberInstance;
        this._numberInstance = value;
        this.requestUpdate('numberInstance', oldValue);
        this.__adjustNumberOfInstances(value);
    }

    get numberInstance() {
        return this._numberInstance;
    }

    /**
     * function computes count of instance which will be necessary to gracefully fit the display area. 
     * @param {Number} unitarySize 
     * @return {Number}
     */
    __computeNumberOfInstance(unitarySize) {
        if(window.innerHeight && unitarySize && unitarySize.height != 0) {
            let numberOfInstance = Math.ceil(window.innerHeight/unitarySize.height*1.4);
            return numberOfInstance; 
        }
        return 0;
    }

    /**
     * this function adjust number of instances created by element to display accurates number.
     * @observer on instances and numberInstance properties
     * @param {Array} instances 
     * @param {Number} numberInstance 
    */
    __adjustNumberOfInstances(numberInstance) {
        if(numberInstance && numberInstance != Infinity){
            //if there is not enough instances of items, we add new ones
            if(this.instances.length < numberInstance) {
                for(let i = this.instances.length; i<numberInstance; i++){
                    // let instance = this.template.content.cloneNode(true);
                    // instance = instance.firstElementChild;
                    let instance = this.content;
                    instance.style.position = "absolute";
                    this.appendChild(instance);
                    instance.style.transform = `translate3d(0, ${i*this.unitarySize.height}px, 0)`;
                }
            }
            //otherwise we remove instances which are no longer necessary in display area.
            else if(this.instances.length > numberInstance){
                for(let i = this.instances.length-1; i >= numberInstance; i--){
                    this.removeChild(this.instances[i]);
                }
            }
            this.dispatchEvent(new CustomEvent('containers-ready', {detail: {value: this.instances}, bubbles: true, composed: true}));
        }
        //finally we affect to each instances corresponding data in items array indices.
        this.lastIndex = this.instances.length;
    }

    /**
     * each time function is called
     * each instance of instances array are repoisiotnned on top of it dom parent container and item property is resetted
     * @public
     */
    __resetInstances() {
        this.instances.forEach((instance, index)=>{
            if(this.unitarySize)instance.style.transform = `translate3d(0, ${index*this.unitarySize.height}px, 0)`;
            instance.item = undefined;
            instance.index = undefined;
            this.deltaV = 0;
        })
    }
}
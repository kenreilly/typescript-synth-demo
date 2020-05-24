import { ControlEvent } from "./event-bus.js";
export class Slider {
    get elements() { return [this.label, this.input]; }
    constructor(bus, path, type, name) {
        this.label = document.createElement('label');
        this.input = document.createElement('input');
        this.label.innerText = name;
        this.input.type = 'range';
        this.input.min = '1';
        this.input.max = '100';
        this.input.value = '50';
        this.input.oninput = (ev) => bus.fire(new ControlEvent(path, type, ev.target.value));
    }
}

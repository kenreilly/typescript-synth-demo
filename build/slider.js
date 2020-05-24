import { ControlEvent } from "./event-bus";
export class Slider {
    static create(bus, path, type, name) {
        let label = document.createElement('label');
        let input = document.createElement('input');
        input.type = 'range';
        input.min = '1';
        input.max = '100';
        input.value = '50';
        input.onchange = () => bus.fire(new ControlEvent(path, type));
        return [label, input];
    }
}

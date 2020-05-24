export var ControlType;
(function (ControlType) {
    ControlType[ControlType["GAIN"] = 0] = "GAIN";
    ControlType[ControlType["DETUNE"] = 1] = "DETUNE";
    ControlType[ControlType["DELAY"] = 2] = "DELAY";
})(ControlType || (ControlType = {}));
export class SynthEvent {
    get type() { return this.constructor; }
}
export class NoteOnEvent extends SynthEvent {
    constructor(key) { super(); this.key = key; }
}
export class NoteOffEvent extends SynthEvent {
    constructor(key) { super(); this.key = key; }
}
export class ControlEvent extends SynthEvent {
    constructor(channel, control, value) {
        super();
        this.control = control;
        this.channel = channel;
        this.value = parseInt(value);
    }
}
export class EventBus {
    constructor() {
        this.listeners = [];
    }
    listen(listener) { return this.listeners.push(listener); }
    fire(event) { this.listeners.forEach((listener) => listener.call(listener, event)); }
}

export class SynthEvent {
    get type() { return this.constructor; }
}
export class NoteOnEvent extends SynthEvent {
    constructor(key) { super(); this.key = key; }
}
export class NoteOffEvent extends SynthEvent {
    constructor(key) { super(); this.key = key; }
}
export var ControlType;
(function (ControlType) {
    ControlType[ControlType["GAIN"] = 0] = "GAIN";
    ControlType[ControlType["FILTER"] = 1] = "FILTER";
})(ControlType || (ControlType = {}));
export class ControlEvent extends SynthEvent {
    constructor(path, type) {
        super();
        this.type = type;
        this.path = path;
    }
}
export class EventBus {
    constructor() {
        this.listeners = [];
    }
    listen(listener) { return this.listeners.push(listener); }
    fire(event) { this.listeners.forEach((listener) => listener.call(listener, event)); }
}

import { NoteOnEvent, NoteOffEvent } from "./event-bus.js";
export class SynthKey {
    constructor(note, index) {
        this.note = note;
        this.octave = Math.floor(index / 12);
        this.frequency = (440 * Math.pow(2, (KeyDefinition.scale.indexOf(this.note) - 10) / 12)) * (this.octave ? 2 : 1);
    }
    static create(note, index, bus) {
        let button = document.createElement('button');
        let key = new SynthKey(note, index);
        button.onmousedown = () => bus.fire(new NoteOnEvent(key));
        button.onmouseup = () => bus.fire(new NoteOffEvent(key));
        button.name = note;
        return button;
    }
}
export class KeyDefinition {
    static get notes() { return ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']; }
    static get scale() { return KeyDefinition.notes.concat(KeyDefinition.notes); }
    get keys() { return KeyDefinition.scale.map((note, i) => SynthKey.create(note, i, this.bus)); }
    constructor(bus) { this.bus = bus; }
}

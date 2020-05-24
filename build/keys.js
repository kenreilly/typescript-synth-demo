import { EventBus, NoteOnEvent, NoteOffEvent } from "./event-bus.js";
export class SynthKey {
    constructor(note, index, bus) {
        this.note = note;
        this.octave = Math.floor(index / 12);
        this.frequency = (440 * Math.pow(2, (KeyDefinition.scale.indexOf(this.note) - 10) / 12)) * (this.octave ? 2 : 1);
    }
    static create(note, index, bus) {
        let button = document.createElement('button');
        let key = new SynthKey(note, index, bus);
        button.onmousedown = (event) => key.on_press(event);
        button.onmouseup = (event) => key.on_release(event);
        button.name = note;
        return button;
    }
    on_press(event) { Main.bus.fire(new NoteOnEvent(this)); }
    on_release(event) { EventBus.fire(new NoteOffEvent(this)); }
}
export class KeyDefinition {
    constructor(bus) {
        this.keys = KeyDefinition.scale.map((note, i) => SynthKey.create(note, i, this.bus));
        this.bus = bus;
    }
    static get notes() { return ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']; }
}
KeyDefinition.scale = KeyDefinition.notes.concat(KeyDefinition.notes);

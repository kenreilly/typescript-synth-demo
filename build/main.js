import { KeyDefinition } from './keys.js';
import { EventBus, NoteOnEvent, NoteOffEvent } from './event-bus.js';
import { SynthEngine } from './synth-engine.js';
class Keyboard {
    static init() {
        this.keyboard = document.querySelector('footer');
        this.note_readout = document.querySelector('output > b');
        this.bus = new EventBus();
        this.synth = new SynthEngine(this.bus);
        this.keydef = new KeyDefinition(this.bus);
        this.keydef.keys.forEach((key) => this.keyboard.appendChild(key));
        this.bus.listen(this.on_event.bind(this));
    }
    static on_event(ev) {
        switch (ev.type) {
            case NoteOnEvent:
                return this.note_readout.innerText = ev.key.note;
            case NoteOffEvent:
                return this.note_readout.innerText = null;
        }
    }
}
Keyboard.init();

import { EventBus, NoteOnEvent, NoteOffEvent, ControlType } from './event-bus.js';
import { KeyDefinition } from './synth-key.js';
import { SynthEngine } from './synth-engine.js';
import { Slider } from './slider.js';
import { Scope } from './scope.js';
import { CHANNEL } from './synth-component.js';
class Synth {
    static init() {
        this.keyboard = document.querySelector('footer');
        this.display = document.querySelector('output > b');
        this.panel = document.querySelector('main > div');
        this.keydef = new KeyDefinition(this.signal_bus);
        this.engine = new SynthEngine(this.signal_bus, this.control_bus);
        this.scope = new Scope(this.engine, document.querySelector('canvas'));
        this.sliders = [
            new Slider(this.control_bus, CHANNEL.CH1, ControlType.GAIN, 'osc 1 gain'),
            new Slider(this.control_bus, CHANNEL.CH2, ControlType.GAIN, 'osc 2 gain'),
            new Slider(this.control_bus, CHANNEL.CH1, ControlType.DETUNE, 'osc 1 detune'),
            new Slider(this.control_bus, CHANNEL.CH2, ControlType.DETUNE, 'osc 2 detune'),
            new Slider(this.control_bus, CHANNEL.CH1, ControlType.DELAY, 'osc 1 delay'),
            new Slider(this.control_bus, CHANNEL.CH2, ControlType.DELAY, 'osc 2 delay'),
        ];
        this.sliders.forEach((s) => s.elements.forEach((e) => this.panel.appendChild(e)));
        this.keydef.keys.forEach((key) => this.keyboard.appendChild(key));
        this.signal_bus.listen(this.on_signal.bind(this));
    }
    static on_signal(ev) {
        switch (ev.type) {
            case NoteOnEvent:
                return this.display.innerText = ev.key.note;
            case NoteOffEvent:
                return this.display.innerText = null;
        }
    }
}
Synth.signal_bus = new EventBus();
Synth.control_bus = new EventBus();
Synth.init();

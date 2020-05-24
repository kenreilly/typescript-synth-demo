import { NoteOnEvent, NoteOffEvent } from "./event-bus.js";
import { CHANNEL, WAVEFORM } from "./synth-component.js";
import { Oscillator } from "./oscillator.js";
import { Filter } from "./filter.js";
import { Gain } from "./gain.js";
export class SynthEngine {
    constructor(bus) {
        this.ctx = new AudioContext();
        this.oscillators = [
            new Oscillator(this.ctx, CHANNEL.CH1, WAVEFORM.SINE),
            new Oscillator(this.ctx, CHANNEL.CH2, WAVEFORM.SQUARE)
        ];
        this.filters = [
            new Filter(this.ctx, CHANNEL.CH1),
            new Filter(this.ctx, CHANNEL.CH2),
        ];
        this.output = new Gain(this.ctx, CHANNEL.MASTER);
        this.oscillators.forEach((osc, i) => osc.drive(this.filters[i]));
        this.filters.forEach((flt, i) => flt.drive(this.output));
        this.bus = bus;
        this.bus.listen(this.on_event.bind(this));
    }
    on_event(ev) {
        switch (ev.type) {
            case NoteOnEvent:
                console.log("NOTE ON");
                return this.oscillators.forEach((osc) => osc.play(ev.key.frequency));
            case NoteOffEvent:
                console.log("NOTE OFF");
                return this.oscillators.forEach((osc) => osc.stop());
        }
    }
}

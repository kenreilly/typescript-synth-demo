import { NoteOnEvent, NoteOffEvent, ControlType } from "./event-bus.js";
import { CHANNEL, WAVEFORM } from "./synth-component.js";
import { Oscillator } from "./oscillator.js";
import { Delay } from "./delay.js";
import { Gain } from "./gain.js";
export class SynthEngine {
    constructor(signal, control) {
        this.ctx = new AudioContext();
        this.oscillators = [
            new Oscillator(this.ctx, CHANNEL.CH1, WAVEFORM.SINE),
            new Oscillator(this.ctx, CHANNEL.CH2, WAVEFORM.SQUARE)
        ];
        this.delays = [
            new Delay(this.ctx, CHANNEL.CH1),
            new Delay(this.ctx, CHANNEL.CH2),
        ];
        this.output = new Gain(this.ctx, CHANNEL.MASTER);
        this.test = () => this.oscillators[1].play(440);
        this.oscillators.forEach((osc, i) => osc.drive(this.delays[i]));
        this.delays.forEach((d, i) => d.drive(this.output));
        this.signal_bus = signal;
        this.control_bus = control;
        this.signal_bus.listen(this.on_signal.bind(this));
        this.control_bus.listen(this.on_control.bind(this));
    }
    on_signal(ev) {
        switch (ev.type) {
            case NoteOnEvent:
                console.log("NOTE ON");
                return this.oscillators.forEach((osc) => osc.play(ev.key.frequency));
            case NoteOffEvent:
                console.log("NOTE OFF");
                return this.oscillators.forEach((osc) => osc.stop());
        }
    }
    on_control(ev) {
        switch (ev.control) {
            case ControlType.GAIN:
                return this.oscillators[ev.channel].gain = ev.value;
            case ControlType.DETUNE:
                return this.oscillators[ev.channel].detune = ev.value;
            case ControlType.DELAY:
                return this.delays[ev.channel].mix = ev.value;
        }
    }
}

import { EventBus, SynthEvent, NoteOnEvent, NoteOffEvent, ControlEvent, ControlType } from "./event-bus.js"
import { CHANNEL, WAVEFORM, SynthComponent } from "./synth-component.js"
import { Oscillator } from "./oscillator.js"
import { Delay } from "./delay.js"
import { Gain } from "./gain.js"

export class SynthEngine {

	private signal_bus: EventBus
	private control_bus: EventBus

	public ctx: AudioContext = new AudioContext()

	private oscillators: Array<Oscillator> = [
		new Oscillator(this.ctx, CHANNEL.CH1, WAVEFORM.SINE),
		new Oscillator(this.ctx, CHANNEL.CH2, WAVEFORM.SQUARE)
	]

	private delays: Array<Delay> = [
		new Delay(this.ctx, CHANNEL.CH1),
		new Delay(this.ctx, CHANNEL.CH2),
	]
	
	public output: Gain = new Gain(this.ctx, CHANNEL.MASTER)

	constructor(signal: EventBus, control: EventBus) {
	
		this.oscillators.forEach((osc, i) => osc.drive(this.delays[i]))
		this.delays.forEach((d, i) => d.drive(this.output))
		
		this.signal_bus = signal
		this.control_bus = control
		this.signal_bus.listen(this.on_signal.bind(this))
		this.control_bus.listen(this.on_control.bind(this))
	}

	public test = () => this.oscillators[1].play(440)

	private on_signal(ev: SynthEvent) {
			
		switch (ev.type) {

			case NoteOnEvent:
				console.log("NOTE ON")
				return this.oscillators.forEach((osc) => osc.play((<NoteOnEvent>ev).key.frequency))
				
			case NoteOffEvent:
				console.log("NOTE OFF")
				return this.oscillators.forEach((osc) => osc.stop())
		}
	}

	private on_control(ev: ControlEvent) {

		switch (ev.control) {

			case ControlType.GAIN:
				return this.oscillators[ev.channel].gain = ev.value

			case ControlType.DETUNE:
				return this.oscillators[ev.channel].detune = ev.value

			case ControlType.DELAY:
				return this.delays[ev.channel].mix = ev.value

		}
	}
}
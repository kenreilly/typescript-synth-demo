import { EventBus, SynthEvent, NoteOnEvent, NoteOffEvent } from "./event-bus.js"
import { CHANNEL, WAVEFORM, SynthComponent } from "./synth-component.js"
import { Oscillator } from "./oscillator.js"
import { Filter } from "./filter.js"
import { Gain } from "./gain.js"

export class SynthEngine {

	private bus: EventBus
	private ctx: AudioContext = new AudioContext()

	private oscillators: Array<Oscillator> = [
		new Oscillator(this.ctx, CHANNEL.CH1, WAVEFORM.SINE),
		new Oscillator(this.ctx, CHANNEL.CH2, WAVEFORM.SQUARE)
	]

	private filters: Array<Filter> = [
		new Filter(this.ctx, CHANNEL.CH1),
		new Filter(this.ctx, CHANNEL.CH2),
	]
	
	private output: Gain = new Gain(this.ctx, CHANNEL.MASTER)

	constructor(bus: EventBus) {
	
		this.oscillators.forEach((osc, i) => osc.drive(this.filters[i]))
		this.filters.forEach((flt, i) => flt.drive(this.output))
		
		this.bus = bus
		this.bus.listen(this.on_event.bind(this))
	}

	private on_event(ev: SynthEvent) {
			
		switch (ev.type) {

			case NoteOnEvent:
				console.log("NOTE ON")
				return this.oscillators.forEach((osc) => osc.play((<NoteOnEvent>ev).key.frequency))
				
			case NoteOffEvent:
				console.log("NOTE OFF")
				return this.oscillators.forEach((osc) => osc.stop())
		}
	}
}
import { EventBus, SynthEvent, NoteOnEvent, NoteOffEvent, ControlType } from './event-bus.js'
import { KeyDefinition, SynthKey } from './synth-key.js'
import { SynthEngine } from './synth-engine.js'
import { Slider } from './slider.js'
import { Scope } from './scope.js'
import { CHANNEL } from './synth-component.js'

abstract class Synth {

	static keydef: KeyDefinition
	static engine: SynthEngine
	static signal_bus: EventBus = new EventBus()
	static control_bus: EventBus = new EventBus()
	static scope: Scope

	static display: HTMLElement
	static keyboard: HTMLElement
	static keys: Array<HTMLElement>

	static panel: HTMLElement
	static sliders: Array<Slider>

	static init() {

		this.keyboard = document.querySelector('footer')
		this.display = document.querySelector('output > b')
		this.panel = document.querySelector('main > div')
		
		this.keydef = new KeyDefinition(this.signal_bus)
		this.engine = new SynthEngine(this.signal_bus, this.control_bus)
		this.scope = new Scope(this.engine, document.querySelector('canvas'))
		
		this.sliders = [
			new Slider(this.control_bus, CHANNEL.CH1, ControlType.GAIN, 'osc 1 gain'),
			new Slider(this.control_bus, CHANNEL.CH2, ControlType.GAIN, 'osc 2 gain'),
			new Slider(this.control_bus, CHANNEL.CH1, ControlType.DETUNE, 'osc 1 detune'),
			new Slider(this.control_bus, CHANNEL.CH2, ControlType.DETUNE, 'osc 2 detune'),
			new Slider(this.control_bus, CHANNEL.CH1, ControlType.DELAY, 'osc 1 delay'),
			new Slider(this.control_bus, CHANNEL.CH2, ControlType.DELAY, 'osc 2 delay'),
		]

		this.sliders.forEach((s) => s.elements.forEach((e) => this.panel.appendChild(e)))
		this.keydef.keys.forEach((key) => this.keyboard.appendChild(key))
		this.signal_bus.listen(this.on_signal.bind(this))
	}

	static on_signal(ev: SynthEvent) {

		switch (ev.type) {

			case NoteOnEvent:
				return this.display.innerText = (<NoteOnEvent>ev).key.note

			case NoteOffEvent:
				return this.display.innerText = null
		}
	}
}

Synth.init()

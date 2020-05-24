import { KeyDefinition, SynthKey } from './synth-key.js'
import { EventBus, SynthEvent, NoteOnEvent, NoteOffEvent } from './event-bus.js'
import { SynthEngine } from './synth-engine.js'

abstract class Synth {

	static keydef: KeyDefinition
	static engine: SynthEngine
	static bus: EventBus

	static display: HTMLElement
	static keyboard: HTMLElement
	static keys: Array<HTMLElement>

	static init() {

		this.keyboard = document.querySelector('footer')
		this.display = document.querySelector('output > b')
		
		this.bus = new EventBus()	
		this.engine = new SynthEngine(this.bus)
		this.keydef = new KeyDefinition(this.bus)
		
		this.keydef.keys.forEach((key) => this.keyboard.appendChild(key))
		this.bus.listen(this.on_event.bind(this))
	}

	static on_event(ev: SynthEvent) {

		switch (ev.type) {

			case NoteOnEvent:
				return this.display.innerText = (<NoteOnEvent>ev).key.note

			case NoteOffEvent:
				return this.display.innerText = null
		}
	}
}

Synth.init()
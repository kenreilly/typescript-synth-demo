import { EventBus, NoteOnEvent, NoteOffEvent } from "./event-bus.js";

export class SynthKey {

	public note: string
	public octave: number
	public frequency: number
	
	private constructor(note: string, index: number) {

		this.note = note
		this.octave = Math.floor(index / 12)
		this.frequency = (440 * Math.pow(2, (KeyDefinition.scale.indexOf(this.note) - 10) / 12)) * (this.octave ? 2 : 1)
	}

	static create(note: string, index: number, bus: EventBus): HTMLButtonElement { 

		let button: HTMLButtonElement = <HTMLButtonElement>document.createElement('button')
		let key = new SynthKey(note, index)
		
		button.onmousedown = () => bus.fire(new NoteOnEvent(key))
		button.onmouseup = () => bus.fire(new NoteOffEvent(key))
		button.name = note
		return button
	}
}

export class KeyDefinition {

	private bus: EventBus

	private static get notes(): Array<string> { return [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ] }
	
	public static get scale(): Array<string> { return  KeyDefinition.notes.concat(KeyDefinition.notes) }
	
	public get keys(): Array<HTMLButtonElement> { return KeyDefinition.scale.map((note, i) => SynthKey.create(note, i, this.bus)) }
	
	constructor(bus: EventBus) { this.bus = bus }
}
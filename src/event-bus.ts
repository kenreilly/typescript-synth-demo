import { SynthKey } from "./synth-key"
import { CHANNEL } from "./synth-component";

export enum ControlType { GAIN, DETUNE, DELAY }

export class SynthEvent { get type(): any { return this.constructor } }

export class NoteOnEvent extends SynthEvent {

	public key: SynthKey
	constructor(key: SynthKey) { super(); this.key = key }
}

export class NoteOffEvent extends SynthEvent {

	public key: SynthKey
	constructor(key: SynthKey) { super(); this.key = key}
}

export class ControlEvent extends SynthEvent {
	
	public channel: CHANNEL
	public control: ControlType
	public value: number

	constructor(channel: CHANNEL, control: ControlType, value) { 
		
		super();
		this.control = control
		this.channel = channel
		this.value = parseInt(value)
	}
}

export class EventBus {

	private listeners: Array<Function> = []

	listen(listener: Function): number { return this.listeners.push(listener) }

	fire<T extends SynthEvent>(event: T) { this.listeners.forEach((listener: Function) => listener.call(listener, event)) }
}
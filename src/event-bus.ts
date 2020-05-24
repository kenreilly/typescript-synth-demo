import { SynthKey } from "./synth-key"
import { CHANNEL } from "./synth-component";

export class SynthEvent { get type(): any { return this.constructor } }

export class NoteOnEvent extends SynthEvent {

	public key: SynthKey
	constructor(key: SynthKey) { super(); this.key = key }
}

export class NoteOffEvent extends SynthEvent {

	public key: SynthKey
	constructor(key: SynthKey) { super(); this.key = key}
}

export enum ControlType { GAIN, FILTER }

export class ControlEvent extends SynthEvent {
	
	public path: CHANNEL
	public type: ControlType

	constructor(path: CHANNEL, type: ControlType) { 
		
		super();
		this.type = type
		this.path = path
	}
}

export class EventBus {

	private listeners: Array<Function> = []

	listen(listener: Function): number { return this.listeners.push(listener) }

	fire<T extends SynthEvent>(event: T) { this.listeners.forEach((listener: Function) => listener.call(listener, event)) }
}
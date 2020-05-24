export enum CHANNEL { CH1, CH2, MASTER }
export enum WAVEFORM { SINE = 'sine', SQUARE = 'square' }

export abstract class SynthComponent {
	
	public abstract node: GainNode | OscillatorNode | DelayNode

	protected ctx: AudioContext
	protected path: CHANNEL
	protected output: SynthComponent

	constructor(ctx: AudioContext, path: CHANNEL) {

		this.ctx = ctx
		this.path = path
	}

	public drive(component: SynthComponent) {

		this.output = component
		if (this.node) { this.node.connect(this.output.node) }
	}
}

import { SynthComponent, CHANNEL } from "./synth-component.js"

export class Gain extends SynthComponent {

	public node: GainNode
	
	public get gain() { return this.node.gain }

	constructor(ctx: AudioContext, path: CHANNEL) {

		super(ctx, path)
		this.node = this.ctx.createGain()

		if (path == CHANNEL.MASTER) { 
			this.node.connect(ctx.destination)
			this.gain.value = .1
		}
	}
}
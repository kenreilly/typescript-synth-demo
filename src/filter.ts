import { SynthComponent, CHANNEL } from "./synth-component.js"

export class Filter extends SynthComponent {

	public node: BiquadFilterNode

	constructor(ctx: AudioContext, path: CHANNEL) {
		
		super(ctx, path)
		this.node = new BiquadFilterNode(ctx)
	}
}
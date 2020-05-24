import { SynthComponent, CHANNEL } from "./synth-component.js"

export class Delay extends SynthComponent {

	public node: GainNode
	public delay: DelayNode
	public dry: GainNode
	public wet: GainNode

	public set mix(x: number) {
		this.dry.gain.value = ((100 - x) / 10)
		this.wet.gain.value = (x / 100)
	}

	constructor(ctx: AudioContext, path: CHANNEL) {
		
		super(ctx, path)
		this.node = ctx.createGain()
		this.delay = ctx.createDelay(.5)
		this.delay.delayTime.value = 0.2
		this.dry = ctx.createGain()
		this.wet = ctx.createGain()
		this.node.connect(this.dry)
		this.node.connect(this.delay)
		this.delay.connect(this.wet)
		this.mix = 50
	}

	public drive(component: SynthComponent) {

		this.output = component
		this.dry.connect(this.output.node)
		this.wet.connect(this.output.node)
	}
}
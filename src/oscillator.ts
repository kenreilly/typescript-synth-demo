import { WAVEFORM, CHANNEL, SynthComponent } from "./synth-component.js"

export class Oscillator extends SynthComponent {

	public node: OscillatorNode
	private level: GainNode
	private wave: WAVEFORM
	private playing: boolean
	private ramp: GainNode
	
	set gain(x: number) { this.level.gain.value = (x / 100) }
	
	private _detune: number = 0;
	set detune(x: number) { 

		let val: number = (50 - x)

		this._detune = val
		if (this.playing) { this.node.detune.value = val }
	}

	constructor(ctx: AudioContext, path: CHANNEL, wave: WAVEFORM) { 

		super(ctx, path)
		this.wave = wave
		this.ramp = ctx.createGain()
		this.level = ctx.createGain()
		this.ramp.connect(this.level)
	}
	
	private clamp(curve: Array<number>, t: number) {

		try { this.ramp.gain.setValueCurveAtTime(curve, this.ctx.currentTime, t) }
		catch { this.node.stop() }
	}
		
	public play(freq: number) {

		if (this.playing) { return } // monophonic
		this.playing = true

		this.ramp.gain.value = 0
		this.node = this.ctx.createOscillator()
		this.node.frequency.value = freq
		this.node.detune.value = this._detune
		this.node.type = this.wave

		this.level.connect(this.output.node)
		this.node.connect(this.level)
		this.node.start()
		this.clamp([0, 0.4, 1], .05)
	}

	public stop() {

		this.playing = false
		this.clamp([1, 0.6, 0], .08)
		this.node.stop(this.ctx.currentTime + .1)
	}
}

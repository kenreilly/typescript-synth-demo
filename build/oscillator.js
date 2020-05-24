import { SynthComponent } from "./synth-component.js";
export class Oscillator extends SynthComponent {
    constructor(ctx, path, wave) {
        super(ctx, path);
        this.wave = wave;
        this.ramp = ctx.createGain();
    }
    clamp(curve, t) {
        try {
            this.ramp.gain.setValueCurveAtTime(curve, this.ctx.currentTime, t);
        }
        catch (_a) {
            this.node.stop();
        }
    }
    play(freq) {
        if (this.playing) {
            return;
        } // monophonic
        this.playing = true;
        this.ramp.gain.value = 0;
        this.node = this.ctx.createOscillator();
        this.node.frequency.value = freq;
        this.node.type = this.wave;
        this.node.connect(this.output.node);
        this.node.start();
        this.clamp([0, 0.4, 1], .05);
    }
    stop() {
        this.playing = false;
        this.clamp([1, 0.6, 0], .08);
        this.node.stop(this.ctx.currentTime + .1);
    }
}

import { SynthComponent } from "./synth-component.js";
export class Delay extends SynthComponent {
    set mix(x) {
        this.dry.gain.value = ((100 - x) / 10);
        this.wet.gain.value = (x / 100);
    }
    constructor(ctx, path) {
        super(ctx, path);
        this.node = ctx.createGain();
        this.delay = ctx.createDelay(.5);
        this.delay.delayTime.value = 0.2;
        this.dry = ctx.createGain();
        this.wet = ctx.createGain();
        this.node.connect(this.dry);
        this.node.connect(this.delay);
        this.delay.connect(this.wet);
        this.mix = 50;
    }
    drive(component) {
        this.output = component;
        this.dry.connect(this.output.node);
        this.wet.connect(this.output.node);
    }
}

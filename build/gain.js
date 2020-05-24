import { SynthComponent, CHANNEL } from "./synth-component.js";
export class Gain extends SynthComponent {
    get gain() { return this.node.gain; }
    constructor(ctx, path) {
        super(ctx, path);
        this.node = this.ctx.createGain();
        if (path == CHANNEL.MASTER) {
            this.node.connect(ctx.destination);
            this.gain.value = .1;
        }
    }
}

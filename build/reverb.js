import { SynthComponent } from "./synth-component.js";
export class Filter extends SynthComponent {
    constructor(ctx, path) {
        super(ctx, path);
        this.node = new BiquadFilterNode(ctx);
    }
}

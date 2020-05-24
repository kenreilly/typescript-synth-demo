export var CHANNEL;
(function (CHANNEL) {
    CHANNEL[CHANNEL["CH1"] = 0] = "CH1";
    CHANNEL[CHANNEL["CH2"] = 1] = "CH2";
    CHANNEL[CHANNEL["MASTER"] = 2] = "MASTER";
})(CHANNEL || (CHANNEL = {}));
export var WAVEFORM;
(function (WAVEFORM) {
    WAVEFORM["SINE"] = "sine";
    WAVEFORM["SQUARE"] = "square";
})(WAVEFORM || (WAVEFORM = {}));
export class SynthComponent {
    constructor(ctx, path) {
        this.ctx = ctx;
        this.path = path;
    }
    drive(component) {
        this.output = component;
        if (this.node) {
            this.node.connect(this.output.node);
        }
    }
}

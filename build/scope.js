export class Scope {
    get width() { return this.canvas.width; }
    get height() { return this.canvas.height; }
    constructor(engine, canvas) {
        this.node = engine.ctx.createAnalyser();
        this.node.fftSize = 2048;
        engine.output.node.connect(this.node);
        this.node.smoothingTimeConstant = 0.2;
        this.canvas = canvas;
        this.canvas_ctx = this.canvas.getContext('2d');
        this.canvas_ctx.lineWidth = 1;
        this.canvas_ctx.strokeStyle = "rgb(20,200,120)";
        this.canvas_ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        this.run();
    }
    run() {
        var data = new Uint8Array(this.node.fftSize);
        this.node.getByteTimeDomainData(data);
        this.render(this.getWaveform(data));
        requestAnimationFrame(this.run.bind(this));
    }
    render(data) {
        this.canvas_ctx.clearRect(0, 0, this.width, this.height);
        this.canvas_ctx.fillRect(0, 0, this.width, this.height);
        this.canvas_ctx.beginPath();
        this.canvas_ctx.moveTo(0, this.height / 2);
        this.canvas_ctx.lineTo(this.width, this.height / 2);
        this.canvas_ctx.setLineDash([1, 2]);
        this.canvas_ctx.stroke();
        this.canvas_ctx.beginPath();
        this.canvas_ctx.moveTo(this.width / 2, 0);
        this.canvas_ctx.lineTo(this.width / 2, this.height);
        this.canvas_ctx.setLineDash([1, 2]);
        this.canvas_ctx.stroke();
        if (!data.length) {
            return;
        }
        this.canvas_ctx.beginPath();
        var sz = (this.canvas.width) / data.length, i = 0, x = 0;
        while (x <= this.width) {
            if (i === data.length) {
                i = 0;
            }
            var v = data[i] / 128.0;
            var y = this.height - (v * this.height / 2);
            if (i === 0) {
                this.canvas_ctx.moveTo(x, y);
            }
            else {
                this.canvas_ctx.lineTo(x, y);
            }
            x += sz;
            ++i;
        }
        var dash = [Math.round(8 * (100 - y)), Math.round(2 * (Math.random()) + 1)];
        this.canvas_ctx.setLineDash(Math.round(0.420 + Math.random()) ? [0] : dash);
        this.canvas_ctx.setLineDash([0]);
        this.canvas_ctx.lineTo(this.width, this.height / 2);
        this.canvas_ctx.stroke();
    }
    getWaveform(data) {
        for (var phase = 0, offset = 0, x = 0, xx = data.length; x != xx; ++x) {
            if (data[x] > 127) { // 8-bit unsigned, 127 = 0dB
                switch (phase) { // positive phase
                    case 0:
                        offset = x; // set waveform start
                        phase += 180; // shift 180 degrees
                        continue;
                    case 360: // return captured waveform
                        return data.slice(offset - 1, x);
                }
            }
            else {
                switch (phase) { // negative phase
                    case 180:
                        phase += 180; // shift 180 degrees
                        continue;
                }
            }
        }
        return new Uint8Array(0);
    }
}

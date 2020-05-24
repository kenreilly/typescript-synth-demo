import { EventBus, ControlEvent, ControlType } from "./event-bus.js"
import { CHANNEL } from "./synth-component.js"

export class Slider {

	private label: HTMLLabelElement
	private input: HTMLInputElement

	public get elements() { return [ this.label, this.input ]}

	constructor(bus: EventBus, path: CHANNEL, type: ControlType, name: string) {

		this.label = <HTMLLabelElement>document.createElement('label')
		this.input = <HTMLInputElement>document.createElement('input')

		this.label.innerText = name
		this.input.type = 'range'
		this.input.min = '1'
		this.input.max = '100'
		this.input.value = '50'

		this.input.oninput = (ev) => this.on_event(bus, ev, path, type)
	}

	on_event(bus, ev, path, type) {

		bus.fire(new ControlEvent(path, type, (<HTMLInputElement>ev.target).value))
	}
}

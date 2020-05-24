import { EventBus, ControlEvent, ControlType } from "./event-bus"
import { CHANNEL } from "./synth-component"

export abstract class Slider {

	static create(bus: EventBus, path: CHANNEL, type: ControlType, name: String): Array<HTMLElement> {

		let label: HTMLLabelElement = <HTMLLabelElement>document.createElement('label')
		let input: HTMLInputElement = <HTMLInputElement>document.createElement('input')

		input.type = 'range'
		input.min = '1'
		input.max = '100'
		input.value = '50'

		input.onchange = () => bus.fire(new ControlEvent(path, type))
		return [label, input]
	}
}

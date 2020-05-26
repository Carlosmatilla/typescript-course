import Component from './base-component.js'
import { validate, Validatable } from '../utils/validation.js'
import autobind from '../decorators/autobind.js'
import { projectState } from '../state/project-state.js'


export default class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{

  titleInputElement: HTMLInputElement
  descriptionInputElement: HTMLInputElement
  peopleInputElement: HTMLInputElement

  constructor() {
    super('project-input', 'app', true, 'user-input')
    this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement
    this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement
    this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement
    this.configure()
  }

  configure() {
    this.element.addEventListener('submit', this.handleSubmit)
  }

  renderContent() { }

  private handleInputs(): [string, string, number] | void {

    const title = this.titleInputElement.value
    const description = this.descriptionInputElement.value
    const people = this.peopleInputElement.value

    const titleValidatable: Validatable = {
      value: title,
      required: true,
      minLength: 3,
      maxLength: 30
    }

    const descriptionValidatable: Validatable = {
      value: description,
      required: true,
      minLength: 5,
      maxLength: 100
    }

    const peopleValidatable: Validatable = {
      value: +people,
      required: true,
      min: 1,
      max: 5
    }

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)

    ) {
      alert("Incorrect Input")
      return
    } else {
      return [title, description, +people]
    }
  }

  private clearInputs() {
    this.titleInputElement.value = ""
    this.descriptionInputElement.value = ""
    this.peopleInputElement.value = ""
  }

  @autobind
  private handleSubmit(e: Event) {
    e.preventDefault()
    const userInput = this.handleInputs()
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput
      projectState.addProject(title, description, people)
      this.clearInputs()
    }
  }
}
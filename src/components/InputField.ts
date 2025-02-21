export class InputField {
    constructor(private id: string, private type: string, private placeholder: string) {}

    public render(): HTMLElement {
        const input = document.createElement("input");
        input.id = this.id;
        input.type = this.type;
        input.placeholder = this.placeholder;
        input.classList.add("input-field");
        return input;
    }
}

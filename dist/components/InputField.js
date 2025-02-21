export class InputField {
    constructor(id, type, placeholder) {
        this.id = id;
        this.type = type;
        this.placeholder = placeholder;
    }
    render() {
        const input = document.createElement("input");
        input.id = this.id;
        input.type = this.type;
        input.placeholder = this.placeholder;
        input.classList.add("input-field");
        return input;
    }
}

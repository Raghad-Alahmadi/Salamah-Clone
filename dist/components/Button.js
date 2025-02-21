export class Button {
    constructor(label, onClick) {
        this.label = label;
        this.onClick = onClick;
    }
    render() {
        const button = document.createElement("button");
        button.innerText = this.label;
        button.addEventListener("click", this.onClick);
        button.classList.add("btn");
        return button;
    }
}

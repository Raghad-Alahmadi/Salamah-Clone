export class Button {
    constructor(private label: string, private onClick: (event: Event) => void) {}

    public render(): HTMLButtonElement {
        const button = document.createElement("button");
        button.innerText = this.label;
        button.addEventListener("click", this.onClick);
        button.classList.add("btn");
        return button;
    }
}

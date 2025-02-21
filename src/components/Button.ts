export class Button {
    constructor(private label: string, private onClick: (event: Event) => void) {}

    public render(): HTMLButtonElement {
        const button = document.createElement("button");
        button.innerText = this.label;
        button.addEventListener("click", this.onClick);
        button.className = "bg-[#36ba8c] hover:bg-[#2a9d70] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
        return button;
    }
}
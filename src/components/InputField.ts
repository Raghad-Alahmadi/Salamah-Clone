export class InputField {
    constructor(private id: string, private type: string, private placeholder: string) {}

    public render(): HTMLElement {
        const input = document.createElement("input");
        input.id = this.id;
        input.type = this.type;
        input.placeholder = this.placeholder;
        input.className = "block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-200 focus:border-green-300 sm:text-sm";
        return input;
    }
}
export class Footer {
    private footerElement: HTMLElement;

    constructor() {
        //adding line separator before footer
        const lineSeparator = document.createElement("hr");
        lineSeparator.className = "mt-9 max-w-6xl mx-auto";
        document.body.appendChild(lineSeparator);
        
        this.footerElement = document.createElement("footer");
        this.footerElement.className = "bg-customGray text-green-500 p-9 flex justify-center items-center shadow-md mt-auto";
        this.renderFooter();
    }

    private renderFooter() {
        const footerText = document.createElement("div");
        footerText.className = "text-sm";
        footerText.textContent = "All rights reserved © ELM 2025";

        this.footerElement.appendChild(footerText);
    }

    public render(): HTMLElement {
        return this.footerElement;
    }
}
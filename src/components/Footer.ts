export class Footer {
    private footerElement: HTMLElement;

    constructor() {
        //adding line seperator before footer
        const lineSeperator = document.createElement("hr");
        lineSeperator.className = "mt-5 max-w-6xl mx-auto";
        document.body.appendChild(lineSeperator);
        
        this.footerElement = document.createElement("footer");
        this.footerElement.className = "bg-customGray text-green-500 p-7 flex justify-center items-center shadow-md";
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
import { Button } from './Button';

export class Popup {
    private popupElement: HTMLDivElement;

    constructor(private termsText: string) {
        this.popupElement = document.createElement("div");
        this.popupElement.className = "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto";
        this.popupElement.innerHTML = `
            <div class="popup-content bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="terms-content mb-4 text-black dark:text-white">${this.termsText}</div>
            </div>
        `;
    }

    public render(): HTMLDivElement {
        const closeButton = new Button("Close", () => {
            this.popupElement.remove();
        });

        const popupContent = this.popupElement.querySelector(".popup-content") as HTMLDivElement;
        popupContent.appendChild(closeButton.render());

        return this.popupElement;
    }
}
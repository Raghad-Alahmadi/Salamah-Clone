export class Popup {
    private popupElement: HTMLDivElement;

    constructor(private termsText: string) {
        this.popupElement = document.createElement("div");
        this.popupElement.className = "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto";
        this.popupElement.innerHTML = `
            <div class="bg-white p-6 rounded shadow-md max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="terms-content mb-4">${this.termsText}</div>
                <button class="close-button bg-[#36ba8c] hover:bg-[#2a9d70] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Close</button>
            </div>
        `;
    }

    public render(): HTMLDivElement {
        const closeButton = this.popupElement.querySelector(".close-button") as HTMLButtonElement;
        closeButton.addEventListener("click", () => {
            this.popupElement.remove();
        });
        return this.popupElement;
    }
}
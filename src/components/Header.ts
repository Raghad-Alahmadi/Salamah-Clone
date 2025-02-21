export class Header {
    private headerElement: HTMLElement;

    constructor() {
        this.headerElement = document.createElement("header");
        this.headerElement.className = "bg-customGray text-black p-2 flex justify-between items-center shadow-md";
        this.renderHeader();
    }

    private renderHeader() {
        const leftItem = document.createElement("div");
        leftItem.className = "text-sm flex items-center hover:text-green-500 transition-colors duration-300";

        const rightItem = document.createElement("div");
        rightItem.className = "text-sm flex items-center hover:text-green-500 transition-colors duration-300";
        rightItem.textContent = "عربي";

        const phoneNumber = document.createElement("span");
        phoneNumber.textContent = "920000356";
        phoneNumber.className = "font-bold";

        const phoneIcon = document.createElement("i");
        phoneIcon.className = "fas fa-phone-alt mr-2 ml-1";

        leftItem.appendChild(phoneIcon);
        leftItem.appendChild(phoneNumber);

        this.headerElement.appendChild(leftItem);
        this.headerElement.appendChild(rightItem);
    }

    public render(): HTMLElement {
        return this.headerElement;
    }
}
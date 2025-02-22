import { DarkMode } from './Darkmode';
import { Button } from './Button';

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
        rightItem.className = "text-sm flex items-center hover:text-green-500 transition-colors duration-300 ml-2";

        const phoneNumber = document.createElement("span");
        phoneNumber.textContent = "920000356";
        phoneNumber.className = "font-bold";

        const phoneIcon = document.createElement("i");
        phoneIcon.className = "fas fa-phone-alt mr-2 ml-1";

        leftItem.appendChild(phoneIcon);
        leftItem.appendChild(phoneNumber);

        // Create dark mode toggle button using Button component
        const darkModeToggle = new Button("Toggle Dark Mode", (event: Event) => {
            DarkMode.toggleDarkMode();
        });

        const darkModeToggleElement = darkModeToggle.render();
        darkModeToggleElement.classList.add("mr-4"); 

        rightItem.appendChild(darkModeToggleElement);
        rightItem.appendChild(document.createTextNode("عربي"));

        this.headerElement.appendChild(leftItem);
        this.headerElement.appendChild(rightItem);
    }

    public render(): HTMLElement {
        return this.headerElement;
    }
}
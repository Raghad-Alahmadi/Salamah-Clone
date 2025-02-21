import { InputField } from "./InputField";
import { Button } from "./Button";
import { Validation } from "./Validation";
import { API } from "./API";

export class Form {
    private formElement: HTMLFormElement;

    constructor() {
        this.formElement = document.createElement("form");
        this.formElement.className = "bg-white p-6 rounded shadow-md max-w-lg mx-auto";
        this.renderForm();
    }

    private renderForm() {
        const fields = [
            { type: "text", id: "companyName", placeholder: "Company Name" },
            { type: "text", id: "commercialReg", placeholder: "Commercial Registration Number" },
            { type: "email", id: "email", placeholder: "Email" },
            { type: "tel", id: "phone", placeholder: "Phone Number" },
            { type: "password", id: "password", placeholder: "Password" },
            { type: "password", id: "confirmPassword", placeholder: "Confirm Password" }
        ];

        fields.forEach(field => {
            const input = new InputField(field.id, field.type, field.placeholder);
            this.formElement.appendChild(input.render());
        });

        const submitButton = new Button("Submit", this.handleSubmit.bind(this));
        this.formElement.appendChild(submitButton.render());
    }

    private async handleSubmit(event: Event) {
        event.preventDefault();
        if (Validation.validateForm(this.formElement)) {
            const companyData = await API.fetchCompanyData();
            console.log("Fetched Company Data:", companyData);
            alert("Registration successful!");
        }
    }

    public render(): HTMLElement {
        return this.formElement;
    }
}
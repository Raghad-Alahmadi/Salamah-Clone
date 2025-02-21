var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { InputField } from "./InputField";
import { Button } from "./Button";
import { API } from "./API";
import { Validation } from "./Validation";
export class Form {
    constructor() {
        this.form = document.createElement("form");
        this.form.innerHTML = `
            <h2>Register Your Company</h2>
            <div id="form-fields"></div>
            <div id="error-message"></div>
        `;
        this.createFormFields();
    }
    createFormFields() {
        const fields = [
            { id: "companyName", type: "text", placeholder: "Company Name" },
            { id: "regNumber", type: "text", placeholder: "Commercial Registration Number" },
            { id: "email", type: "email", placeholder: "Email" },
            { id: "phone", type: "tel", placeholder: "Phone Number" },
            { id: "password", type: "password", placeholder: "Password" },
            { id: "confirmPassword", type: "password", placeholder: "Confirm Password" },
            { id: "city", type: "text", placeholder: "City" },
            { id: "region", type: "text", placeholder: "Region" },
            { id: "zip", type: "text", placeholder: "Zip Code" },
        ];
        const formFieldsContainer = this.form.querySelector("#form-fields");
        fields.forEach(field => {
            const inputField = new InputField(field.id, field.type, field.placeholder);
            if (formFieldsContainer) {
                formFieldsContainer.appendChild(inputField.render());
            }
        });
        const submitButton = new Button("Submit", this.handleSubmit.bind(this));
        this.form.appendChild(submitButton.render());
    }
    handleSubmit(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            // Validate fields
            const isValid = Validation.validateForm(this.form);
            if (!isValid)
                return;
            // API Call
            try {
                const data = yield API.fetchCompanyData();
                console.log("Company Data:", data);
            }
            catch (error) {
                console.error("API Error:", error);
            }
        });
    }
    render() {
        return this.form;
    }
}

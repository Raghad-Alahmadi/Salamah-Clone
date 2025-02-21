import { InputField } from "./InputField";
import { Button } from "./Button";
import { Validation } from "./Validation";
import { API } from "./API";
import { Popup } from "./Popup";

export class Form {
    private formElement: HTMLFormElement;
    private companyData: any;
    private businessTypes: string[] = [];

    constructor() {
        this.formElement = document.createElement("form");
        this.formElement.className = "bg-white p-6 rounded shadow-md max-w-6xl mx-auto";
        
        const header = document.createElement("h2");
        header.textContent = "Permit Requester Registration";
        header.className = "text-2xl font-semibold mb-6 justify-self-center";

        this.formElement.appendChild(header);

        const header2 = document.createElement("h2");
        header2.textContent = "Organization Information";
        header2.className = "text-xl font-semibold mb-6";
        this.formElement.appendChild(header2);
        
        const separator = document.createElement("hr");
        separator.className = "mb-8";
        this.formElement.appendChild(separator);

        this.renderForm();
        this.fetchAndPopulateCompanyData();
    }

    private renderForm() {
        const fields = [
            { type: "text", id: "companyName", label: "Company Name", placeholder: "Company Name" },
            { type: "text", id: "commercialReg", label: "Commercial Registration Number", placeholder: "Commercial Registration Number" },
            { type: "email", id: "email", label: "Email", placeholder: "Email" },
            { type: "tel", id: "phone", label: "Phone Number", placeholder: "Phone Number" },
            { type: "password", id: "password", label: "Password", placeholder: "Password" },
            { type: "password", id: "confirmPassword", label: "Confirm Password", placeholder: "Confirm Password" },
            { type: "text", id: "city", label: "City", placeholder: "City" },
            { type: "text", id: "region", label: "Region", placeholder: "Region" },
            { type: "text", id: "zipCode", label: "Zip Code", placeholder: "Zip Code" },
            { type: "dropdown", id: "businessType", label: "Business Type", placeholder: "Please Choose", options: this.businessTypes },
            { type: "checkbox", id: "terms", label: "I agree to the Terms & Conditions" }
        ];

        // First Row: Company Name and Commercial Registration Number
        const firstRow = document.createElement("div");
        firstRow.className = "flex flex-wrap space-x-4 mb-4";
        fields.slice(0, 2).forEach(field => {
            const label = document.createElement("label");
            label.htmlFor = field.id;
            label.textContent = field.label;
            label.className = "block text-sm font-medium text-gray-700 mb-1";

            const input = new InputField(field.id, field.type, field.placeholder).render();
            const errorElement = document.createElement("span");
            errorElement.className = "text-red-500 text-sm";

            const fieldContainer = document.createElement("div");
            fieldContainer.className = "flex-1 min-w-[200px]"; // Ensure minimum width for responsiveness
            fieldContainer.appendChild(label);
            fieldContainer.appendChild(input);
            fieldContainer.appendChild(errorElement);

            firstRow.appendChild(fieldContainer);
        });
        this.formElement.appendChild(firstRow);

        // Second Row: Email and Phone Number
        const secondRow = document.createElement("div");
        secondRow.className = "flex flex-wrap space-x-4 mb-4";
        fields.slice(2, 4).forEach(field => {
            const label = document.createElement("label");
            label.htmlFor = field.id;
            label.textContent = field.label;
            label.className = "block text-sm font-medium text-gray-700 mb-1";

            const input = new InputField(field.id, field.type, field.placeholder).render();
            const errorElement = document.createElement("span");
            errorElement.className = "text-red-500 text-sm";

            const fieldContainer = document.createElement("div");
            fieldContainer.className = "flex-1 min-w-[200px]"; // Ensure minimum width for responsiveness
            fieldContainer.appendChild(label);
            fieldContainer.appendChild(input);
            fieldContainer.appendChild(errorElement);

            secondRow.appendChild(fieldContainer);
        });
        this.formElement.appendChild(secondRow);

        // Third Row: Password and Confirm Password
        const thirdRow = document.createElement("div");
        thirdRow.className = "flex flex-wrap space-x-4 mb-4";
        fields.slice(4, 6).forEach(field => {
            const label = document.createElement("label");
            label.htmlFor = field.id;
            label.textContent = field.label;
            label.className = "block text-sm font-medium text-gray-700 mb-1";

            const input = new InputField(field.id, field.type, field.placeholder).render();
            const errorElement = document.createElement("span");
            errorElement.className = "text-red-500 text-sm";

            const fieldContainer = document.createElement("div");
            fieldContainer.className = "flex-1 min-w-[200px]"; // Ensure minimum width for responsiveness
            fieldContainer.appendChild(label);
            fieldContainer.appendChild(input);
            fieldContainer.appendChild(errorElement);

            thirdRow.appendChild(fieldContainer);
        });
        this.formElement.appendChild(thirdRow);

        // Fourth Row: Address (City, Region, Zip Code)
        const fourthRow = document.createElement("div");
        fourthRow.className = "flex flex-wrap space-x-4 mb-4";
        fields.slice(6, 9).forEach(field => {
            const label = document.createElement("label");
            label.htmlFor = field.id;
            label.textContent = field.label;
            label.className = "block text-sm font-medium text-gray-700 mb-1";

            const input = new InputField(field.id, field.type, field.placeholder).render();
            const errorElement = document.createElement("span");
            errorElement.className = "text-red-500 text-sm";

            const fieldContainer = document.createElement("div");
            fieldContainer.className = "flex-1 min-w-[200px]"; // Ensure minimum width for responsiveness
            fieldContainer.appendChild(label);
            fieldContainer.appendChild(input);
            fieldContainer.appendChild(errorElement);

            fourthRow.appendChild(fieldContainer);
        });
        this.formElement.appendChild(fourthRow);

        // Fifth Row: Business Type
        const businessTypeRow = document.createElement("div");
        businessTypeRow.className = "mb-4";
        const businessTypeField = fields[9];
        const label = document.createElement("label");
        label.htmlFor = businessTypeField.id;
        label.textContent = businessTypeField.label;
        label.className = "block text-sm font-medium text-gray-700 mb-1";

        const input = document.createElement("select");
        input.id = businessTypeField.id;
        input.className = "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

        const placeholderOption = document.createElement("option");
        placeholderOption.value = "";
        placeholderOption.textContent = businessTypeField.placeholder;
        placeholderOption.disabled = true;
        placeholderOption.selected = true;
        input.appendChild(placeholderOption);

        this.businessTypes.forEach(option => {
            const optionElement = document.createElement("option");
            optionElement.value = option;
            optionElement.textContent = option;
            input.appendChild(optionElement);
        });

        const errorElement = document.createElement("span");
        errorElement.className = "text-red-500 text-sm";

        const fieldContainer = document.createElement("div");
        fieldContainer.appendChild(label);
        fieldContainer.appendChild(input);
        fieldContainer.appendChild(errorElement);

        businessTypeRow.appendChild(fieldContainer);
        this.formElement.appendChild(businessTypeRow);

        // Term Conditions and Submit Button
        const termRow = document.createElement("div");
        termRow.className = "flex items-center mb-6";

        // Checkbox field
        const termsField = fields[10];

        // Create the checkbox input element
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = termsField.id;
        checkbox.className = "h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500";

        // Create the label for the checkbox
        const checkboxLabel = document.createElement("label");
        checkboxLabel.htmlFor = termsField.id;
        checkboxLabel.className = "ml-2 text-sm font-medium text-gray-700";
        checkboxLabel.textContent = termsField.label;

        // Create the link to open the Terms & Conditions popup
        const termsLink = document.createElement("a");
        termsLink.href = "#";
        termsLink.className = "ml-2 text-sm text-blue-800 hover:underline";
        termsLink.textContent = "Terms & Conditions";
        termsLink.addEventListener("click", (event) => {
            event.preventDefault();
            const termsPopup = new Popup(`
                <h3 class="text-xl font-semibold mb-4">Terms and Conditions</h3>
                <p><strong>Welcome to Salamah!</strong> By accessing or using our services, you agree to comply with the following terms and conditions. Please read them carefully before using our platform.</p>
                
                <ol class="list-decimal pl-6">
                    <li><strong>User Responsibilities</strong>
                        <ul class="list-inside">
                            <li>You agree to provide accurate, complete, and up-to-date information when registering or interacting with the platform.</li>
                            <li>You must be at least 13 years old to use Salamah.</li>
                            <li>You are responsible for maintaining the confidentiality of your account details and for all activities under your account.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Privacy</strong>
                        <ul class="list-inside">
                            <li>We are committed to protecting your privacy. We will not share your personal information with third parties without your consent, except as required by law or as outlined in our Privacy Policy.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Content Ownership</strong>
                        <ul class="list-inside">
                            <li>You retain ownership of the content you upload to Salamah, but by submitting content, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Prohibited Activities</strong>
                        <ul class="list-inside">
                            <li>You agree not to engage in any activity that violates local, state, or international laws, including but not limited to:
                                <ul>
                                    <li>Harassing, defaming, or abusing others.</li>
                                    <li>Uploading or sharing malicious software or malware.</li>
                                    <li>Spamming or distributing unsolicited messages.</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    
                    <li><strong>Termination</strong>
                        <ul class="list-inside">
                            <li>We may suspend or terminate your access to Salamah if you violate any of the terms outlined in this agreement.</li>
                            <li>You may close your account at any time by following the account deletion process.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Limitation of Liability</strong>
                        <ul class="list-inside">
                            <li>Salamah is not liable for any damages arising from the use or inability to use the platform, including but not limited to direct, indirect, incidental, and consequential damages.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Amendments</strong>
                        <ul class="list-inside">
                            <li>We reserve the right to modify these Terms and Conditions at any time. Changes will be posted on this page, and your continued use of Salamah after such modifications will constitute your acceptance of the revised terms.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Governing Law</strong>
                        <ul class="list-inside">
                            <li>These Terms and Conditions will be governed by the laws of the jurisdiction in which you reside, without regard to its conflict of law principles.</li>
                        </ul>
                    </li>
                </ol>

                <p>By using Salamah, you confirm that you have read, understood, and agree to these Terms and Conditions.</p>
                
                <p>If you have any questions or concerns about these Terms, please contact us at <a href="mailto:support@salamah.com" class="text-blue-500">support@salamah.com</a>.</p>

                <p class="mt-4"><strong>By clicking "I agree to the Terms & Conditions,"</strong> you acknowledge that you have read, understood, and agreed to the terms outlined above.</p>
            `);

            document.body.appendChild(termsPopup.render());
        });

        // Container for checkbox and label
        const checkboxContainer = document.createElement("div");
        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(checkboxLabel);
        checkboxContainer.appendChild(termsLink);

        // Append the checkbox container to the termRow
        termRow.appendChild(checkboxContainer);

        // Append the termRow to the form
        this.formElement.appendChild(termRow);

        // Submit Button
        const submitButton = new Button("Submit", this.handleSubmit.bind(this));
        this.formElement.appendChild(submitButton.render());
    }

    private handleSubmit(event: Event) {
        event.preventDefault(); // Prevent the default form submission

        const termsCheckbox = this.formElement.querySelector("#terms") as HTMLInputElement;
        const businessTypeSelect = this.formElement.querySelector("#businessType") as HTMLSelectElement;
        const businessTypeErrorElement = businessTypeSelect.nextElementSibling as HTMLElement;
        const errorElement = this.formElement.querySelector(".error-message") as HTMLElement;

        let errorMessage = "";

        if (!termsCheckbox.checked) {
            errorMessage = "You must agree to the Terms & Conditions before submitting the form.";
        }

        if (errorMessage) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = "block";
        }

        if (!errorMessage && Validation.validateForm(this.formElement)) {
            const formData = this.getFormData();
            console.log("Form submitted with data:", formData);

            // Show success popup
            const successPopup = new Popup(`
                <h3 class="text-xl font-semibold mb-4">Success</h3>
                <p>You have successfully registered</p>
            `);
            document.body.appendChild(successPopup.render());
        } else {
            errorElement.textContent = "Form validation failed. Please check your input.";
            errorElement.style.display = "block";
        }
    }

    private getFormData(): Record<string, any> {
        const formData: Record<string, any> = {};
        const inputs = this.formElement.querySelectorAll("input, select");

        inputs.forEach(input => {
            if (input.type === "checkbox") {
                formData[input.id] = (input as HTMLInputElement).checked;
            } else {
                formData[input.id] = input.value;
            }
        });

        return formData;
    }

    private async fetchAndPopulateCompanyData() {
        try {
            const companyData = await API.fetchCompanyData();
            this.companyData = companyData[0]; // Assuming we use the first company data for pre-filling
            this.businessTypes = companyData.map((company: any) => company.company.bs); // Assuming bs is a field in the API response
            this.populateFormFields();
            this.populateBusinessTypeDropdown();
        } catch (error) {
            console.error("Failed to fetch company data:", error);
        }
    }

    private populateFormFields() {
        if (!this.companyData) return;

        const companyNameInput = this.formElement.querySelector("#companyName") as HTMLInputElement;
        const emailInput = this.formElement.querySelector("#email") as HTMLInputElement;
        const phoneInput = this.formElement.querySelector("#phone") as HTMLInputElement;
        const cityInput = this.formElement.querySelector("#city") as HTMLInputElement;
        const regionInput = this.formElement.querySelector("#region") as HTMLInputElement;
        const zipCodeInput = this.formElement.querySelector("#zipCode") as HTMLInputElement;

        if (companyNameInput) companyNameInput.value = this.companyData.company.name;
        if (emailInput) emailInput.value = this.companyData.email;
        if (phoneInput) phoneInput.value = this.companyData.phone;
        if (cityInput) cityInput.value = this.companyData.address.city;
        if (regionInput) regionInput.value = this.companyData.address.suite;
        if (zipCodeInput) zipCodeInput.value = this.companyData.address.zipcode;
    }

    private populateBusinessTypeDropdown() {
        const businessTypeSelect = this.formElement.querySelector("#businessType") as HTMLSelectElement;
        if (!businessTypeSelect) return;

        // Clear existing options
        businessTypeSelect.innerHTML = "";

        // Add placeholder option
        const placeholderOption = document.createElement("option");
        placeholderOption.value = "";
        placeholderOption.textContent = "Please Choose";
        placeholderOption.disabled = true;
        placeholderOption.selected = true;
        businessTypeSelect.appendChild(placeholderOption);

        // Add business type options
        this.businessTypes.forEach(businessType => {
            const optionElement = document.createElement("option");
            optionElement.value = businessType;
            optionElement.textContent = businessType;
            businessTypeSelect.appendChild(optionElement);
        });
    }

    public render(): HTMLElement {
        // Add error message element
        const errorElement = document.createElement("div");
        errorElement.className = "error-message text-red-500 text-sm";
        errorElement.style.display = "none";
        this.formElement.appendChild(errorElement);

        return this.formElement;
    }
}
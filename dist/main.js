"use strict";
(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/components/InputField.ts
  var InputField = class {
    constructor(id, type, placeholder) {
      this.id = id;
      this.type = type;
      this.placeholder = placeholder;
    }
    render() {
      const input = document.createElement("input");
      input.id = this.id;
      input.type = this.type;
      input.placeholder = this.placeholder;
      input.className = "block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-200 focus:border-green-300 sm:text-sm";
      return input;
    }
  };

  // src/components/Button.ts
  var Button = class {
    constructor(label, onClick) {
      this.label = label;
      this.onClick = onClick;
    }
    render() {
      const button = document.createElement("button");
      button.innerText = this.label;
      button.addEventListener("click", this.onClick);
      button.className = "bg-[#36ba8c] hover:bg-[#2a9d70] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
      return button;
    }
  };

  // src/components/Validation.ts
  var Validation = class {
    static initializeRealTimeValidation(form) {
      const inputs = form.querySelectorAll("input, select");
      inputs.forEach((input) => {
        input.addEventListener("input", () => this.validateInput(input, form));
      });
    }
    static validateInput(input, form) {
      const errorElement = input.nextElementSibling;
      input.classList.remove("error");
      errorElement.textContent = "";
      errorElement.classList.remove("animate__animated", "animate__shakeX");
      if (!input.value.trim()) {
        input.classList.add("error");
        errorElement.textContent = `${input.getAttribute("placeholder") || "This field"} is required.`;
        errorElement.classList.add("animate__animated", "animate__shakeX");
      }
      if (input.type === "email" && input.value.trim() && !Validation.validateEmail(input.value)) {
        input.classList.add("error");
        errorElement.textContent = "Invalid email format.";
        errorElement.classList.add("animate__animated", "animate__shakeX");
      }
      if (input.type === "password" && input.value.trim() && !Validation.validatePassword(input.value)) {
        input.classList.add("error");
        errorElement.textContent = "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.";
        errorElement.classList.add("animate__animated", "animate__shakeX");
      }
      if (input.id === "confirmPassword") {
        const passwordInput = form.querySelector("#password");
        if (passwordInput && passwordInput.value.trim() && input.value.trim() && input.value !== passwordInput.value) {
          input.classList.add("error");
          errorElement.textContent = "Passwords do not match.";
          errorElement.classList.add("animate__animated", "animate__shakeX");
        }
      }
      if (input.id === "businessType" && !input.value) {
        input.classList.add("error");
        errorElement.textContent = "Business Type is required.";
        errorElement.classList.add("animate__animated", "animate__shakeX");
      }
    }
    static validateForm(form) {
      const inputs = form.querySelectorAll("input, select");
      let valid = true;
      inputs.forEach((input) => {
        this.validateInput(input, form);
        if (input.classList.contains("error")) {
          valid = false;
        }
      });
      return valid;
    }
    static validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    static validatePassword(password) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordRegex.test(password);
    }
  };

  // src/components/API.ts
  var API = class {
    static fetchCompanyData() {
      return __async(this, null, function* () {
        try {
          const response = yield fetch("https://jsonplaceholder.typicode.com/users");
          if (!response.ok)
            throw new Error("Failed to fetch data");
          return yield response.json();
        } catch (error) {
          console.error("Error fetching company data:", error);
          throw error;
        }
      });
    }
  };

  // src/components/Popup.ts
  var Popup = class {
    constructor(termsText) {
      this.termsText = termsText;
      this.popupElement = document.createElement("div");
      this.popupElement.className = "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto";
      this.popupElement.innerHTML = `
            <div class="bg-white p-6 rounded shadow-md max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="terms-content mb-4">${this.termsText}</div>
                <button class="close-button bg-[#36ba8c] hover:bg-[#2a9d70] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Close</button>
            </div>
        `;
    }
    render() {
      const closeButton = this.popupElement.querySelector(".close-button");
      closeButton.addEventListener("click", () => {
        this.popupElement.remove();
      });
      return this.popupElement;
    }
  };

  // src/components/Form.ts
  var Form = class {
    constructor() {
      this.businessTypes = [];
      this.formElement = document.createElement("form");
      this.formElement.className = "bg-white p-6 rounded shadow-md max-w-6xl mx-auto animate__animated animate__fadeIn";
      const header = document.createElement("h2");
      header.textContent = "Permit Requester Registration";
      header.className = "text-2xl font-semibold mb-6 justify-self-center animate__animated animate__fadeInDown";
      this.formElement.appendChild(header);
      const header2 = document.createElement("h2");
      header2.textContent = "Organization Information";
      header2.className = "text-xl font-semibold mb-6 animate__animated animate__fadeInUp";
      this.formElement.appendChild(header2);
      const separator = document.createElement("hr");
      separator.className = "mb-8 animate__animated animate__fadeIn";
      this.formElement.appendChild(separator);
      this.renderForm();
      this.fetchAndPopulateCompanyData();
    }
    renderForm() {
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
      const firstRow = document.createElement("div");
      firstRow.className = "flex flex-wrap space-x-4 mb-4 animate__animated animate__fadeInLeft";
      fields.slice(0, 2).forEach((field) => {
        const label2 = document.createElement("label");
        label2.htmlFor = field.id;
        label2.textContent = field.label;
        label2.className = "block text-sm font-medium text-gray-700 mb-1";
        const input2 = new InputField(field.id, field.type, field.placeholder).render();
        const errorElement2 = document.createElement("span");
        errorElement2.className = "text-red-500 text-sm";
        const fieldContainer2 = document.createElement("div");
        fieldContainer2.className = "flex-1 min-w-[200px]";
        fieldContainer2.appendChild(label2);
        fieldContainer2.appendChild(input2);
        fieldContainer2.appendChild(errorElement2);
        firstRow.appendChild(fieldContainer2);
      });
      this.formElement.appendChild(firstRow);
      const secondRow = document.createElement("div");
      secondRow.className = "flex flex-wrap space-x-4 mb-4 animate__animated animate__fadeInRight";
      fields.slice(2, 4).forEach((field) => {
        const label2 = document.createElement("label");
        label2.htmlFor = field.id;
        label2.textContent = field.label;
        label2.className = "block text-sm font-medium text-gray-700 mb-1";
        const input2 = new InputField(field.id, field.type, field.placeholder).render();
        const errorElement2 = document.createElement("span");
        errorElement2.className = "text-red-500 text-sm";
        const fieldContainer2 = document.createElement("div");
        fieldContainer2.className = "flex-1 min-w-[200px]";
        fieldContainer2.appendChild(label2);
        fieldContainer2.appendChild(input2);
        fieldContainer2.appendChild(errorElement2);
        secondRow.appendChild(fieldContainer2);
      });
      this.formElement.appendChild(secondRow);
      const thirdRow = document.createElement("div");
      thirdRow.className = "flex flex-wrap space-x-4 mb-4 animate__animated animate__fadeInLeft";
      fields.slice(4, 6).forEach((field) => {
        const label2 = document.createElement("label");
        label2.htmlFor = field.id;
        label2.textContent = field.label;
        label2.className = "block text-sm font-medium text-gray-700 mb-1";
        const input2 = new InputField(field.id, field.type, field.placeholder).render();
        const errorElement2 = document.createElement("span");
        errorElement2.className = "text-red-500 text-sm";
        const fieldContainer2 = document.createElement("div");
        fieldContainer2.className = "flex-1 min-w-[200px]";
        fieldContainer2.appendChild(label2);
        fieldContainer2.appendChild(input2);
        fieldContainer2.appendChild(errorElement2);
        thirdRow.appendChild(fieldContainer2);
      });
      this.formElement.appendChild(thirdRow);
      const fourthRow = document.createElement("div");
      fourthRow.className = "flex flex-wrap space-x-4 mb-4 animate__animated animate__fadeInRight";
      fields.slice(6, 9).forEach((field) => {
        const label2 = document.createElement("label");
        label2.htmlFor = field.id;
        label2.textContent = field.label;
        label2.className = "block text-sm font-medium text-gray-700 mb-1";
        const input2 = new InputField(field.id, field.type, field.placeholder).render();
        const errorElement2 = document.createElement("span");
        errorElement2.className = "text-red-500 text-sm";
        const fieldContainer2 = document.createElement("div");
        fieldContainer2.className = "flex-1 min-w-[200px]";
        fieldContainer2.appendChild(label2);
        fieldContainer2.appendChild(input2);
        fieldContainer2.appendChild(errorElement2);
        fourthRow.appendChild(fieldContainer2);
      });
      this.formElement.appendChild(fourthRow);
      const businessTypeRow = document.createElement("div");
      businessTypeRow.className = "mb-4 animate__animated animate__fadeInUp";
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
      this.businessTypes.forEach((option) => {
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
      const termRow = document.createElement("div");
      termRow.className = "flex items-center mb-6 animate__animated animate__fadeInUp";
      const termsField = fields[10];
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = termsField.id;
      checkbox.className = "h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500";
      const checkboxLabel = document.createElement("label");
      checkboxLabel.htmlFor = termsField.id;
      checkboxLabel.className = "ml-2 text-sm font-medium text-gray-700";
      checkboxLabel.textContent = termsField.label;
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
      const checkboxContainer = document.createElement("div");
      checkboxContainer.appendChild(checkbox);
      checkboxContainer.appendChild(checkboxLabel);
      checkboxContainer.appendChild(termsLink);
      termRow.appendChild(checkboxContainer);
      this.formElement.appendChild(termRow);
      const submitButton = new Button("Submit", this.handleSubmit.bind(this));
      this.formElement.appendChild(submitButton.render());
    }
    handleSubmit(event) {
      event.preventDefault();
      const termsCheckbox = this.formElement.querySelector("#terms");
      const businessTypeSelect = this.formElement.querySelector("#businessType");
      const businessTypeErrorElement = businessTypeSelect.nextElementSibling;
      const errorElement = this.formElement.querySelector(".error-message");
      let errorMessage = "";
      if (!termsCheckbox.checked) {
        errorMessage += "You must agree to the Terms & Conditions before submitting the form.\n";
      }
      if (errorMessage) {
        errorElement.textContent = errorMessage;
        errorElement.style.display = "block";
        errorElement.classList.add("animate__animated", "animate__shakeX");
      } else {
        errorElement.textContent = "";
        errorElement.style.display = "none";
        errorElement.classList.remove("animate__animated", "animate__shakeX");
      }
      if (!errorMessage && Validation.validateForm(this.formElement)) {
        const formData = this.getFormData();
        console.log("Form submitted with data:", formData);
        const successPopup = new Popup(`
            <h3 class="text-xl font-semibold mb-4">Success</h3>
            <p>You have successfully registered</p>
        `);
        document.body.appendChild(successPopup.render());
      } else {
        errorElement.textContent = "Form validation failed. Please check your input.";
        errorElement.style.display = "block";
        errorElement.classList.add("animate__animated", "animate__shakeX");
      }
    }
    getFormData() {
      const formData = {};
      const inputs = this.formElement.querySelectorAll("input, select");
      inputs.forEach((input) => {
        if (input.type === "checkbox") {
          formData[input.id] = input.checked;
        } else {
          formData[input.id] = input.value;
        }
      });
      return formData;
    }
    fetchAndPopulateCompanyData() {
      return __async(this, null, function* () {
        try {
          const companyData = yield API.fetchCompanyData();
          this.companyData = companyData[0];
          this.businessTypes = companyData.map((company) => company.company.bs);
          this.populateFormFields();
          this.populateBusinessTypeDropdown();
        } catch (error) {
          console.error("Failed to fetch company data:", error);
        }
      });
    }
    populateFormFields() {
      if (!this.companyData)
        return;
      const companyNameInput = this.formElement.querySelector("#companyName");
      const emailInput = this.formElement.querySelector("#email");
      const phoneInput = this.formElement.querySelector("#phone");
      const cityInput = this.formElement.querySelector("#city");
      const regionInput = this.formElement.querySelector("#region");
      const zipCodeInput = this.formElement.querySelector("#zipCode");
      if (companyNameInput)
        companyNameInput.value = this.companyData.company.name;
      if (emailInput)
        emailInput.value = this.companyData.email;
      if (phoneInput)
        phoneInput.value = this.companyData.phone;
      if (cityInput)
        cityInput.value = this.companyData.address.city;
      if (regionInput)
        regionInput.value = this.companyData.address.suite;
      if (zipCodeInput)
        zipCodeInput.value = this.companyData.address.zipcode;
    }
    populateBusinessTypeDropdown() {
      const businessTypeSelect = this.formElement.querySelector("#businessType");
      if (!businessTypeSelect)
        return;
      businessTypeSelect.innerHTML = "";
      const placeholderOption = document.createElement("option");
      placeholderOption.value = "";
      placeholderOption.textContent = "Please Choose";
      placeholderOption.disabled = true;
      placeholderOption.selected = true;
      businessTypeSelect.appendChild(placeholderOption);
      this.businessTypes.forEach((businessType) => {
        const optionElement = document.createElement("option");
        optionElement.value = businessType;
        optionElement.textContent = businessType;
        businessTypeSelect.appendChild(optionElement);
      });
    }
    render() {
      const errorElement = document.createElement("div");
      errorElement.className = "error-message text-red-500 text-sm";
      errorElement.style.display = "none";
      this.formElement.appendChild(errorElement);
      return this.formElement;
    }
  };

  // src/components/Header.ts
  var Header = class {
    constructor() {
      this.headerElement = document.createElement("header");
      this.headerElement.className = "bg-customGray text-black p-2 flex justify-between items-center shadow-md";
      this.renderHeader();
    }
    renderHeader() {
      const leftItem = document.createElement("div");
      leftItem.className = "text-sm flex items-center hover:text-green-500 transition-colors duration-300";
      const rightItem = document.createElement("div");
      rightItem.className = "text-sm flex items-center hover:text-green-500 transition-colors duration-300";
      rightItem.textContent = "\u0639\u0631\u0628\u064A";
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
    render() {
      return this.headerElement;
    }
  };

  // src/components/Logo.ts
  var Logo = class {
    constructor() {
      this.logoElement = document.createElement("div");
      this.logoElement.className = "flex items-center p-5 mt-5 ml-5";
      this.renderLogo();
    }
    renderLogo() {
      const logoImage = document.createElement("img");
      logoImage.src = "assets/logo.svg";
      logoImage.alt = "Logo";
      logoImage.className = "h-30 w-30";
      this.logoElement.appendChild(logoImage);
    }
    render() {
      return this.logoElement;
    }
  };

  // src/components/Footer.ts
  var Footer = class {
    constructor() {
      const lineSeperator = document.createElement("hr");
      lineSeperator.className = "mt-5 max-w-6xl mx-auto";
      document.body.appendChild(lineSeperator);
      this.footerElement = document.createElement("footer");
      this.footerElement.className = "bg-customGray text-green-500 p-7 flex justify-center items-center shadow-md";
      this.renderFooter();
    }
    renderFooter() {
      const footerText = document.createElement("div");
      footerText.className = "text-sm";
      footerText.textContent = "All rights reserved \xA9 ELM 2025";
      this.footerElement.appendChild(footerText);
    }
    render() {
      return this.footerElement;
    }
  };

  // src/main.ts
  var app = document.getElementById("app");
  if (app) {
    const header = new Header();
    app.appendChild(header.render());
    const logo = new Logo();
    app.appendChild(logo.render());
    const registrationForm = new Form();
    app.appendChild(registrationForm.render());
    const footer = new Footer();
    document.body.appendChild(footer.render());
  }
})();
//# sourceMappingURL=main.js.map

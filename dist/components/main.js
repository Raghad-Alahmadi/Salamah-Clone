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
      input.classList.add("input-field");
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
      button.classList.add("btn");
      return button;
    }
  };

  // src/components/Validation.ts
  var Validation = class {
    static validateForm(form) {
      const inputs = form.querySelectorAll("input");
      let valid = true;
      inputs.forEach((input) => {
        if (!input.value.trim()) {
          valid = false;
          input.classList.add("error");
        } else {
          input.classList.remove("error");
        }
      });
      return valid;
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
          console.error(error);
        }
      });
    }
  };

  // src/components/Form.ts
  var Form = class {
    constructor() {
      this.formElement = document.createElement("form");
      this.formElement.className = "bg-white p-6 rounded shadow-md max-w-lg mx-auto";
      this.renderForm();
    }
    renderForm() {
      const fields = [
        { type: "text", id: "companyName", placeholder: "Company Name" },
        { type: "text", id: "commercialReg", placeholder: "Commercial Registration Number" },
        { type: "email", id: "email", placeholder: "Email" },
        { type: "tel", id: "phone", placeholder: "Phone Number" },
        { type: "password", id: "password", placeholder: "Password" },
        { type: "password", id: "confirmPassword", placeholder: "Confirm Password" }
      ];
      fields.forEach((field) => {
        const input = new InputField(field.id, field.type, field.placeholder);
        this.formElement.appendChild(input.render());
      });
      const submitButton = new Button("Submit", this.handleSubmit.bind(this));
      this.formElement.appendChild(submitButton.render());
    }
    handleSubmit(event) {
      return __async(this, null, function* () {
        event.preventDefault();
        if (Validation.validateForm(this.formElement)) {
          const companyData = yield API.fetchCompanyData();
          console.log("Fetched Company Data:", companyData);
          alert("Registration successful!");
        }
      });
    }
    render() {
      return this.formElement;
    }
  };

  // src/main.ts
  var app = document.getElementById("app");
  if (app) {
    const registrationForm = new Form();
    app.appendChild(registrationForm.render());
  }
})();
//# sourceMappingURL=main.js.map

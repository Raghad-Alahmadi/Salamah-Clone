export class Validation {
    static initializeRealTimeValidation(form: HTMLFormElement): void {
        const inputs = form.querySelectorAll("input, select");

        inputs.forEach(input => {
            // Attach the 'input' event for real-time validation
            input.addEventListener("input", () => this.validateInput(input, form));
        });
    }

    static validateInput(input: HTMLInputElement | HTMLSelectElement, form: HTMLFormElement): void {
        const errorElement = input.nextElementSibling as HTMLElement;

        // Clear previous errors
        input.classList.remove("error");
        errorElement.textContent = "";

        // Validate required fields
        if (!input.value.trim()) {
            input.classList.add("error");
            errorElement.textContent = `${input.getAttribute("placeholder") || "This field"} is required.`;
        }

        // Validate email format
        if (input.type === "email" && input.value.trim() && !Validation.validateEmail(input.value)) {
            input.classList.add("error");
            errorElement.textContent = "Invalid email format.";
        }

        // Validate password strength
        if (input.type === "password" && input.value.trim() && !Validation.validatePassword(input.value)) {
            input.classList.add("error");
            errorElement.textContent = "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.";
        }

        // Validate password confirmation
        if (input.id === "confirmPassword") {
            const passwordInput = form.querySelector("#password") as HTMLInputElement;
            if (passwordInput && passwordInput.value.trim() && input.value.trim() && input.value !== passwordInput.value) {
                input.classList.add("error");
                errorElement.textContent = "Passwords do not match.";
            }
        }

        // Validate business type
        if (input.id === "businessType" && !input.value) {
            input.classList.add("error");
            errorElement.textContent = "Business Type is required.";
        }
    }

    static validateForm(form: HTMLFormElement): boolean {
        const inputs = form.querySelectorAll("input, select");
        let valid = true;

        inputs.forEach(input => {
            this.validateInput(input, form);
            if (input.classList.contains("error")) {
                valid = false;
            }
        });

        return valid;
    }

    static validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static validatePassword(password: string): boolean {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }
}
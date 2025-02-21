export class Validation {
    static validateForm(form) {
        const inputs = form.querySelectorAll("input");
        let valid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                valid = false;
                input.classList.add("error");
            }
            else {
                input.classList.remove("error");
            }
        });
        return valid;
    }
}

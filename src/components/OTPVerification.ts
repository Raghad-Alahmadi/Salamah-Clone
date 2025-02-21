export class OTPVerification {
    static async sendOTP(phoneNumber: string): Promise<string> {
        return "123456"; // Mock OTP for now
    }

    static async verifyOTP(enteredOTP: string): Promise<boolean> {
        return enteredOTP === "123456"; // Mock Verification
    }
}

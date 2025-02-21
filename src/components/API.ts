export class API {
    static async fetchCompanyData(): Promise<any> {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            if (!response.ok) throw new Error("Failed to fetch data");
            return await response.json();
        } catch (error) {
            console.error("Error fetching company data:", error);
            throw error;
        }
    }
}
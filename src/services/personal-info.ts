/**
 * Represents personal information.
 */
export interface PersonalInfo {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    title: string;
    linkedinUrl: string;
    githubUrl: string;
    aboutMe: string;
}

/**
 * Asynchronously retrieves personal information.
 *
 * @returns A promise that resolves to a PersonalInfo object or null if an error occurs.
 */
export async function getPersonalInfo(): Promise<PersonalInfo | null> {
    // Hardcoded API URL and Key
    const apiUrl = 'https://biv4qj1w8b.execute-api.ap-southeast-3.amazonaws.com/dev/api/v1/profile';
    const apiKey = 'wRNbm38KGBO79fj'; // Updated API Key

    if (!apiUrl || !apiKey) {
        console.error("API URL or API Key for personal info is not configured (this should not happen with hardcoded values).");
        return null; // Should not happen with hardcoded values
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'accept': '*/*',
                'content-type': 'application/json',
                'x-api-key': apiKey,
            },
            // Add cache control if needed, e.g., revalidate every hour
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            console.error(`Error fetching personal info: ${response.status} ${response.statusText}`);
            const errorBody = await response.text();
            console.error("Error body:", errorBody);
            return null; // Or handle specific error statuses
        }

        const data: PersonalInfo = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch personal info:", error);
        return null; // Or throw error
    }
}

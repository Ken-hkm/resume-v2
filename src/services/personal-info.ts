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
    const apiUrl = 'https://3f0tv6ipo2.execute-api.ap-southeast-3.amazonaws.com/dev/api/v1/personal-info'; // Updated API URL
    const apiKey = 'wRNbm38KGBO79fj';

    if (!apiUrl || !apiKey) {
        // This check is technically redundant with hardcoded values but kept for safety.
        console.error("API URL or API Key for personal info is not configured (this should not happen with hardcoded values).");
        return null;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': '*/*', // Changed 'accept' to 'Accept' for consistency, though often case-insensitive
                'Content-Type': 'application/json', // Changed 'content-type' to 'Content-Type'
                'X-API-KEY': apiKey, // Changed 'x-api-key' to 'X-API-KEY' as per curl
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

        // The API seems to return the profile data directly, not nested in a 'data' field like experience.
        const rawData = await response.json();

        // Assuming the response directly matches the PersonalInfo interface.
        // If the API wraps the data (e.g., { status: ..., data: {...} }), adjust this part.
        // For now, we assume the raw JSON is the PersonalInfo object.
        // Add Zod validation here if the structure is complex or needs stricter checking.
        const data: PersonalInfo = rawData; // Directly assign if the structure matches
        return data;

    } catch (error) {
        // Log the specific error object for more details
        console.error("Failed to fetch or parse personal info:", error);
        // The 'TypeError: fetch failed' can indicate a network or DNS issue, or CORS problems if run client-side unexpectedly.
        return null;
    }
}

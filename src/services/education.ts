
import { z } from 'zod';

// Define Zod schemas for validation and type inference
const EducationEntrySchema = z.object({
    id: z.string(),
    institution: z.string(),
    degree: z.string(),
    start_date: z.string(),
    end_date: z.string().nullable().optional(), // Can be null or missing
});
export type EducationEntry = z.infer<typeof EducationEntrySchema>;

const EducationApiResponseSchema = z.object({
    status: z.string(),
    status_code: z.number(),
    message: z.string(),
    data: z.array(EducationEntrySchema),
    timestamp: z.string(),
});


/**
 * Asynchronously retrieves education information.
 *
 * @returns A promise that resolves to an array of EducationEntry objects or null if an error occurs.
 */
export async function getEducationData(): Promise<EducationEntry[] | null> {
    // Hardcoded API URL and Key
    const apiUrl = 'https://3f0tv6ipo2.execute-api.ap-southeast-3.amazonaws.com/dev/api/v1/education';
    const apiKey = 'wRNbm38KGBO79fj';

    if (!apiUrl || !apiKey) {
        console.error("API URL or API Key for education is not configured (this should not happen with hardcoded values).");
        return null;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'accept': '*/*',
                'X-API-KEY': apiKey,
            },
            // Add cache control if needed, e.g., revalidate every hour
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            console.error(`Error fetching education data: ${response.status} ${response.statusText}`);
            const errorBody = await response.text();
            console.error("Error body:", errorBody);
            return null;
        }

        const rawData = await response.json();

        // Validate the response data with Zod
        const validationResult = EducationApiResponseSchema.safeParse(rawData);

        if (!validationResult.success) {
             console.error("Failed to validate education API response:", validationResult.error.errors);
             return null;
        }

        // Return the data part which contains the array of education entries
        return validationResult.data.data;

    } catch (error) {
        console.error("Failed to fetch or parse education data:", error);
        return null;
    }
}

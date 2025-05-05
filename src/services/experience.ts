
import { z } from 'zod';

// Define Zod schemas for validation and type inference
const ExperienceDetailSchema = z.object({
    role: z.string(),
    details: z.array(z.string()),
});
export type ExperienceDetail = z.infer<typeof ExperienceDetailSchema>;

const ExperienceEntrySchema = z.object({
    _id: z.string(),
    title: z.string(),
    company: z.string(),
    location: z.string(),
    start_date: z.string(),
    end_date: z.string().nullable().optional(), // Can be null or missing, like for "Present"
    description: z.array(ExperienceDetailSchema),
});
export type ExperienceEntry = z.infer<typeof ExperienceEntrySchema>;

const ExperienceApiResponseSchema = z.object({
    status: z.string(),
    status_code: z.number(),
    message: z.string(),
    data: z.array(ExperienceEntrySchema),
    timestamp: z.string(),
});


/**
 * Asynchronously retrieves experience information.
 *
 * @returns A promise that resolves to an array of ExperienceEntry objects or null if an error occurs.
 */
export async function getExperience(): Promise<ExperienceEntry[] | null> {
    const apiUrl = process.env.EXPERIENCE_API_URL;
    const apiKey = process.env.EXPERIENCE_API_KEY;

    if (!apiUrl || !apiKey) {
        console.error("API URL or API Key for experience is not configured.");
        return null;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'accept': '*/*',
                'X-API-KEY': apiKey, // Correct header name based on curl
            },
            // Add cache control if needed, e.g., revalidate every hour
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            console.error(`Error fetching experience: ${response.status} ${response.statusText}`);
            const errorBody = await response.text();
            console.error("Error body:", errorBody);
            return null;
        }

        const rawData = await response.json();

        // Validate the response data with Zod
        const validationResult = ExperienceApiResponseSchema.safeParse(rawData);

        if (!validationResult.success) {
             console.error("Failed to validate experience API response:", validationResult.error.errors);
             return null;
        }

        // Return the data part which contains the array of experiences
        return validationResult.data.data;

    } catch (error) {
        console.error("Failed to fetch or parse experience data:", error);
        return null;
    }
}

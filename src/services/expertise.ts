
import { z } from 'zod';

// Define Zod schemas for validation and type inference

const TechnicalSkillSchema = z.object({
    skill_name: z.string(),
    items: z.array(z.string()),
});
export type TechnicalSkill = z.infer<typeof TechnicalSkillSchema>;

const ExpertiseDataSchema = z.object({
    id: z.string(),
    skills: z.array(z.string()),
    technical_skills: z.array(TechnicalSkillSchema),
});
export type ExpertiseData = z.infer<typeof ExpertiseDataSchema>;

const ExpertiseApiResponseSchema = z.object({
    status: z.string(),
    status_code: z.number(),
    message: z.string(),
    data: z.array(ExpertiseDataSchema), // Expecting an array containing one object
    timestamp: z.string(),
});


/**
 * Asynchronously retrieves expertise and technical skills information.
 *
 * @returns A promise that resolves to an ExpertiseData object or null if an error occurs or data is missing.
 */
export async function getExpertiseData(): Promise<ExpertiseData | null> {
    // Hardcoded API URL and Key
    const apiUrl = 'https://3f0tv6ipo2.execute-api.ap-southeast-3.amazonaws.com/dev/api/v1/expertise';
    const apiKey = 'wRNbm38KGBO79fj';

    if (!apiUrl || !apiKey) {
        console.error("API URL or API Key for expertise is not configured (this should not happen with hardcoded values).");
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
            console.error(`Error fetching expertise: ${response.status} ${response.statusText}`);
            const errorBody = await response.text();
            console.error("Error body:", errorBody);
            return null;
        }

        const rawData = await response.json();

        // Validate the response data with Zod
        const validationResult = ExpertiseApiResponseSchema.safeParse(rawData);

        if (!validationResult.success) {
             console.error("Failed to validate expertise API response:", validationResult.error.errors);
             return null;
        }

        // The API returns an array, we expect one item in it.
        if (validationResult.data.data.length === 0) {
             console.warn("Expertise API returned an empty data array.");
             return null;
        }

        // Return the first element from the data array
        return validationResult.data.data[0];

    } catch (error) {
        console.error("Failed to fetch or parse expertise data:", error);
        return null;
    }
}

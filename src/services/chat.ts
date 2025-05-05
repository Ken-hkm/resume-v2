/**
 * Represents a chat response.
 */
export interface ChatResponse {
    response: string;
}

/**
 * Asynchronously sends a query to the chat API and retrieves the response.
 * Intended for client-side usage.
 *
 * @param query The user's query.
 * @returns A promise that resolves to a ChatResponse object or null if an error occurs.
 */
export async function sendChatQuery(query: string): Promise<ChatResponse | null> {
     // Hardcoded API URL - Updated based on user request
    const apiUrl = 'https://6aeox7vogl.execute-api.ap-southeast-3.amazonaws.com/v1/chat';


    if (!apiUrl) {
        console.error("Chat API URL is not configured (this should not happen with hardcoded values).");
        // Handle this appropriately in the UI, maybe show a message to the user
        return null;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }), // Sends the query in the expected format
        });

        if (!response.ok) {
            // Log specific HTTP error status and text
            console.error(`Error sending chat query: HTTP ${response.status} ${response.statusText}`);
            try {
                const errorBody = await response.text();
                console.error("Error response body:", errorBody);
            } catch (e) {
                console.error("Could not read error response body.");
            }
             // Handle error in UI
            return null;
        }

        // Assuming the API returns { "response": "..." } directly
        const data: ChatResponse = await response.json();
        return data;
    } catch (error) {
        // Log the specific error object for more details
        console.error("Failed to send chat query:", error);
        // A 'TypeError: Failed to fetch' often indicates a network issue (e.g., DNS, offline) or a CORS problem.
        // Ensure the API endpoint (apiUrl) has correct CORS headers configured if this runs in a browser context.
         // Handle error in UI
        return null;
    }
}

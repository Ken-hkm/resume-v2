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
     // Use NEXT_PUBLIC_ prefix for client-side access
    const apiUrl = process.env.NEXT_PUBLIC_CHAT_API_URL;

    if (!apiUrl) {
        console.error("Chat API URL is not configured.");
        // Handle this appropriately in the UI, maybe show a message to the user
        return null;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            console.error(`Error sending chat query: ${response.status} ${response.statusText}`);
            const errorBody = await response.text();
            console.error("Error body:", errorBody);
             // Handle error in UI
            return null;
        }

        const data: ChatResponse = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to send chat query:", error);
         // Handle error in UI
        return null;
    }
}

import dbConnect from "../../../../config/db"; // Connect to the database
import PostItem from "../../../../models/PostItem"; // Import the PostItem model

// Establish a database connection
dbConnect();

// Handle GET requests
export async function GET() {
    try {
        const postItems = await PostItem.find().select('-__v'); // Fetch all post items, excluding the __v field
        return new Response(JSON.stringify(postItems), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error) {
        console.error('Error fetching post items:', error); // Log error for debugging
        return new Response(JSON.stringify({ message: 'Error fetching post items' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
}

// Handle POST requests
export async function POST(request: Request) {
    try {
        const postItem = await request.json(); // Parse JSON from the request body
        
        // Create a new PostItem instance and save it to the database
        const savedItem = await new PostItem(postItem).save(); 
        
        return new Response(JSON.stringify(savedItem), {
            headers: { 'Content-Type': 'application/json' },
            status: 201,
        });
    } catch (error: unknown) {
        console.error('Error saving post item:', error); // Log the error for debugging
        
        // Check if the error is a validation error
        if (error instanceof Error && error.name === 'ValidationError' && 'errors' in error) {
            return new Response(JSON.stringify({ message: 'Validation error', details: (error as Error & { errors: Record<string, unknown> }).errors }), {
                headers: { 'Content-Type': 'application/json' },
                status: 400, // Bad request
            });
        }

        return new Response(JSON.stringify({ message: 'Server error' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500, // Internal server error
        });
    }
}
import dbConnect from "../../../../../../config/db";   
import PostItem from "../../../../../../models/PostItem";

dbConnect();

// GET function to retrieve a specific PostItem by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const postItem = await PostItem.findById(params.id).select('-__v');
        
        if (!postItem) {
            return new Response(JSON.stringify({ message: 'No item found for this id' }), { status: 404 });
        }

        return new Response(JSON.stringify(postItem), {
            headers: { "Content-Type": "application/json" },
            status: 200,
        });
    } catch  {
        return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
    }
}

// PUT function to update a specific PostItem by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const updatedItem = await request.json();
        const postItem = await PostItem.findByIdAndUpdate(params.id, updatedItem, { new: true }).select('-__v');

        if (!postItem) {
            return new Response(JSON.stringify({ message: "No item found for this ID" }), { status: 404 });
        }

        return new Response(JSON.stringify(postItem), {
            headers: { "Content-Type": "application/json" },
            status: 200,
        });
    } catch  {
        return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
    }
}

// DELETE function to remove a specific PostItem by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const postItem = await PostItem.findByIdAndDelete(params.id);

        if (!postItem) {
            return new Response(JSON.stringify({ message: "No item found for this ID" }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: "Post deleted successfully" }), {
            headers: { "Content-Type": "application/json" },
            status: 200,
        });
    } catch {
        return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
    }
}

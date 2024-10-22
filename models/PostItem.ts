import mongoose from "mongoose";

// Define the PostItem schema
const postItemSchema = new mongoose.Schema(
    {
        img: { type: String, required: true },          // URL or path to the image
        category: { type: String, required: true },     // Category name
        date: { type: Date, default: Date.now },        // Date of creation
        title: { type: String, required: true },        // Article title
        brief: { type: String, default: null },         // Short description or summary
        avatar: { type: String, default: null },        // Author's avatar (optional)
        author: { type: String, default: null },        // Author name
        top: { type: Boolean, default: false },         // Top/featured article flag
        trending: { type: Boolean, default: false },    // Trending article flag
        description: { type: String, required: true },  // Detailed description of the article
        figcaption: { type: String, default: null },    // Image or figure caption (optional)
        paragraphs: { type: [String], required: true }  // Correctly defined as an array of strings
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt timestamps
    }
);

// Ensure the model is only created once
const PostItem = mongoose.models.PostItem || mongoose.model("PostItem", postItemSchema);

// Export the PostItem model
export default PostItem;

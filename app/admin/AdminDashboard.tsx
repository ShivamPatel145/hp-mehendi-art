"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { categories } from "@/lib/data";

export default function AdminDashboard() {
  const [selectedTag, setSelectedTag] = useState(categories[1]); // Default to 'Bridal' (index 1 since 0 is 'All')
  const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

  // Filter out 'All' for uploading
  const uploadCategories = categories.filter(c => c !== "All");

  return (
    <div className="space-y-6">
      <div className="border-b border-accent/20 pb-4">
        <h2 className="text-xl font-semibold text-foreground">Upload Image to Gallery</h2>
        <p className="text-sm text-muted-foreground mt-1">Select a category and upload an image. It will automatically be tagged and appear in the gallery.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Select Mehndi Type (Tag)
          </label>
          <select 
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 bg-background border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
          >
            {uploadCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <CldUploadWidget 
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "hp_mehendi_preset"}
            options={{
              tags: [selectedTag],
              folder: "hp_mehendi_gallery",
              clientAllowedFormats: ["images"]
            }}
            onSuccess={(result) => {
              console.log("Upload Success:", result);
              setUploadStatus({ type: 'success', message: `Image successfully uploaded and tagged as ${selectedTag}!` });
            }}
            onError={(error) => {
              console.error("Upload Error:", error);
              setUploadStatus({ type: 'error', message: 'Failed to upload image. Please try again.' });
            }}
          >
            {({ open }) => {
              return (
                <button 
                  onClick={() => open()}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-2 rounded-md font-medium transition-colors shadow-sm"
                >
                  Upload Image
                </button>
              );
            }}
          </CldUploadWidget>
        </div>

        {uploadStatus.type === 'success' && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-600 rounded-md">
            {uploadStatus.message}
          </div>
        )}
        
        {uploadStatus.type === 'error' && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 rounded-md">
            {uploadStatus.message}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Trash2, Upload, Loader2 } from "lucide-react";

interface GalleryImage {
  id: string;
  image_url: string;
  created_at: string;
}

export default function GalleryAdminPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/gallery/list");
      const data = await res.json();
      if (Array.isArray(data)) {
        setImages(data);
      }
    } catch (error) {
      console.error("Failed to fetch images", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const res = await fetch("/api/gallery/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        fetchImages(); // Refresh list
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error("Upload error", error);
      alert("Upload error");
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const res = await fetch("/api/gallery/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setImages(images.filter((img) => img.id !== id));
      } else {
        alert("Delete failed");
      }
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#3e2b22]">Gallery Management</h1>
        
        <label className="flex items-center gap-2 bg-[#5c4033] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#3e2b22] transition-colors">
          {uploading ? <Loader2 className="animate-spin w-5 h-5" /> : <Upload className="w-5 h-5" />}
          <span>{uploading ? "Uploading..." : "Upload New Image"}</span>
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleUpload} 
            disabled={uploading}
          />
        </label>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin w-10 h-10 text-[#5c4033]" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.length === 0 ? (
            <div className="col-span-full text-center py-10 text-gray-500">
              No images in gallery yet.
            </div>
          ) : (
            images.map((img) => (
              <div key={img.id} className="relative group bg-white p-2 rounded-xl shadow-sm border border-gray-200">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={img.image_url}
                    alt="Gallery"
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  onClick={() => handleDelete(img.id)}
                  className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
                  title="Delete Image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  // 1. Get image URL to find storage path
  const { data: image, error: fetchError } = await supabase
    .from("gallery")
    .select("image_url")
    .eq("id", id)
    .single();

  if (fetchError || !image) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }

  // Extract filename from URL
  // URL format: .../storage/v1/object/public/landing-gallery/filename.jpg
  const fileName = image.image_url.split("/").pop();

  if (fileName) {
    // 2. Delete from Storage
    const { error: storageError } = await supabase.storage
      .from("landing-gallery")
      .remove([fileName]);

    if (storageError) {
      console.error("Storage delete error:", storageError);
      // Continue to delete from DB even if storage fails (to keep DB clean)
    }
  }

  // 3. Delete from Database
  const { error: dbError } = await supabase
    .from("gallery")
    .delete()
    .eq("id", id);

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

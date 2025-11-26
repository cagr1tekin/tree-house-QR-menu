import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  // 1. Upload to Storage
  const { error: uploadError } = await supabase.storage
    .from("landing-gallery")
    .upload(filePath, file);

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  // 2. Get Public URL
  const { data: { publicUrl } } = supabase.storage
    .from("landing-gallery")
    .getPublicUrl(filePath);

  // 3. Save to Database
  const { error: dbError } = await supabase
    .from("gallery")
    .insert([{ image_url: publicUrl }]);

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, url: publicUrl });
}

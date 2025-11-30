"use server";

import { createAdminClient } from "@/lib/supabase/server";

export async function loginUser(username: string, passwordHash: string) {
  const supabase = createAdminClient();
  
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  if (error || !user) {
    return { success: false, message: "Kullanıcı bulunamadı veya hata oluştu." };
  }

  if (user.password === passwordHash) {
    return { success: true };
  } else {
    return { success: false, message: "Hatalı şifre." };
  }
}

export async function changePassword(username: string, oldPasswordHash: string, newPasswordHash: string) {
  const supabase = createAdminClient();

  // Verify old password first
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  if (error || !user) {
    return { success: false, message: "Kullanıcı bulunamadı." };
  }

  if (user.password !== oldPasswordHash) {
    return { success: false, message: "Eski şifre hatalı." };
  }

  // Update password
  const { error: updateError } = await supabase
    .from("users")
    .update({ password: newPasswordHash })
    .eq("id", user.id);

  if (updateError) {
    return { success: false, message: "Şifre güncellenemedi." };
  }

  return { success: true };
}

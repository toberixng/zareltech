'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteService(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('services').delete().eq('id', id)
  if (error) {
    console.error("Error deleting service:", error.message);
    return { error: error.message };
  }
  
  revalidatePath('/admin/services')
  revalidatePath('/services')
  return { success: true };
}

export async function saveService(serviceId: string, formData: FormData) {
  const supabase = await createClient()

  const parseJsonField = (raw: string | null) => {
    if (!raw?.trim()) return null;
    try { return JSON.parse(raw); }
    catch { return null; }
  };

  const { error } = await supabase.from('services').update({
    title: formData.get("title") as string,
    short_description: formData.get("shortDescription") as string,
    hero_headline: formData.get("heroHeadline") as string,
    cta_text: formData.get("ctaText") as string,
    meta_title: formData.get("metaTitle") as string,
    meta_description: formData.get("metaDescription") as string,
    problem: parseJsonField(formData.get("problem") as string),
    solution: parseJsonField(formData.get("solution") as string),
    process: parseJsonField(formData.get("process") as string),
    results: parseJsonField(formData.get("results") as string),
    is_visible: formData.get("isVisible") === "on",
    updated_at: new Date().toISOString(),
  }).eq('id', serviceId);
  
  if (error) return { error: error.message }
  
  revalidatePath('/admin/services')
  revalidatePath('/services')
  return { success: true }
}
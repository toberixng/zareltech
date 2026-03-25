'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deletePost(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('posts').delete().eq('id', id)
  if (error) console.error("Error deleting post:", error.message)

  // Instantly refresh the admin and public blog lists
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
}

export async function createPost(data: any) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('posts').insert([data])
  
  if (error) {
    return { error: error.message }
  }
  
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  return { success: true }
}
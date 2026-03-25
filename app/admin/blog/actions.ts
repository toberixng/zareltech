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

export async function getPost(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('posts').select('*').eq('id', id).single()
  
  if (error) return { error: error.message }
  return { post: data }
}

export async function createPost(formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const category = formData.get('category') as string
  const content = formData.get('content') as string
  const published = formData.get('published') === 'true'
  const imageFile = formData.get('image') as File | null

  let image_url = ''

  // If a file was uploaded, save it to the Supabase 'images' bucket
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, imageFile)
      
    if (uploadError) return { error: `Image upload failed: ${uploadError.message}` }

    const { data } = supabase.storage.from('images').getPublicUrl(fileName)
    image_url = data.publicUrl
  }
  
  const { error } = await supabase.from('posts').insert([{
    title, slug, category, content, published, image_url
  }])
  
  if (error) {
    return { error: error.message }
  }
  
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  return { success: true }
}

export async function updatePost(id: string, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const category = formData.get('category') as string
  const content = formData.get('content') as string
  const published = formData.get('published') === 'true'
  const imageFile = formData.get('image') as File | null

  const updateData: any = { title, slug, category, content, published }

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage.from('images').upload(fileName, imageFile)
    if (uploadError) return { error: `Image upload failed: ${uploadError.message}` }

    const { data } = supabase.storage.from('images').getPublicUrl(fileName)
    updateData.image_url = data.publicUrl
  }

  const { error } = await supabase.from('posts').update(updateData).eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)
  return { success: true }
}

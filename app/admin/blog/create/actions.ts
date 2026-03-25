'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteProject(id: string) {
  const supabase = await createClient()
  await supabase.from('projects').delete().eq('id', id)
  revalidatePath('/admin/portfolio')
  revalidatePath('/portfolio')
}

export async function createProject(formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const client = formData.get('client') as string
  const category = formData.get('category') as string
  const overview = formData.get('overview') as string
  const challenge = formData.get('challenge') as string
  const solution = formData.get('solution') as string
  const published = formData.get('published') === 'true'
  const imageFile = formData.get('image') as File | null
  
  // Convert newline-separated text into a clean JSON array
  const rawResults = formData.get('results') as string
  const results = rawResults.split('\n').map(line => line.trim()).filter(line => line.length > 0)

  let image_url = ''

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage.from('images').upload(fileName, imageFile)
    if (uploadError) return { error: `Image upload failed: ${uploadError.message}` }
    
    const { data } = supabase.storage.from('images').getPublicUrl(fileName)
    image_url = data.publicUrl
  }
  
  const { error } = await supabase.from('projects').insert([{ title, slug, client, category, overview, challenge, solution, results, published, image_url }])
  if (error) return { error: error.message }
  
  revalidatePath('/admin/portfolio')
  revalidatePath('/portfolio')
  return { success: true }
}
"use server";
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signup(formData) {
    const supabase = await createClient()

    // Get current user and log their data
    const { data: userData } = await supabase.auth.getUser()
    if (userData?.user) {
      console.log('User display name:', userData.user.user_metadata.full_name)
    }
    
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
      options: {
        data: {
          full_name: formData.get('full_name')  
        }
      }
    }
    
    // Sign up the user
    const { error: authError } = await supabase.auth.signUp(data)
  
    if (authError) {
      redirect('/error')
    }
    
    revalidatePath('/', 'layout')
    redirect('/register/confirm')
}
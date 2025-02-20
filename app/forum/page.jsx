import React from 'react'
import ForumComp from "@/components/ForumComp"
import { createClient } from '@/utils/supabase/server'

export default async function forumPage(){
    const supabase = await createClient()
    
    const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching posts:', error)
        return <div>Error loading posts</div>
    }

    return (
        <div>
            <ForumComp posts={posts}/>
        </div>
    )
}
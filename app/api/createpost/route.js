import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
            return NextResponse.json(
                { error: 'Please sign in first' },
                { status: 401 }
            );
        }

        // Get user's full_name from profiles table
        const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', user.id)
            .single();

        if (profileError) {
            return NextResponse.json(
                { error: 'Could not fetch user profile' },
                { status: 400 }
            );
        }

        const requestData = await request.json();
        const { topic, title, content } = requestData;

        const { data, error } = await supabase
            .from('posts')
            .insert([{ 
                user_id: user.id, 
                topic,
                author: profileData.full_name || 'Anonymous User',
                title, 
                content, 
                created_at: new Date()
            }]);

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: 'Post created successfully', data },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Server error occurred' },
            { status: 500 }
        );
    }
}

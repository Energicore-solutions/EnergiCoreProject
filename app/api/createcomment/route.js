import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request) {
    const supabase = await createClient();

    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json(
            { error: 'Please sign in to comment' },
            { status: 401 }
        );
    }

    try {
        const { postId, content } = await request.json();

        // Validate required fields
        if (!postId || !content) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from('comments')
            .insert([{
                post_id: postId,
                content,
                author: user.email,  // Use actual user email or name
                author_id: user.id,
                created_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (error) {
            console.error('Error creating comment:', error);
            return NextResponse.json(
                { error: "Failed to create comment" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "Comment created successfully", data },
            { status: 201 }
        );

    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}


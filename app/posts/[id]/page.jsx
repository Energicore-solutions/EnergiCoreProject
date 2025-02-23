import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CommentsComp from '@/components/CommentsComp'
import EditComp from '@/components/EditComp'

export default async function PostPage({ params }) {
    const supabase = await createClient()
    const postid = (await params).id

    let isAuthor = false

    const { data: {user} } = await supabase.auth.getUser()

    // Fetch post and comments
    const [postResult, commentsResult] = await Promise.all([
        supabase
            .from('posts')
            .select('*')
            .eq('id', postid)
            .single(),
        supabase
            .from('comments')
            .select('*')
            .eq('post_id', postid)
            .order('created_at', { ascending: false })
    ])

    const { data: post, error: postError } = postResult
    const { data: comments, error: commentsError } = commentsResult

    if (postError || !post) {
        notFound()
    }

    // Check if the user is the author of the post
    if (user) {
        isAuthor = user.id === post?.user_id;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
            {/* Sticky Header */}
            <header className="sticky z-10">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <Link href="/forum" 
                          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                        </svg>
                        Back to Forum
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                <article className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-300">
                
                    {/* Post Header Section */}
                    <div className="px-8 pt-8 pb-6 border-b border-gray-200">
                        
                        <div className="flex items-center gap-3 mb-6">
                            
                            <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium">
                                {post.topic}
                            </span>
                            
                            <time className="text-gray-500 text-sm">
                                {new Date(post.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                            <EditComp isAuthor={isAuthor}/>
                        </div>
                        
                        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-6">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                <span className="text-emerald-600 font-medium">
                                    {post.author?.[0]?.toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <div className="font-medium text-gray-900">{post.author}</div>
                                <div className="text-sm text-gray-500">Author</div>
                            </div>
                        </div>
                    </div>

                    {/* Post Content Section */}
                    <div className="px-8 py-10">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {post.content}
                            </p>
                        </div>
                    </div>
                </article>
                <CommentsComp 
                    id={postid} 
                    author={post.author} 
                    authorId={post.user_id}
                    initialComments={comments || []}
                />
            </main>
        </div>
    )
}
import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CommentsComp from '@/components/CommentsComp'
import EditComp from '@/components/EditComp'

export default async function PostPage({ params }) {
    const supabase = await createClient()
    const postid = (await params).id

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

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1B2B42] to-[#0F1B2B]">
            {/* Sticky Header */}
            <header className="sticky top-0 bg-[#1B2B42]/80 backdrop-blur-sm border-b border-white/10 z-10">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <Link href="/" 
                          className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                        </svg>
                        Back to Forum
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                <article className="bg-[#2A3B52] rounded-2xl shadow-xl overflow-hidden border border-white/5">
                
                    {/* Post Header Section */}
                    <div className="px-8 pt-8 pb-6 border-b border-white/10">
                        
                        <div className="flex items-center gap-3 mb-6">
                            
                            <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-medium">
                                {post.topic}
                            </span>
                            
                            <time className="text-gray-400 text-sm">
                                {new Date(post.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                            <EditComp/>
                        </div>
                        
                        <h1 className="text-4xl font-bold text-white tracking-tight mb-6">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <span className="text-emerald-400 font-medium">
                                    {post.author?.[0]?.toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <div className="font-medium text-white">{post.author}</div>
                                <div className="text-sm text-gray-400">Author</div>
                            </div>
                        </div>
                    </div>

                    {/* Post Content Section */}
                    <div className="px-8 py-10">
                        <div className="prose prose-lg prose-invert max-w-none">
                            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
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
'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ForumComp({ posts }) {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        topic: '',
        title: '',
        content: ''
    });

    const topics = ['Solar Energy', 'Wind Power', 'Energy Storage', 'Smart Grid', 'Green Buildings', 'EV Technology'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/createpost', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (!response.ok) {
                alert(response.status === 401 ? 'Please sign in first' : data.error);
                return;
            }

            setIsModalOpen(false);
            setFormData({ topic: '', title: '', content: '' });
            alert('Post created successfully!');
            router.refresh(); // This will trigger a page refresh
        } catch (error) {
            alert('Failed to create post');
        }
    };

    const handlePostClick = (postId) => {
        router.push(`/posts/${postId}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 from-[#1B2B42] to-[#0F1B2B] text-white p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">Community Forum</h1>

                {/* Topic Filter */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {topics.map((topic) => (
                        <button
                            key={topic}
                            className="px-4 py-2 rounded-full bg-[#2A3B52] hover:bg-[#3A4B62] text-sm"
                        >
                            {topic}
                        </button>
                    ))}
                </div>

                {/* Posts List */}
                <div className="space-y-6">
                    {posts?.map((post) => (
                        <div 
                            key={post.id} 
                            className="bg-[#2A3B52] rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer"
                            onClick={() => handlePostClick(post.id)}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-emerald-400">{post.title}</h2>
                                    <span className="text-sm text-gray-400">{post.topic}</span>
                                </div>
                                <span className="text-sm text-gray-400">{post.date}</span>
                            </div>
                            <p className="text-gray-300">{post.content}</p>
                            <div className="mt-4 flex items-center gap-4">
                                <span className="text-sm text-gray-400">By {post.author}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Create Post Button */}
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="fixed bottom-8 right-8 bg-emerald-500 hover:bg-emerald-600 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                >
                    <span className="text-2xl">+</span>
                </button>

                {/* Create Post Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
                        <div className="bg-[#2A3B52] rounded-lg p-6 w-full max-w-md">
                            <h2 className="text-2xl font-bold mb-4">Create Post</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <select 
                                    className="w-full p-2 rounded bg-[#1B2B42] border border-gray-600"
                                    value={formData.topic}
                                    onChange={(e) => setFormData({...formData, topic: e.target.value})}
                                    required
                                >
                                    <option value="">Select Topic</option>
                                    {topics.map(topic => (
                                        <option key={topic} value={topic}>{topic}</option>
                                    ))}
                                </select>
                                <input 
                                    type="text"
                                    placeholder="Title"
                                    className="w-full p-2 rounded bg-[#1B2B42] border border-gray-600"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    required
                                />
                                <textarea 
                                    placeholder="Content"
                                    className="w-full p-2 rounded bg-[#1B2B42] border border-gray-600 h-32"
                                    value={formData.content}
                                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                                    required
                                />
                                <div className="flex justify-end gap-2">
                                    <button 
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        className="px-4 py-2 rounded bg-emerald-500 hover:bg-emerald-600"
                                    >
                                        Post
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
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
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-800 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-emerald-700">
                        Energy Community Forum
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto mt-1">
                        Join the conversation about sustainable energy solutions and help shape the future of renewable technologies
                    </p>
                </div>

                

                {/* Posts List */}
                <div className="space-y-6">
                    {posts?.map((post) => (
                        <div 
                            key={post.id} 
                            className="bg-white shadow-sm rounded-xl p-6 hover:shadow-lg 
                            transition-all duration-300 cursor-pointer border border-xl border-emerald-500"
                            onClick={() => handlePostClick(post.id)}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-emerald-700 hover:text-emerald-600">{post.title}</h2>
                                    <span className="text-sm text-emerald-600">{post.topic}</span>
                                </div>
                                <span className="text-sm text-gray-500">{post.date}</span>
                            </div>
                            <p className="text-gray-600 line-clamp-3">{post.content}</p>
                            <div className="mt-4 flex items-center gap-4">
                                <span className="text-sm text-emerald-600">By {post.author}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Create Post Button */}
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="fixed bottom-12 right-10 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 
                    hover:to-emerald-800 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg 
                    transition-all duration-300 hover:scale-105"
                >
                    <span className="text-2xl">+</span>
                </button>

                {/* Create Post Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl p-8 w-full max-w-md 
                        border border-gray-200 shadow-xl">
                            <h2 className="text-2xl font-bold mb-6 text-emerald-700">Create New Post</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <select 
                                    className="w-full p-3 rounded-lg bg-white border border-gray-300 
                                    focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all
                                    text-gray-700"
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
                                    className="w-full p-3 rounded-lg bg-white border border-gray-300 
                                    focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all
                                    text-gray-700"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    required
                                />
                                <textarea 
                                    placeholder="Share your thoughts..."
                                    className="w-full p-3 rounded-lg bg-white border border-gray-300 
                                    focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all
                                    text-gray-700 h-32"
                                    value={formData.content}
                                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                                    required
                                />
                                <div className="flex justify-end gap-3 pt-4">
                                    <button 
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-300
                                        text-gray-700"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-700 
                                        hover:from-green-700 hover:to-emerald-800 transition-all duration-300 text-white"
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
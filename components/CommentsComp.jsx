'use client';
import React, { useState } from 'react';

export default function CommentsComp({ id, author, authorId, initialComments }) {
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const response = await fetch('/api/createcomment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    postId: id,
                    content: newComment,
                    author: author,
                    author_id: authorId
                }),
            });

            if (response.status === 401) {
                alert('Please sign in first to comment');
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to create comment');
            }

            const result = await response.json();
            // Add the new comment at the beginning of the array
            setComments([result.data, ...comments]);
            setNewComment('');

        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex flex-col space-y-3">
                    <div className=" bg-gray-300 rounded-lg p-4 border">
                        <h3 className="text-lg font-semibold mb-2 text-gray-700">Leave a Comment</h3>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Share your thoughts..."
                            className="w-full p-3 bg-emerald-50/70 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                            rows="3"
                        />
                        <button
                            type="submit"
                            className="mt-3 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Post Comment
                        </button>
                    </div>
                </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="p-4 bg-emerald-100/70 rounded-lg shadow-sm border border-emerald-200"
                    >
                        <div className="flex items-center mb-2">
                            <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
                                {comment.author?.[0]}
                            </div>
                            <div className="ml-3">
                                <h4 className="font-semibold text-gray-800">{comment.author}</h4>
                                <p className="text-sm text-gray-600">
                                    {new Date(comment.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-700 pl-11">{comment.content}</p>
                    </div>
                ))}
                {comments.length === 0 && (
                    <p className="text-center text-gray-500">No comments yet.</p>
                )}
            </div>
        </div>
    );
}
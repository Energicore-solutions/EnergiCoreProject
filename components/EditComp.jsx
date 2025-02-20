'use client';
import React, { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

export default function EditComp({ onClick }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onClick?.(formData);
        setIsModalOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 
                         bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200 
                         hover:shadow-md active:scale-95"
            >
                <FiEdit2 className="w-4 h-4" />
                <span>Edit</span>
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <IoClose size={24} />
                        </button>
                        
                        <h2 className="text-xl font-semibold mb-6">Edit Details</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Content
                                </label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                                    rows={5}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
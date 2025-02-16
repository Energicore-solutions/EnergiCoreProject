'use client'
import React from 'react'
import { FiMail } from 'react-icons/fi'

function confirmPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 -mt-24">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100">
            <FiMail className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Check your email
          </h2>
          <p className="mt-4 text-gray-600">
            We've sent you a confirmation email. Please check your inbox and follow
            the instructions to complete your registration.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Didn't receive the email? Check your spam folder
            
          </p>
        </div>
      </div>
    </div>
  )
}

export default confirmPage
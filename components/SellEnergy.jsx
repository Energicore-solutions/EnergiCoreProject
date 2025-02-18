'use client'
import React, { useState } from 'react'
import { FaSolarPanel, FaLeaf, FaChartLine } from 'react-icons/fa'

export default function SellEnergyComponent() {
    const [energyAmount, setEnergyAmount] = useState('')
    const [loading, setLoading] = useState(false)
    const FIXED_PRICE = 0.12

    const handleSell = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch('/api/listenergy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'sell',
                    amount: Number(energyAmount)
                })
            })

            const data = await response.json()
            
            if (!response.ok) throw new Error(data.error)
            
            alert(data.message)
            setEnergyAmount('')
        } catch (error) {
            alert('Failed to list energy for sale: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const totalEarnings = (energyAmount * FIXED_PRICE).toFixed(2)

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-center mb-8">
                <FaSolarPanel className="text-4xl text-yellow-500 mr-4" />
                <h1 className="text-3xl font-bold text-gray-800">List Energy for Sale</h1>
                <FaLeaf className="text-4xl text-green-500 ml-4" />
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-8">
                <p className="text-sm text-gray-600">
                Sell your excess renewable energy to support the community and earn rewards. 
                Your contribution helps create a more sustainable energy marketplace.
                </p>
            </div>

            <form onSubmit={handleSell} className="space-y-6">
                <div>
                <label htmlFor="energy" className="block text-sm font-medium text-gray-700 mb-2">
                    Amount of Energy to Sell (kWh)
                </label>
                <input
                    type="number"
                    id="energy"
                    value={energyAmount}
                    onChange={(e) => setEnergyAmount(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter amount in kWh"
                    required
                    min="1"
                />
                </div>

                <div className="bg-green-50 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">Potential Earnings:</p>
                    <p className="text-lg font-bold text-green-600">${totalEarnings}</p>
                </div>
                <div className="mt-2 flex items-center text-xs text-gray-500">
                    <FaChartLine className="mr-1" />
                    <span>Fixed price: ${FIXED_PRICE}/kWh</span>
                </div>
                </div>

                <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-6 rounded-lg text-white font-medium 
                    ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} 
                    transition-colors duration-200 flex items-center justify-center`}
                >
                {loading ? (
                    <span className="animate-pulse">Processing...</span>
                ) : (
                    'List Energy for Sale'
                )}
                </button>
            </form>

            <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm text-gray-600">
                <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-semibold">Instant Listing</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-semibold">Secure Payment</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-semibold">Market Insights</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}
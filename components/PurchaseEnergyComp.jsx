'use client';
import { FaSolarPanel, FaLeaf, FaBatteryThreeQuarters } from 'react-icons/fa'
import { useState } from 'react'

function PurchaseEnergyComponent({ avalEnergy }) {
    const [energyAmount, setEnergyAmount] = useState('')
    const [loading, setLoading] = useState(false)

    const handlePurchase = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        try {
            const response = await fetch('/api/createtransaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: Number(energyAmount)
                })
            })

            const data = await response.json()
            
            if (!response.ok) {
                throw new Error(data.error)
            }
            
            alert(data.message)
            setEnergyAmount('')
            
            // Optionally refresh the page to update available energy
            window.location.reload()
            
        } catch (error) {
            alert('Failed to purchase energy: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-center mb-8">
              <FaSolarPanel className="text-4xl text-yellow-500 mr-4" />
              <h1 className="text-3xl font-bold text-gray-800">Purchase Eco-friendly Energy</h1>
              <FaLeaf className="text-4xl text-green-500 ml-4" />
            </div>
  
            <div className="bg-yellow-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaBatteryThreeQuarters className="text-2xl text-yellow-500 mr-2" />
                  <span className="text-sm font-medium text-gray-600">Available Energy:</span>
                </div>
                <span className="text-lg font-bold text-yellow-600">{avalEnergy} kWh</span>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 mb-8">
              <p className="text-sm text-gray-600">
                By purchasing renewable energy, you're contributing to a sustainable future. 
                Each kWh of clean energy helps reduce carbon emissions and supports renewable energy projects.
              </p>
            </div>
  
            <form onSubmit={handlePurchase} className="space-y-6">
              <div>
                <label htmlFor="energy" className="block text-sm font-medium text-gray-700 mb-2">
                  Amount of Energy (kWh)
                </label>
                <input
                  type="number"
                  id="energy"
                  value={energyAmount}
                  onChange={(e) => setEnergyAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter amount in kWh"
                  required
                  min="1"
                />
              </div>
  
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600">
                  Estimated Cost: ${(energyAmount * 0.12).toFixed(2)}
                  <span className="block mt-1 text-xs text-gray-500">
                    (Based on $0.12 per kWh)
                  </span>
                </p>
              </div>
  
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-6 rounded-lg text-white font-medium 
                  ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} 
                  transition-colors duration-200 flex items-center justify-center`}
              >
                {loading ? (
                  <span className="animate-pulse">Processing...</span>
                ) : (
                  'Purchase Energy'
                )}
              </button>
            </form>
  
            <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm text-gray-600">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-semibold">100% Renewable</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-semibold">Carbon Neutral</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-semibold">24/7 Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default PurchaseEnergyComponent
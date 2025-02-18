import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { FaSolarPanel, FaLeaf, FaHistory, FaArrowUp, FaArrowDown, FaBolt } from 'react-icons/fa'

async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/register')
    }

    // Fetch current listings for this user
    const { data: activeListings } = await supabase
        .from('energy_listings')
        .select('amount_kwh')
        .eq('seller_id', user.id)
        .eq('status', 'Available')

    // Calculate currently listed energy
    const currentlyListed = activeListings?.reduce((total, listing) => 
        total + (listing.amount_kwh || 0), 0) || 0

    // Fetch all transactions for this user (both as buyer and seller)
    const { data: transactions } = await supabase
        .from('energy_transactions')
        .select('*')
        .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
        .order('created_at', { ascending: false })

    // Calculate totals from real transactions
    const totalPurchased = transactions
        ?.filter(t => t.buyer_id === user.id)
        .reduce((acc, t) => acc + t.amount_kwh, 0) || 0;
    
    // Calculate total sold (only completed sales)
    const totalSold = transactions
        ?.filter(t => t.seller_id === user.id)
        .reduce((acc, t) => acc + t.amount_kwh, 0) || 0;

    const username = user.user_metadata.full_name || user.email;

    // Separate transactions into purchases and sales
    const myPurchases = transactions?.filter(t => t.buyer_id === user.id) || [];
    const mySales = transactions?.filter(t => t.seller_id === user.id) || [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="flex items-center justify-center mb-8">
                        <FaSolarPanel className="text-4xl text-yellow-500 mr-4" />
                        <h1 className="text-3xl font-bold text-gray-800">Energy Dashboard</h1>
                        <FaLeaf className="text-4xl text-green-500 ml-4" />
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 mb-8">
                        <p className="text-sm text-gray-600 text-center">
                            Welcome back, <span className="font-semibold">{username}</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-green-50 rounded-lg p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Purchased</p>
                                    <p className="text-2xl font-bold text-green-600">{totalPurchased} kWh</p>
                                </div>
                                <FaArrowDown className="text-2xl text-green-500" />
                            </div>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Sold</p>
                                    <p className="text-2xl font-bold text-blue-600">{totalSold} kWh</p>
                                </div>
                                <FaArrowUp className="text-2xl text-blue-500" />
                            </div>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Currently Listed</p>
                                    <p className="text-2xl font-bold text-yellow-600">{currentlyListed} kWh</p>
                                </div>
                                <FaBolt className="text-2xl text-yellow-500" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Purchases Section */}
                        <div>
                            <div className="mb-6 flex items-center">
                                <FaArrowDown className="text-xl text-green-500 mr-2" />
                                <h2 className="text-xl font-semibold text-gray-800">My Purchases</h2>
                            </div>
                            <div className="space-y-4">
                                {myPurchases.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">No purchases yet</p>
                                ) : (
                                    myPurchases.map(transaction => (
                                        <div key={transaction.id} className="p-4 rounded-lg border border-green-200 bg-green-50">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="font-semibold text-gray-800">
                                                        Purchased {transaction.amount_kwh} kWh
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        ${(transaction.amount_kwh * transaction.price_per_kwh).toFixed(2)} at ${transaction.price_per_kwh}/kWh
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-600">
                                                        {new Date(transaction.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Sales Section */}
                        <div>
                            <div className="mb-6 flex items-center">
                                <FaArrowUp className="text-xl text-blue-500 mr-2" />
                                <h2 className="text-xl font-semibold text-gray-800">My Sales</h2>
                            </div>
                            <div className="space-y-4">
                                {mySales.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">No sales yet</p>
                                ) : (
                                    mySales.map(transaction => (
                                        <div key={transaction.id} className="p-4 rounded-lg border border-blue-200 bg-blue-50">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="font-semibold text-gray-800">
                                                        Sold {transaction.amount_kwh} kWh
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        ${(transaction.amount_kwh * transaction.price_per_kwh).toFixed(2)} at ${transaction.price_per_kwh}/kWh
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-600">
                                                        {new Date(transaction.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
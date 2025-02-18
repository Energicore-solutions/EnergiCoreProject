import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { amount } = await req.json()
    const supabase = await createClient()

    // Get user session
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Please sign in first' }, 
        { status: 401 }
      )
    }

    // Find available listings
    const { data: listings, error: listingError } = await supabase
      .from('energy_listings')
      .select('*')
      .eq('status', 'Available')
      .order('listed_at', { ascending: true })

    if (listingError) {
      console.error('Listing error:', listingError)
      throw new Error('Failed to fetch listings')
    }

    // Check if enough energy is available
    const totalAvailable = listings?.reduce((sum, listing) => sum + listing.amount_kwh, 0) || 0
    if (totalAvailable < amount) {
      return NextResponse.json(
        { error: `Not enough energy available. Only ${totalAvailable} kWh listed.` },
        { status: 400 }
      )
    }

    // Find a suitable listing
    const listing = listings.find(l => l.amount_kwh >= amount)
    if (!listing) {
      return NextResponse.json(
        { error: 'No single listing with enough energy found' },
        { status: 400 }
      )
    }

    // Create transaction record
    const { data: transaction, error: transactionError } = await supabase
      .from('energy_transactions')
      .insert([
        {
          buyer_id: user.id,
          seller_id: listing.seller_id,
          amount_kwh: amount,
          price_per_kwh: 0.12,
          type: 'buy'
        }
      ])
      .select()

    if (transactionError) {
      console.error('Transaction error:', transactionError)
      throw new Error('Failed to create transaction')
    }

    // Update listing
    const remainingAmount = listing.amount_kwh - amount
    const { error: updateError } = await supabase
      .from('energy_listings')
      .update({ 
        amount_kwh: remainingAmount,
        status: remainingAmount > 0 ? 'Available' : 'Sold'
      })
      .eq('id', listing.id)

    if (updateError) {
      console.error('Update error:', updateError)
      throw new Error('Failed to update listing')
    }

    return NextResponse.json({
      message: `Successfully purchased ${amount} kWh of energy`,
      transaction: transaction[0]
    })

  } catch (error) {
    console.error('Transaction error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process purchase' }, 
      { status: 500 }
    )
  }
}

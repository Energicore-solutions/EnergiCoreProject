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
        { error: 'Unauthorized: Please sign in first' }, 
        { status: 401 }
      )
    }

    // Insert energy listing
    const { data, error } = await supabase
      .from('energy_listings')
      .insert([
        {
          seller_id: user.id,
          amount_kwh: amount,
          price_per_kwh: 0.12,
          status: 'Available',
          listed_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) throw error

    return NextResponse.json({
      message: `Successfully listed ${amount} kWh of energy for sale`,
      listing: data[0]
    })

  } catch (error) {
    console.error('Energy listing error:', error)
    return NextResponse.json(
      { error: 'Failed to create energy listing' }, 
      { status: 500 }
    )
  }
}


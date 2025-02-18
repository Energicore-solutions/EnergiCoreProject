import PurchaseEnergyComponent from '@/components/PurchaseEnergyComp'
import React from 'react'
import { createClient } from '@/utils/supabase/server'

async function purchasePage() {
  const supabase = await createClient()

  // Fetch available energy listings
  const { data: listings, error } = await supabase
    .from('energy_listings')
    .select('amount_kwh')
    .eq('status', 'Available')

  if (error) {
    console.error('Error fetching energy listings:', error)
  }

  // Calculate total available energy
  const avalEnergy = listings?.reduce((total, listing) => {
    return total + (listing.amount_kwh || 0)
  }, 0) || 0

  return (
    <div>
      <PurchaseEnergyComponent avalEnergy={avalEnergy}/>
    </div>
  )
}

export default purchasePage
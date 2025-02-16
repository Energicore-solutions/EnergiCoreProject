import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation';


async function dashboardPage() {

    const supabase = await createClient();
    const { data : {user} } = await supabase.auth.getUser();

    let username = 'None';

    if (user){
        username = user.user_metadata.full_name || user.email;
    }else{
        redirect('/register')
    }
    


    return (
        <div>dashboardPage {username}</div>
    )
}

export default dashboardPage
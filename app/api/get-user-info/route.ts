import {type NextRequest, NextResponse} from 'next/server';
import {supabaseClient} from '../auth/SupabaseCode';

const supabase = supabaseClient;



export async function POST(req:NextRequest){
    const {user} = await req.json();
    if (!user) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    console.log('Fetching user info for:', user);
    const {data, error} = await supabase.from('users').select('*').eq('clerk_id',user).single();
    if (error){
        console.error('failed to get user info', error);
        return error;
    }
    return NextResponse.json({ data }, { status: 200 });
}

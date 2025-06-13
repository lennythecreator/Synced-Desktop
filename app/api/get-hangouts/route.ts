import { NextRequest, NextResponse } from "next/server";
import { supabaseClient } from "../auth/SupabaseCode";

const supabase = supabaseClient;

export async function POST(req: NextRequest){
    const user = await req.json();
    if (!user || !user.id) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const {data, error} = await supabase.from('hangouts').select('*').eq('user_id', user.id)
    
    if (error){
        console.error('Failed to get hangouts', error);
        return NextResponse.json({ error: 'Failed to fetch hangouts' }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
}


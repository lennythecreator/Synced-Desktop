import { NextRequest, NextResponse } from "next/server";
import { supabaseClient } from "../auth/SupabaseCode";

export async function POST(req: NextRequest){
    const supabase = supabaseClient;
    const user = await req.json();
    if (!user || !user.id) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    const {data, error} = await supabase.from('hangouts').insert({user, attendees, startTime, endTime, date, details, title})
    return NextResponse.json({status: 'successs'})
}
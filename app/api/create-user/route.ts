import { supabaseClient } from "../auth/SupabaseCode";
import { type NextRequest, NextResponse } from "next/server";

const supabase = supabaseClient;
export async function POST(req: NextRequest){
    const {userId, email, username, activeness, schedule, hobbies} = await req.json();
    const {data,error} = await supabase
        .from("users")
        .insert({
            clerk_id: userId,
            email: email,
            username: username,
            activeness: activeness,
            schedule: schedule,
            hobbies: hobbies

        }).select();
    if (error){
        console.error("Failed to create user:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "User created successfully", data }, { status: 201 });
}
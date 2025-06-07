import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_SUPABASE_URL
const supabaseKey = process.env.NEXT_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { id, email_addresses, username} = body;

  const email = email_addresses?.[0]?.email_address;

  const { error } = await supabase.from("users").insert({
    clerk_id: id,
    email,
    username,
  });

  if (error) {
    console.error("Failed to sync user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "User synced to Supabase" });
}
import { NextRequest, NextResponse } from "next/server";
import { supabaseClient } from "../auth/SupabaseCode";

export async function POST(req: NextRequest) {
  const supabase = supabaseClient;
  const body = await req.json();
  const { user_id, friend_code } = body;

  try {
    console.log("📥 Received request:", body);

    // Step 1: Find receiver by friend_code (get their clerk_id)
    const { data: receiver, error: receiverError } = await supabase
      .from("users")
      .select("clerk_id")
      .eq("friend_code", friend_code)
      .single();

    if (receiverError || !receiver) {
      return NextResponse.json({ error: "Receiver not found" }, { status: 404 });
    }

    // Step 2: Insert into friend_requests using clerk_ids
    const { error: insertError } = await supabase.from("friend_requests").insert({
      sender_id: user_id,          // user_id is already the sender's clerk_id
      receiver_id: receiver.clerk_id,
      status: "pending",
    });

    if (insertError) {
      console.error("❌ Insert error:", JSON.stringify(insertError, null, 2));
      return NextResponse.json({ error: "Failed to send request" }, { status: 500 });
    }

    return NextResponse.json({
      message: `✅ Friend request sent to ${receiver.clerk_id}`,
    }, { status: 200 });

  } catch (err: any) {
    console.error("❗ Unexpected error:", err);
    return NextResponse.json({ error: "Server error", detail: err.message }, { status: 500 });
  }
}

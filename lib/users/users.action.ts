"use server"
import { supabaseClient } from ""
import { auth, clerkClient } from "@clerk/nextjs/server"
export const createUser = async() => {
    try{
        const {userId:author} = await auth();
        if (!author){
            console.error("No user ID found in auth context");
            throw new Error("User not authenticated");
        }
        //get user information from clerk
        const user = await clerkClient.users.getUser(author);
        if (!user) {
            console.error("User not found in Clerk");
            throw new Error("User not found");
        }

        // initialize supabase client
        const supabase = supabaseClient;

        // Check if user already exists
        const { data: existingUser } = await supabase.from("users").select("id").eq("clerk_id", user).single()

        if (existingUser) {
        return existingUser
        }
        const {data, error} = await supabase
            .from("users")
            .insert({author})

        if (error|| !data) {
            console.error("Error creating user:", error);
            throw new Error("Failed to create user");
        }
        return data[0];
    } catch (error) {
        console.error("Error in createUser:", error);
        throw new Error("Failed to create user");
    }
   
    
}
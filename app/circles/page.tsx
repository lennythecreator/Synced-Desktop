"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { Dialog } from "@radix-ui/react-dialog";
import { useState } from "react";

export default function Circles(){
    const { isLoaded, user } = useUser();
    const userId = user?.id;
    const [friendCode, setFriendCode] = useState("");
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFriendCode(event.target.value);
    }
    const handleSendRequest = async (friendCode: string) => {
        const response = await fetch('/api/connect-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user_id:userId, friend_code: friendCode }),
        });
        console.log('userId:', userId);
        console.log('friendCode:', friendCode);
        const data = await response.json();
        if (!response.ok) {
            console.error("Failed to send request:", data.error);
            return;
        }
        console.log(data.message);
        // You can handle the response here if needed
    }

    const circles = ["The Boys","Book Club", "Gym Bros"]
    return (
        <main>
            <div className="flex flex-col gap-3">
                <h1 className="font-medium text-xl">Your Circels</h1>
                <div className="flex gap-2">
                    <Input placeholder="Search circles" />
                    <Button className="ml-2">Search</Button>
                </div>
                <div className="flex gap-2">
                    {
                        circles.map((circle,index)=>(
                            <Card key={index} className="border-2 rounded-full px-4 py-2 cursor-pointer text-sm hover:bg-primary text-indigo-800">
                                {circle}
                            </Card>
                        ))
                    }
                </div>
                <Input placeholder="Enter friendcode" value={friendCode} onChange={handleInputChange}/>
                <Button onClick={() => handleSendRequest(friendCode)}>Send Request</Button>
                <div>
                    {}
                </div>
            </div>
        </main>
    )
}                
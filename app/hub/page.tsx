"use client";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { Home } from "lucide-react";
import { useEffect, useState } from "react";

type UserSchedule = { [key: string]: string };
type UserDataResponse = {
    data?: {
        username?: string;
        schedule?: UserSchedule;
    }
};

export default function Hub() {
    const { isLoaded, user } = useUser();
    const [userData, setUserData] = useState<UserDataResponse>({});
    const userId = user?.id;

    const weekOrder = [
        "mondays",
        "tuesdays",
        "wednesdays",
        "thursdays",
        "fridays",
        "saturdays",
        "sundays"
    ];

    useEffect(() => {
        if (!isLoaded || !userId) return;
        const fetchData = async () => {
            try {
                console.log('fetching', userId);
                const response = await fetch('/api/get-user-info', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        user: userId
                    })
                });

                const data = await response.json();
                setUserData(data);
                console.log('User data fetched:', data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [isLoaded, userId]);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 mx-auto">
            <h1 className=" flex text-primary text-6xl font-bold py-5"><Home className="-rotate-6" size={60}/>Hub</h1>
            <p>This is where you can get the ball rolling</p>
            <div>
                <h1 className="text-lg py-4">Your schedule looks like...</h1>
                <div className="grid grid-cols-3 gap-2 mt-auto">
                    
                    {userData?.data?.schedule &&
                        Object.entries(userData.data.schedule)
                            .sort(([dayA], [dayB]) => weekOrder.indexOf(dayA) - weekOrder.indexOf(dayB))
                            .map(([day, status]) => (
                                <Card className="p-4" key={day}>
                                    <CardTitle className="text-sm text-primary">
                                        {day.charAt(0).toUpperCase() + day.slice(1)}
                                    </CardTitle>
                                    <CardDescription className="text-lg font-medium text-black">
                                        {status}
                                    </CardDescription>
                                </Card>
                            ))
                    }
                </div>
                
            </div>
        </div>
    )
}
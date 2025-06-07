"use client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form";
import { onboardingAnswers, scheduleAnswers, formHobbies } from "../constants";
import { ArrowRightCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-select";
import { use, useEffect, useState } from "react";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from "@clerk/nextjs";

export default function Page(){
    const [userInfo, setUserInfo] = useState({})
    const {user} = useUser();
    
    useEffect(() => {
    if (user?.id) {
        setUserInfo((prev) => ({ ...prev, userId: user.id , clerk_id: user.id , username: user.username, email: user.emailAddresses[0]?.emailAddress }));
    }
    }, [user?.id]);

    console.log("User:", user?.id);
    
    const router = useRouter();
    const formSchema = z.object({
        activeness : z.string(),
        hobbies: z.array(z.string()).min(1, "Please select at least one hobby"),
        schedule: z.object({
            mondays: z.string(),
            tuesdays: z.string(),
            wednesdays: z.string(),
            thursdays: z.string(),
            fridays: z.string(),
            saturdays: z.string(),
            sundays: z.string(),
        })
    })

    const form = useForm<z.infer<typeof formSchema>>(
        {resolver: zodResolver(formSchema)}
    );

    const  formSteps = [1, 2, 3,]
    const [formStep, setFormStep] = useState(1);
    const nextStep = async(data: z.infer<typeof formSchema>) => {
        console.log(data)
        let fieldsToValidate: (keyof z.infer<typeof formSchema>)[] = [];

        switch(formStep){
            case 1: fieldsToValidate = ["activeness"]
            break;
            case 2: fieldsToValidate = ["hobbies"] 
            break;
            case 3: fieldsToValidate = ["schedule"] 
            break;
        }

        const isVaild = await (form.trigger(fieldsToValidate));

        if (isVaild){
            if (formStep < formSteps.length){
                setUserInfo(prev => ({ ...prev, ...data }));
                setFormStep(formStep + 1)
                
            }else{
                form.handleSubmit(onSubmit)();
            }
        }
    }
    
    const availabilties = ["Free", "A little busy","Busy"]
    const onSubmit = (data: z.infer<typeof formSchema>) => {
        const payload = {
        ...data,
        ...userInfo, // ✅ include user id, email, username, etc.
        };

        fetch("/api/create-user", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }).then((res) => {
            if (res.ok) {
            console.log("User created successfully");
            router.push("/hub");
            }
        });
        
    }
    const scheduleDays = [
        "mondays",
        "tuesdays",
        "wednesdays",
        "thursdays",
        "fridays",
        "saturdays",
        "sundays",
    ] as const;

    useEffect(()=>{
        console.log("User Info Updated:", userInfo);
    },[userInfo])
    const renderStep = () =>{
        switch(formStep){
            case 1:
                return(
                    <>
                    <FormField 
                    control={form.control}
                    name ="activeness"
                    render={({ field }) => (
                            <FormItem className="py-3">
                            <FormLabel>How often do you go out with friends?</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {onboardingAnswers.map((answer,index)=>(
                                            <SelectItem key={index} value={answer}>{answer}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="hobbies"
                    render={({field})=>(
                        <FormItem>
                         <FormLabel>What are your hobbies?</FormLabel>
                         <FormDescription>Select a hobby</FormDescription>
                         {formHobbies.map((hobby, index)=> (
                            <div key={index}>
                                <Checkbox
                                id={`hobby-${index}`}
                                checked={field.value?.includes(hobby)}
                                onCheckedChange={(checked) => {
                                const newValue = checked
                                    ? [...(field.value || []), hobby]
                                    : (field.value || []).filter((val) => val !== hobby);
                                field.onChange(newValue);
                                }}/>
                                <FormLabel className="inline-block ml-2">{hobby}</FormLabel>
                            </div>
                         ))}
                         <FormMessage/>
                        </FormItem>
                    )}/>
                    </>
                    
                )
            case 2:
                return(
                    scheduleDays.map((day) => (
                    <FormField
                        key={day}
                        control={form.control}
                        name={`schedule.${day}` as `schedule.${typeof scheduleDays[number]}`}
                        render={({ field }) => (
                        <FormItem className="mb-4">
                            <FormLabel>{`What are your ${day} like?`}</FormLabel>
                            <FormControl>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent>
                                {scheduleAnswers.map((answer, i) => (
                                    <SelectItem key={i} value={answer}>
                                    {answer}
                                    </SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                            </FormControl>
                        </FormItem>
                        )}
                    />
                    ))

                     )
            case 3:
                return(
                <div className="flex flex-col space-y-4">
                    
                </div>
                )

        }
    }
    
    useEffect(() => {
    console.log("Updated userInfo:", userInfo);
    }, [userInfo]);

    
    return (
        <div className="flex flex-col justify-center min-h-screen p-4 max-w-lg mx-auto">
            <Form {...form} onChange={(values) => {
                setUserInfo((prev) => ({ ...prev, ...values }))}
            }>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <h1 className="font-medium text-2xl">Lets get to know you</h1>
                <p className="text-sm text-muted-foreground py-5">Please fill out the form below to get started</p>
                <span className="flex justify-between items-center space-x-4 py-3">
                    {formSteps.map((step, index) => (
                        <div key={step} className="flex items-center flex-1">
                            <div
                            className={`p-7 text-2xl flex items-center justify-center rounded-full w-10 h-10 ${
                                step <= formStep ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                            } transition delay-100 duration-300 ease-in-out`}
                            >
                            {step}
                            </div>
                            {index < formSteps.length - 1 && (
                            <Separator className={`flex-1 h-1 mx-2 ${step < formStep ? "bg-primary" : "bg-muted"} transition delay-100 duration-300 ease-in-out `} />
                            )}
                        </div>
                    ))}
                </span>

                <div>
                    {renderStep()}
                </div>
                {formStep < formSteps.length ? (
                    <Button className="rounded-full bg-indigo-700 w-fit text-white ml-auto my-2" size={'lg'}
                    onClick={() => {
                        const formData = form.getValues();
                        console.log(formData);
                        nextStep(formData);
                    }}>Next <ArrowRightCircleIcon className="ml-auto"/></Button>
                ): (
                    <Button className="rounded-full bg-indigo-700 w-fit text-white ml-auto my-2" size={'lg'}
                    onClick={() => {
                        const handleSubmit = form.handleSubmit(onSubmit);
                        handleSubmit();
                    }}>Submit</Button>
                )}
                
                
                </form>
            </Form>
            
        </div>
    )
}
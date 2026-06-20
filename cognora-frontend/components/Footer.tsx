"use client";
import { toast } from "sonner";
import { Button } from "./ui/button";

export default function Footer() { 
    return (
        <footer className="bg-gray-800 text-gray-300 py-4 mt-8">
            <div className="container mx-auto text-center">
                 <Button onClick={() => toast.success("Hey", {
                              position:"top-right"
                            })}>Hey</Button>
                <p>&copy; {new Date().getFullYear()} Cognora. All rights reserved.</p>
            </div>
        </footer>   
    )
}
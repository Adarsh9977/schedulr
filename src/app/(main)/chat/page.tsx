"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIChat } from "@/components/ai-chat";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff } from "lucide-react";

export default function ChatPage() {
    const [isRecording, setIsRecording] = useState(false);

    const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, this would handle voice recording
    };

    return (
    <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
        </div>

        <Tabs defaultValue="chat" className="flex-1 overflow-hidden">
            <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="voice">Voice</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="flex h-full flex-col">
            <AIChat />
            </TabsContent>
            <TabsContent value="voice" className="h-full">
            <Card className="flex h-full flex-col">
                <CardContent className="flex flex-1 flex-col items-center justify-center p-6 h-full">
                <div className="mb-8 text-center h-full">
                    <h2 className="mb-2 text-2xl font-bold">Voice Assistant</h2>
                    <p className="text-gray-500">
                    Speak to your AI assistant to manage your schedule hands-free
                    </p>
                </div>
                <Button
                    size="lg"
                    className={`h-24 w-24 rounded-full ${
                    isRecording ? "bg-red-500 hover:bg-red-600" : ""
                    }`}
                    onClick={toggleRecording}
                >
                    {isRecording ? (
                    <MicOff className="h-12 w-12" />
                    ) : (
                    <Mic className="h-12 w-12" />
                    )}
                </Button>
                <p className="mt-4 text-sm text-gray-500">
                    {isRecording ? "Listening..." : "Press to speak"}
                </p>
                <div className="mt-8 space-y-2 text-center">
                    <p className="font-medium">Try saying:</p>
                    <p className="text-sm text-gray-500">
                    "Schedule a meeting tomorrow at 2 PM"
                    </p>
                    <p className="text-sm text-gray-500">
                    "What tasks do I have today?"
                    </p>
                    <p className="text-sm text-gray-500">
                    "Optimize my morning routine"
                    </p>
                </div>
                </CardContent>
            </Card>
            </TabsContent>
        </Tabs>
    </div>
    );
}

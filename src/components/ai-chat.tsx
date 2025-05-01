"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Mic, MicOff } from "lucide-react"

type Message = {
role: "user" | "assistant"
content: string
}

export function AIChat() {
const [messages, setMessages] = useState<Message[]>([
    {
    role: "assistant",
    content: "Hello! I'm your AI schedule assistant. How can I help you today?",
    },
])
const [input, setInput] = useState("")
const [isLoading, setIsLoading] = useState(false)
const [isRecording, setIsRecording] = useState(false)
const scrollAreaRef = useRef<HTMLDivElement>(null)

useEffect(() => {
    if (scrollAreaRef.current) {
    scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
}, [messages])

const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json",
                "Authorization": process.env.XAI_API_KEY as string
            },
            body: JSON.stringify({ messages: [...messages, userMessage] }),
        })

        if (!response.ok) throw new Error("Failed to get response")

        const data = await response.text()
        setMessages((prev) => [...prev, { role: "assistant", content: data }])
    } catch (error) {
        console.error("Error sending message:", error)
        setMessages((prev) => [
            ...prev,
            {
            role: "assistant",
            content: "Sorry, I encountered an error. Please try again.",
            },
        ])
    } finally {
        setIsLoading(false)
    }
}

const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Voice recording logic goes here
}

return (
    <Card className="flex flex-col h-full">
    {/* Scrollable message area */}
    <div
        ref={scrollAreaRef}
        className="overflow-y-auto p-4 space-y-4 h-[60vh]"
    >
        {messages.map((message, index) => (
        <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
        >
            <div
            className={`flex max-w-[80%] items-start gap-2 rounded-lg p-3 ${
                message.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
            >
            {message.role === "assistant" && (
                <Avatar className="h-8 w-8">
                <AvatarFallback>AI</AvatarFallback>
                </Avatar>
            )}
            <div className="text-sm">{message.content}</div>
            </div>
        </div>
        ))}
        {isLoading && (
        <div className="flex justify-start">
            <div className="flex max-w-[80%] items-start gap-2 rounded-lg bg-muted p-3">
            <Avatar className="h-8 w-8">
                <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="flex space-x-1">
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                <div
                className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                style={{ animationDelay: "0.4s" }}
                ></div>
            </div>
            </div>
        </div>
        )}
    </div>

    {/* Fixed bottom input */}
    <CardContent className="border-t p-4">
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="icon"
                onClick={toggleRecording}
                className={isRecording ? "bg-red-100" : ""}
            >
                {isRecording ? (
                <MicOff className="h-5 w-5" />
                ) : (
                <Mic className="h-5 w-5" />
                )}
            </Button>
            <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                disabled={isLoading}
                className="flex-1"
            />
            <Button size="icon" onClick={handleSend} disabled={!input.trim() || isLoading}>
                <Send className="h-5 w-5" />
            </Button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => setInput("Help me plan my day")}>
                Plan my day
            </Button>
            <Button variant="outline" size="sm" onClick={() => setInput("Optimize my schedule")}>
                Optimize schedule
            </Button>
            <Button variant="outline" size="sm" onClick={() => setInput("Prioritize my tasks")}>
                Prioritize tasks
            </Button>
        </div>
    </CardContent>
    </Card>
)
}

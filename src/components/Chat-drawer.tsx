'use client'
import React from "react";
import { Mic, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet,
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetClose, 
  SheetTrigger
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

const ChatDrawer = () => {
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            title="Open Chat"
          >
            <Mic className="h-5 w-5" />
          </Button>
      </SheetTrigger>
      <SheetContent className="w-[350px] sm:w-[400px] p-0">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5 text-primary" />
              <span>Voice Assistant</span>
            </SheetTitle>
          </div>
        </SheetHeader>
        <div className="flex-1 overflow-auto p-4 flex flex-col space-y-4 h-[calc(100vh-150px)]">
          <div className="bg-secondary p-3 rounded-lg self-start max-w-[80%]">
            <p>Hello! How can I assist you today?</p>
          </div>
        </div>
        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatDrawer;
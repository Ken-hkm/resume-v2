'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { sendChatQuery } from '@/services/chat';
import { SendHorizonal, Bot, User } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";


interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
   const { toast } = useToast();


  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      // Access the viewport element within the ScrollArea
       const viewport = scrollAreaRef.current.querySelector<HTMLDivElement>('[data-radix-scroll-area-viewport]');
       if (viewport) {
         viewport.scrollTop = viewport.scrollHeight;
       }
    }
  };

   // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (!query || isLoading) return;

    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const chatResponse = await sendChatQuery(query);
      if (chatResponse) {
        setMessages((prev) => [...prev, { sender: 'bot', text: chatResponse.response }]);
      } else {
         // Add error message to chat or use toast
         setMessages((prev) => [...prev, { sender: 'bot', text: "Sorry, I couldn't get a response. Please try again." }]);
         toast({
            variant: "destructive",
            title: "Chat Error",
            description: "Failed to communicate with the chat API.",
          });
      }
    } catch (error) {
       console.error("Chat API error:", error);
       setMessages((prev) => [...prev, { sender: 'bot', text: "An error occurred. Please try again." }]);
        toast({
          variant: "destructive",
          title: "Chat Error",
          description: "An unexpected error occurred.",
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg rounded-lg border border-border overflow-hidden">
      <CardHeader className="bg-secondary p-4 border-b">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
           <Bot className="text-primary h-6 w-6" /> Ask me anything about Kenneth!
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                {message.sender === 'bot' && (
                   <Avatar className="h-8 w-8">
                     <AvatarFallback><Bot size={18}/></AvatarFallback>
                   </Avatar>
                )}
                <div className={`rounded-lg p-3 max-w-[75%] ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
                 {message.sender === 'user' && (
                    <Avatar className="h-8 w-8">
                       <AvatarFallback><User size={18}/></AvatarFallback>
                     </Avatar>
                 )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                 <Avatar className="h-8 w-8">
                   <AvatarFallback><Bot size={18}/></AvatarFallback>
                 </Avatar>
                <div className="rounded-lg p-3 bg-muted text-muted-foreground animate-pulse">
                  <span className="italic text-sm">Thinking...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t bg-secondary">
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            className="flex-1 bg-background"
            aria-label="Chat message input"
          />
          <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()} className="bg-accent hover:bg-accent/90 text-accent-foreground" aria-label="Send message">
            <SendHorizonal className="h-5 w-5" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}

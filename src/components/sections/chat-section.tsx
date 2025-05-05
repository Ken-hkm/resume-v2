
'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { sendChatQuery } from '@/services/chat';
import { SendHorizonal, Bot, User, MessageSquare, X, Info } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


interface Message {
  sender: 'user' | 'bot';
  text: string;
}

// Initial message from the bot explaining the tech and disclaimer
const initialBotMessage: Message = {
    sender: 'bot',
    text: "Hi! I'm an AI assistant trained on Kenneth's resume data. I use Gemini LLM, Gemini Text Embedding, and Pinecone Vector DB. Please note that my responses are AI-generated and might occasionally be inaccurate. Ask me anything about Kenneth's profile!"
};


export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([initialBotMessage]); // Start with the initial message
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true); // Default to open
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

  // Scroll to bottom when messages change or chat opens
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

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
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      {!isOpen && (
        <Button
          size="icon"
          className="rounded-full w-14 h-14 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      <Card
        className={cn(
          "shadow-xl rounded-lg border border-border overflow-hidden transition-all duration-300 ease-in-out w-80 md:w-96",
          isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 w-0 opacity-0 pointer-events-none' // Control visibility and size
        )}
      >
        <CardHeader className="bg-secondary p-4 border-b flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Bot className="text-primary h-5 w-5" /> Ask me anything!
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[400px] p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {/* Display Messages */}
              {messages.map((message, index) => (
                <div key={index} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                  {message.sender === 'bot' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback><Bot size={18} /></AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`rounded-lg p-3 max-w-[85%] text-sm ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    <p className="leading-relaxed">{message.text}</p>
                  </div>
                  {message.sender === 'user' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback><User size={18} /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><Bot size={18} /></AvatarFallback>
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
    </div>
  );
}

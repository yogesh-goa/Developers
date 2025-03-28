"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendIcon, BotIcon, UserIcon } from "lucide-react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "user",
      content: `You are an AI assistant that classifies AI agent requests into predefined categories and subcategories. Given a user prompt, you must analyze it and return a JSON object in the following format:  
{ "category": "<One of the predefined categories>", "type": "<One of the predefined subcategories>" }  

Rules for Response:  
Strictly return a JSON object—nothing else.  
Do NOT include explanations, comments, or additional text.  
DO NOT INCLUDE BACKTICKS OR JSON KEYWORD.
Select the most relevant category and type from the predefined list.  
If the request is ambiguous, make the best-guess classification based on keywords.  

If no category fits, classify it as:  
{ "category": "Custom AI Agents", "type": "Custom API-Based Agents" }  

AI Agent Categories & Subcategories  

1. Conversational AI Agents  
Chatbots  
Voice Assistants  
Multimodal Agents  
Task-Specific Chatbots  

2. Predictive AI Agents  
Regression-Based Agents  
Classification-Based Agents  
Time Series Forecasting Agents  
Anomaly Detection Agents  
Recommendation Agents  
Sports Prediction Agents  `,
    },
    {
      role: "assistant",
      content: "Hi there! I'm Auto, your AI assistant. How can I help you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom whenever messages change or the component mounts
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);


  // Updated Gemini API call using the Chat API for statefulness
  async function queryGeminiAPI(messages: Message[], userPrompt: string) {
    const apiKey = "AIzaSyCzUvvDCSCI8pW0AfBqH002fyECvQSosKA"; // Replace with your actual API key!
    const modelName = "gemini-2.0-flash"; // Or your preferred model
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    // Construct the request body for the Gemini API Chat endpoint
    const requestBody = {
      contents: [
        ...messages.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        })),
        { role: "user", parts: [{ text: userPrompt }] }, // Append the new user message
      ],
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("Gemini Response:", data);
      return data;
    } catch (error) {
      console.error("Error querying Gemini API:", error);
      return null;
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);  //optimistic update

    setInput("");
    setIsLoading(true);

    try {
      const response = await queryGeminiAPI(messages, input); // Pass the current messages
      if (response && response.candidates && response.candidates.length > 0) {
        const assistantReply = response.candidates[0].content.parts[0].text;
        const assistantMessage = { role: "assistant" as const, content: assistantReply };
        let reply = JSON.parse(assistantReply)
        assistantMessage.showCard = true
        if(reply.category == 'Predictive AI Agents'){
            assistantMessage.flowLink = "/builder2/j574rcy6rrmxqxwg5g5fk21wrh7cyjen"
        }
        else{
            assistantMessage.flowLink = `/builder2/j57cc9tfep9anhmzt4gs5tg4157czje8`
        }
        setMessages((prev) => [...prev, assistantMessage]); //append assistant message after api call
      } else {
        setMessages((prev) => [
          ...prev,
          ...[{ role: "assistant", content: "Sorry, I couldn't process that request." }],
        ]);
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        ...[{ role: "assistant", content: "An error occurred. Please try again." }],
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BotIcon className="h-5 w-5 text-primary" />
            Chat with Auto
          </DialogTitle>
          <DialogDescription>
            Your AI assistant for building and managing agents
          </DialogDescription>
        </DialogHeader>

        <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4">
          <div className="space-y-4 mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`p-5 rounded-xl ${
                      message.role === "user" ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    {message.role === "user" ? (
                      <UserIcon className="h-5 w-5 text-primary-foreground" />
                    ) : (
                      <BotIcon className="h-5 w-5" />
                    )}
                    
                    {message.role === "assistant" && message.content && message.showCard ? 
                        <div>
                            <p>Great! I have a flow ready for you!</p>
                            <Link href={message.flowLink} >
                                <p className="bg-white border w-full text-center p-1 rounded-md shadow mt-4">Go to flow</p>
                            </Link>
                        </div>
                        :
                        <div
                        className={`p-3 rounded-lg ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                    >
                        {message.content}
                    </div>
                    }
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2 max-w-[80%]">
                  <div className="p-1 rounded-full bg-muted">
                    <BotIcon className="h-5 w-5" />
                  </div>
                  <div className="p-3 rounded-lg bg-muted">
                    <div className="flex gap-1">
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="flex-shrink-0">
          <form onSubmit={handleSendMessage} className="flex w-full gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <SendIcon className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
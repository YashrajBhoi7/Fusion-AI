"use client";
import axios from "axios";
import { useState } from "react";
import { 
  
    Check,
    CodeIcon, 
    ImageIcon, 
    MessageSquare, 
    Music, 
    Video, 
    Zap} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
import { useProModal } from "../../hooks/use-pro-modal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
const tools = [
    {
      label: "Conversation",
      icon: MessageSquare,
      color: "text-sky-500",
      bgcolor: "bg-sky-500/10",
  
    },
    {
      label: "Image Generation",
      icon: ImageIcon,
      color: "text-sky-500",
      bgcolor: "bg-sky-500/10",
     
    },
    {
      label: "Video Generation",
      icon: Video,
      color: "text-sky-500",
      bgcolor: "bg-sky-500/10",
     
    },
    {
      label: "Code Generation",
      icon: CodeIcon,
      color: "text-sky-500",
      bgcolor: "bg-sky-500/10",
    
    },
    {
      label: "Music Generation",
      icon: Music,
      color: "text-sky-500",
      bgcolor: "bg-sky-500/10",

    },
  ]
export const ProModal= () =>{
    const proModal = useProModal();
    const [isLoading, setIsLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error: unknown) {
      
      console.error("[STRIPE_CLIENT_ERROR]: ", error);
    } finally {
      setIsLoading(false);
    }
  };
    
    return(
        <Dialog open = {proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div  className="flex items-center gap-x-2 font-bold py-1">
                             Upgrade to Fusion AI
                         <Badge variant= "premium"className="uppercase text-sm py-1">
                            Pro
                         </Badge>
                         </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                    {tools.map((tool) => (
              <Card
                key={tool.label}
                className="p-3 border-black/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgcolor)}>
                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                  </div>

                  <div className="font-semibold text-sm">{tool.label}</div>
                </div>

                <Check className="text-primary w-5 h-5" />
              </Card>
            ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                     
                    onClick={onSubscribe}
                    size="lg" variant="premium" className="w-full">
                        Upgrade 
                        <Zap className="w-4 h-4 ml-2 fill-white"/>
                    </Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}
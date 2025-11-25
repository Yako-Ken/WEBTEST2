import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { ReactNode } from "react";

interface ModalCustomProps {
  content: ReactNode;
  btn: ReactNode;
  title?: string;
  description?: string;
  isMenuItem?: boolean;
}

const ModalCustom = ({ content, btn, title, description, isMenuItem }: ModalCustomProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        {title && <h2 className="text-lg font-bold mb-2">{title}</h2>}
        {description && <p className="mb-4 text-sm text-gray-600">{description}</p>}
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default ModalCustom;


"use client";
import { CirclePlus } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CreateBudget = () => {
  const [pickEmoji, setPickEmoji] = useState("🤓");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  return (
    <div className="flex m-10 p-16 max-w-2xl px-5 md:px-20 lg:px-20 border-2 border-dashed border-grey-100 rounded-xl bg-primary-50 items-center justify-center cursor-pointer min-w-xl ">
      <Dialog>
        <DialogTrigger>
          <div className="flex-col space-y-4">
            <div className="flex-center">
              <CirclePlus />
            </div>
            <p className="text-grey-800 p-semibold-14 md:p-semibold-16 lg:p-semibold-18">
              Create Budget
            </p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budgets</DialogTitle>
            <DialogDescription>
              <div className="mt-4">
                <Button
                  variant={"outline"}
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {pickEmoji}
                </Button>
                <div className="absolute">
                  {openEmojiPicker && (
                    <EmojiPicker
                      open={openEmojiPicker}
                      onEmojiClick={(e) => {
                        setPickEmoji(e.emoji);
                        setOpenEmojiPicker(false);
                      }}
                    />
                  )}
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default CreateBudget;

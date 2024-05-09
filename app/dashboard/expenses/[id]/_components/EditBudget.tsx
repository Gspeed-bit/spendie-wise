"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Pencil } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { ColorRing } from "react-loader-spinner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

  interface ExpensesListProps {
    budgetInfo: BudgetListItem;
  }
const EditBudget = ({ budgetInfo }: ExpensesListProps) => {
  const [pickEmoji, setPickEmoji] = useState("🤓");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [eventCreated, setEventCreated] = useState(false);
  const { user } = useUser();





const UpdateBudget = () => {

};


  return (
    <div>
      <Dialog>
        <DialogTrigger className="bg-primary p-3 rounded-full">
          <Image
            src={"/icons/pencil.svg"}
            alt={"logo"}
            width={16}
            height={10}
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className=" p-semibold-20  md:h3-bold text-primary ">
              Edit Budget
            </DialogTitle>
            <DialogDescription>
              <div className="mt-4 text-start">
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
                <div className="space-y-3 mt-4 text-primary">
                  <h2 className="p-semibold-14">Budget Name</h2>
                  <Input
                    type="text"
                    className="placeholder:text-bluey-100 p-regular-12"
                    placeholder="e.g. House Rent"
                    defaultValue={budgetInfo.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <h2 className="p-semibold-14">Budget Amount</h2>
                  <Input
                    type="number"
                    placeholder={`e.g. \u20AC 1000`}
                    defaultValue={budgetInfo.amount}
                    className="placeholder:text-bluey-100 p-regular-12"
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                // onClick={() => UpdateBudget({ name, amount, pickEmoji })}
                disabled={!name || !amount || isLoading}
                className="text-white w-full hover:bg-primary-400"
              >
                {isLoading ? (
                  <ColorRing
                    visible={true}
                    height="40"
                    width="40"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={[
                      "#e15b64",
                      "#f47e60",
                      "#f8b26a",
                      "#abbd81",
                      "#849b87",
                    ]}
                  />
                ) : (
                  "Update Budget"
                )}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default EditBudget;

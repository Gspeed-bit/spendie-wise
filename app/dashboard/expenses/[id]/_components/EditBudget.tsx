"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Pencil } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { ColorRing } from "react-loader-spinner";
import { toast } from "sonner";
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
import { Budgets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/utils/dbConfig";
import { formattedEventDate } from "@/constant";

interface ExpensesListProps {
  budgetInfo: BudgetListItem;
}
const EditBudget = ({ budgetInfo, refreshData }:ExpensesListProps & {refreshData: () => void, }) => {
  const [pickEmoji, setPickEmoji] = useState(budgetInfo.pickEmoji);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [eventCreated, setEventCreated] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (eventCreated) {
      toast("New Budget has been created", {
        description: formattedEventDate,
      });
      refreshData(); // used to refresh the database after creating the budget
    }
  }, [eventCreated]);
  const UpdateBudget = async () => {
    setIsLoading(true);
    try {
      const result = await db
        .update(Budgets)
        .set({
          name: name,
          amount: amount.toString(),
          pickEmoji: pickEmoji,
        })
        .where(eq(Budgets.id, budgetInfo.id))
        .returning();

      setIsLoading(false);
      setEventCreated(!!result);
      setTimeout(() => {
        setEventCreated(false);
      }, 2000);

      toast("Budget Updated !!!", {
        description: formattedEventDate,
      });
    } catch (error) {
      console.error("Error updating budget:", error);
    }
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
                onClick={UpdateBudget}
                className="text-white w-full hover:bg-primary-400"
              >
                {isLoading ? (
                  <ColorRing
                    visible={true}
                    height="40"
                    width="40"
                    ariaLabel="color-ring-loading"
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

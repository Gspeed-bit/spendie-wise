"use client";
import { CirclePlus } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { ColorRing } from "react-loader-spinner";
import { useUser } from "@clerk/nextjs";
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
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Budgets } from "@/db/schema";
import { db } from "@/utils/dbConfig";
import { toast } from "sonner";
import { formattedEventDate } from "@/constant";

const CreateBudget = () => {
  const [pickEmoji, setPickEmoji] = useState("🤓");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
const [ eventCreated, setEventCreated] = useState(false)
  const { user } = useUser();



   useEffect(() => {
     if (eventCreated) {
       toast("New Budget has been created", {
         description: formattedEventDate,
       });
     }
   }, [eventCreated]);
  
  const onCreateBudget = async (budget: budgetTypesProps) => {
    setIsLoading(true);
    const result = await db
      .insert(Budgets)
      .values({
        name: budget.name,
        amount: budget.amount,
        pickEmoji: budget.pickEmoji,
        createdBy: user?.primaryEmailAddress?.emailAddress || "",
      })
      .returning({ insertedId: Budgets.id });

    setIsLoading(false);
    setEventCreated(!!result);
    setTimeout(() => {
      setEventCreated(false);
    }, 2000);

  };

 
  return (
    <div className="flex p-7 border-2 border-dashed border-grey-100 rounded-xl bg-primary-50 items-center justify-center cursor-pointer ">
      <Dialog>
        <DialogTrigger>
          <div className="flex-col space-y-3">
            <div className="flex-center">
              <CirclePlus />
            </div>
            <p className="text-grey-800 p-semibold-14 md:p-semibold-16 lg:p-semibold-18">
              Create New Budget
            </p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className=" p-semibold-20  md:h3-bold text-primary ">
              Create New Budgets
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
                    onChange={(e) => setName(e.target.value)}
                  />
                  <h2 className="p-semibold-14">Budget Amount</h2>
                  <Input
                    type="number"
                    placeholder={`e.g. \u20AC 1000`}
                    className="placeholder:text-bluey-100 p-regular-12"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                onClick={() => onCreateBudget({ name, amount, pickEmoji })}
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
                  "Create Budget"
                )}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default CreateBudget;

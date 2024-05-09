import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";

const AddExpenses = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="border rounded-xl shadow-sm p-4 w-full space-y-3 ">
      <h1 className="p-semibold-20">Add Expenses</h1>
      <div className="space-y-4 mt-2 text-primary">
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
      <Button
        // onClick={() => onCreateBudget({ name, amount, pickEmoji })}
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
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        ) : (
          "Create Budget"
        )}
      </Button>
    </div>
  );
};
export default AddExpenses;

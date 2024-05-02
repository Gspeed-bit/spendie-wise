import Image from "next/image"
import { Button } from "../button";

const Header = () => {
  return (
    <div className="flex-between bg-grey-800 p-4 w-full shadow-md">
      <Image src="/logo.png" width={60} height={50} alt="Logo" />
      <Button>Get Started</Button>
    </div>
  );
}
export default Header
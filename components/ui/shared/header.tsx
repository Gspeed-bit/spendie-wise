import Image from "next/image"
import { Button } from "../button";

const Header = () => {
  return (
    <div className="flex-between sticky top-0 bg-primary-300 p-3 w-full shadow-md">
      <Image src="/logo.png" width={60} height={50} alt="Logo" />
      <Button>Get Started</Button>
    </div>
  );
}
export default Header
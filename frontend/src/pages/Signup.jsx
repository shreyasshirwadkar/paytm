import { Heading } from "../components/Heading";
import { Subheading } from "../components/Subheading";
import { Inputbox } from "../components/Inputbox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";

export const Signup = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign Up"} />
          <Subheading label={"Create a new account"} />
          <Inputbox placeholder={"John"} label={"First Name"}></Inputbox>
          <Inputbox placeholder={"Doe"} label={"Last Name"}></Inputbox>
          <Inputbox placeholder={"sas@gmail.com"} label={"Username"}></Inputbox>
          <Inputbox placeholder={"*******"} label={"Password"}></Inputbox>
          <Button label={"Sign Up"} onClick={() => {}}></Button>
          <BottomWarning label={"Already have an account ?"} buttonText={"Sign In"} to={"/signin"}></BottomWarning>
        </div>
      </div>
    </div>
  );
};

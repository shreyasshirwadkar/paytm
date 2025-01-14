import { Heading } from "../components/Heading";
import { Subheading } from "../components/Subheading";
import { Inputbox } from "../components/Inputbox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";

export const Signin = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign In"} />
          <Subheading label={"Log in to your account"} />
          <Inputbox placeholder={"sas@gmail.com"} label={"Username"}></Inputbox>
          <Inputbox placeholder={"*******"} label={"Password"}></Inputbox>
          <Button label={"Sign In"} onClick={() => {}}></Button>
          <BottomWarning
            label={"Don't have an Account ?"}
            buttonText={"Sign Up"}
            to={"/signup"}
          ></BottomWarning>
        </div>
      </div>
    </div>
  );
};

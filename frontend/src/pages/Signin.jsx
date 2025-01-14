import { Heading } from "../components/Heading";
import { Subheading } from "../components/Subheading";
import { Inputbox } from "../components/Inputbox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign In"} />
          <Subheading label={"Log in to your account"} />
          <Inputbox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder={"sas@gmail.com"}
            label={"Username"}
          ></Inputbox>
          <Inputbox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder={"*******"}
            label={"Password"}
          ></Inputbox>
          <Button
            label={"Sign In"}
            onClick={async () => {
              const res = await axios.post(
                "http://localhost:3000/api/v1/user/signin",
                {
                  username: username,
                  password: password,
                }
              );
              const token = res.data.token;
              localStorage.setItem("token", "Bearer " + token);
              navigate("/dashboard");
            }}
          ></Button>
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

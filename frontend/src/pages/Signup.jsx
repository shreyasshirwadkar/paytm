import { Heading } from "../components/Heading";
import { Subheading } from "../components/Subheading";
import { Inputbox } from "../components/Inputbox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign Up"} />
          <Subheading label={"Create a new account"} />
          <Inputbox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder={"John"}
            label={"First Name"}
          ></Inputbox>
          <Inputbox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder={"Doe"}
            label={"Last Name"}
          ></Inputbox>
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
            label={"Sign Up"}
            onClick={async () => {
              const res = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                {
                  username,
                  password,
                  firstName,
                  lastName,
                }
              );
              localStorage.setItem("token", "Bearer " + res.data.token);
              navigate("/dashboard");
            }}
          ></Button>
          <BottomWarning
            label={"Already have an account ?"}
            buttonText={"Sign In"}
            to={"/signin"}
          ></BottomWarning>
        </div>
      </div>
    </div>
  );
};

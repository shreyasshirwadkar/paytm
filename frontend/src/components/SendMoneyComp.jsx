import { Inputbox } from "./Inputbox";
import { useState } from "react";
import axios from "axios";
export const SendMoneyComp = ({ name, id }) => {
  const [amount, setAmount] = useState("");
  return (
    <div className="bg-slate-100 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded bg-white shadow w-96 h-max px-10 py-7 flex flex-col justify-center ">
          <div className="flex flex-col justify-between">
            <div className="mb-12 font-bold text-center text-2xl">
              Send Money
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex">
                <div className="rounded-full h-12 w-12 bg-green-500 flex justify-center mr-4 mt-1">
                  <div className="flex flex-col font-bold justify-center h-full text-md text-white">
                    {name[0].toUpperCase()}
                  </div>
                </div>
                <div className="flex flex-col justify-center font-bold text-xl">
                  {name}
                </div>
              </div>
              <Inputbox
                placeholder={"Enter Amount"}
                label={"Amount (In Rs.)"}
                type={"number"}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              ></Inputbox>
              <button
                className="w-full bg-green-500 text-white font-medium rounded-lg text-md  px-5 mt-4 py-2.5 me-2 mb-2"
                onClick={async () => {
                  await axios.post(
                    "http://localhost:3000/api/v1/accounts/transfer",
                    {
                      to: id,
                      amount: amount,
                    },
                    {
                      headers: {
                        Authorization: localStorage.getItem("token"),
                      },
                    }
                  );
                  alert("Transfer Completed");
                }}
              >
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

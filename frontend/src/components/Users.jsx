import { useEffect, useState } from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(
    () => async () => {
      const res = await axios.get(
        "http://localhost:3000/api/v1/user/bulk?filter=" + filter
      );
      setUsers(res.data.user);
    },
    [filter, users]
  );

  return (
    <div className="flex flex-col mt-4">
      <div className="font-semibold"> Users </div>
      <input
        placeholder="Search user"
        className="w-full px-2 py-1 border shadow-sm mt-2"
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
      <div>
        {users.map((user) => (
          <UserComp user={user} />
        ))}
      </div>
    </div>
  );
};

const UserComp = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col p-4 mt-4">
      <div className="flex justify-between">
        <div className="flex">
          <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mr-4 mt-1">
            <div className="flex flex-col justify-center h-full text-sm">
              {user.firstName[0].toUpperCase()}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            {user.firstName} {user.lastName}
          </div>
        </div>
        <div className="flex flex-col jhistory.pushStateustify-center">
          <Button
            label={"Send Money"}
            onClick={(e) => {
              navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
};

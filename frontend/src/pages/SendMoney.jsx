import { useSearchParams } from "react-router-dom";
import { SendMoneyComp } from "../components/SendMoneyComp";
export const SendMoney = (req) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  return <SendMoneyComp name={name} id={id} />;
};

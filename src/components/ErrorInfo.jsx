import { useRouteError, useNavigation, isRouteErrorResponse, useNavigate } from "react-router-dom";
import { ReactComponent as BoxIcon } from "../assets/error-box.svg";
import Button1 from "./UI/Button1";

export default function ErrorInfo() {
  const error = useRouteError();
  const navigation = useNavigation();
  const navigate = useNavigate();
  // console.error(error); // only for debugging

  return navigation.state === "loading" ? (
    <></>
  ) : isRouteErrorResponse(error) && error?.data ? (
    <div className="flex flex-col items-center gap-6 mt-16">
      <div className="flex flex-col items-center">
        <h1>Oops!</h1>
        <BoxIcon className="h-32 w-32 lg:h-52 lg:w-52" />
        <h1 className="text-rose-500 text-center">{error.data.match(/\d+/)}</h1>
        <p className="text-rose-500 text-center">{error.data.match(/(?<=\d+\s).*/) || error.data}</p>
      </div>
      <Button1 onClick={() => navigate(-1)}>Go Back</Button1>
    </div>
  ) : (
    <div className="flex flex-col items-center gap-6 mt-16">
      <div className="flex flex-col items-center">
        <h1>Oops!</h1>
        <BoxIcon className="h-32 w-32 lg:h-52 lg:w-52" />
        <p className="text-rose-500 text-center">Sorry, an unexpected error has occurred.</p>
        <p className="text-rose-500 text-center">{error.statusText || error.message}</p>
      </div>
      <Button1 onClick={() => navigate(-1)}>Go Back</Button1>
    </div>
  );
}

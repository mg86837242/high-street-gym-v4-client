import { useContext, useState, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import { API_URL } from "../data/constants";

export default function useDefaultValues() {
  const { authenticatedUser } = useContext(AuthContext);
  const [defaultValues, setDefaultValues] = useState(null);
  useEffect(() => {
    if (authenticatedUser) {
      let ignore = false;
      if (authenticatedUser.role === "Member") {
        fetch(`${API_URL}/members/member-with-all-details-by-id/${authenticatedUser.memberId}`, {
          credentials: "include",
        })
          .then((response) => response.json())
          .then((json) => {
            if (!ignore) {
              setDefaultValues(json.defaultValues);
            }
          });
      }
      return () => {
        ignore = true;
      };
    }
  }, [authenticatedUser]);
  // PS Printing `defaultValues` fires 4 times: (1) no `user` state/context, (2) no `user` state/context strict mode,
  //  (3) populated `user` state/context, (4) populated `user` state/context strict mode
  // console.log(`🟢 [${new Date().toLocaleTimeString()}] defaultValues: `, defaultValues);
  return defaultValues;
}

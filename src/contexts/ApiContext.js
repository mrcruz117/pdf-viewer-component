import { createContext, useReducer, useEffect } from "react";
import apiReducer from "./apiReducer";
import { getContainerNames } from "./apiActions";
// import { useMsal } from "@azure/msal-react";
// import { getAll, getSingleEndpoint } from "./apiActions";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  //   const { instance, accounts } = useMsal();
  // context
  const initialState = {
    // user settings
    user_type: "",
    user_id: "",

    errorCode: "",

    containerOptions: [],

    loading: false,
  };

  const [state, dispatch] = useReducer(apiReducer, initialState);

  // get container names
  console.log("before useEffect in ApiContext");
  useEffect(() => {
    console.log("inside useEffect in ApiContext");
    const containerOptionsRes = async () => {
      const res = await getContainerNames();
      console.log("res", res);
      console.log("complete");
      // return;
      dispatch({
        type: "GET_CONTAINER_OPTIONS",
        payload: res.data.containers,
      });
    };
    if (state.containerOptions.length === 0) {
      containerOptionsRes();
    } else {
      console.log("state.containerOptions", state.containerOptions);
    }
  }, []);

  return (
    <ApiContext.Provider
      value={{
        ...state,
        dispatch,

        // accounts,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

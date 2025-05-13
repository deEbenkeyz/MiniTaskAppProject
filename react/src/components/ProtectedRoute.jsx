import {Navigate} from "react-router-dom";
import {useStateContext} from "./../contexts/ContextProvider";

export default function ProtectedRoute({children}) {
  const {token} = useStateContext();

  if (!token) {
    // If there's no token, redirect to login
    return <Navigate to="/login" />;
  }

  return children;
}

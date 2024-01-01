import { createTransform } from "redux-persist";
import { AuthState } from "./components/authSlice";

const authTransform = createTransform<AuthState, AuthState>(
  (inboundState) => {
    const { error, ...rest } = inboundState;
    return rest;
  },
  (outboundState) => {
    return outboundState;
  },
  { whitelist: ["auth"] }
);

export default authTransform;

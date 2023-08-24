import { useSelector } from "react-redux";
import { RootState } from "../../core";

export const useAuthentication = () => {
    const isAuthenticated = useSelector(
        (state: RootState) => !!state.auth.token
    );

    return isAuthenticated;
};

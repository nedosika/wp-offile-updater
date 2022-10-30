import {createContext, useContext, useEffect, useState} from "react";
import {gql, useMutation} from "@apollo/client";

const CHECK_AUTH = gql`mutation refresh {
  refresh{
    accessToken,
    error
  }
}`;

const SIGN_IN = gql`mutation signIn($email: String!, $password: String!){
    signIn(email: $email, password: $password){
        user{
            id
            name
            email
        }
        tokens {
            refreshToken
            accessToken
        }
    }
}`

const SIGN_OUT = gql`mutation signOut{
    signOut{
        message
        error
    }
}`

const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [signInMutation, signInTracking] = useMutation(SIGN_IN);
    const [signOutMutation, signOutTracking] = useMutation(SIGN_OUT);
    const [checkAuthMutation, {loading: isCheckingAuth}] = useMutation(CHECK_AUTH);
    const isLoading = signInTracking.loading || signOutTracking.loading;

    const signIn = ({email, password}) => {
        signInMutation({
            variables: {
                email,
                password
            }
        })
            .then(({data: { signIn: { tokens:  {accessToken}}}}) => {
            localStorage.setItem("accessToken", accessToken);
            setIsAuth(true);
        })
    }

    const signOut = () => {
        signOutMutation().then(() => {
            localStorage.removeItem("accessToken");
            setIsAuth(false);
        })
    }

    const checkAuth = () => {
        checkAuthMutation()
            .then(({data: { refresh: { accessToken }}}) => {
                localStorage.setItem("accessToken", accessToken);
                setIsAuth(true);
        })
    }

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            checkAuth();
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{ isAuth, isCheckingAuth, isLoading, signIn, signOut }}
        >
            {children}
        </AuthContext.Provider>
    );
};
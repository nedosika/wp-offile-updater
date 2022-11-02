import {createContext, useContext, useEffect, useState} from "react";
import {apolloClient} from "../apollo/client";
import {SIGN_OUT} from "../apollo/mutations";

export const possibleRefreshTokenErrors = [
    'Refresh token is required',
    'Invalid refresh token',
    'Refresh token is expired'
]

const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export default function AuthProvider({children}){
    const [accessToken, setAccessToken] = useState(null);

    const isAuth = !!accessToken;

    // useEffect(() => {
    //     if (!isAuth) {
    //         apolloClient.mutate({ mutation: SIGN_OUT }).catch(error => {
    //             if (!possibleRefreshTokenErrors.includes(error.message)) {
    //                 console.log(error.message)
    //             }
    //         })
    //         apolloClient.clearStore();
    //         localStorage.setItem('isAuth', false)
    //     } else {
    //         localStorage.setItem('isAuth', true)
    //     }
    // }, [isAuth])

    return <AuthContext.Provider value={{isAuth, accessToken, setAccessToken}}>
        {children}
    </AuthContext.Provider>
}
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import CustomerApi from "./API/CustomerApi";
import UserApi from "./API/UserApi";

export const GlobalContext = createContext();

function DataProvider(props) {
    const [token, setToken] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("loginStatus")) {
            const refToken = async () => {
                try {
                    const res = await axios.get(`http://localhost:5400/api/auth/refToken`);
                    console.log('token =', res.data);
                    setToken(res.data.accessToken);
                    setTimeout(() => {
                        refToken();
                    }, 10 * 60 * 1000);
                } catch (error) {
                    console.error("Error fetching token:", error);
                }
            }; //end of reftoken
            refToken();
        } // end of if
    }, []);
    let data = {
        token: [token, setToken],
        userAPI: UserApi(token),
        customerApi: CustomerApi()
    };
    return (
        <GlobalContext.Provider value={data}>
            {props.children}
        </GlobalContext.Provider>
    );
}

export default DataProvider;

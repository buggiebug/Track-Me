import React, { useEffect, useState } from 'react'

import Login from "./Login";
import Signup from "./Signup";

export default function Auth() {

    const [loginToggle, setLoginToggle] = useState("login");

    const handleToggle = (toggle) => {
        setLoginToggle(toggle);
    }

    if (loginToggle === "signup") {
        return (
            <Signup handleToggle={handleToggle} />
        )
    }

    if (loginToggle === "login") {
        return (
            <Login handleToggle={handleToggle} />
        )
    }

    else return null;
}

import React, { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Quiz from "./components/Quiz";

function App() {

    let [isDark,changeTheme]=useState(false)

    let theme = {
        "--primary-color": isDark?"#ffffff":"#000000",
        "--bg-color": isDark?"#121212":"#ffffff",
    };
    
    return (
        <div className="App" style={theme}>
            <NavBar theme={[isDark, changeTheme]} />
            <Quiz />
        </div>
    );
}

export default App;

"use client";
import React, { useState } from "react"
import Login from "./Login";
import Register from "./Register";
import { boolean } from "zod";
import "./style.css"

export default function LoginRegister() {
    const [pages, setPages] = useState<boolean>(false);
    const [animationClass, setAnimationClass] = useState<string>("");
  
    const handleTogglePages = () => {
      setAnimationClass(pages ? "slide-left" : "slide-right");
      setPages(!pages);
    };
  
    return (
      <main className={`w-full h-screen flex flex-col ${ !pages ? "md:flex-row" : "md:flex-row-reverse" } overflow-x-hidden pr-4 md:py-9 ${animationClass}`}>
        {!pages ? (
          <Login pages={pages} setPages={handleTogglePages} />
        ) : (
          <Register pages={pages} setPages={handleTogglePages} />
        )}
      </main>
    );
}
  
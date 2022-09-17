import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import App, { AppStateContext } from "../../App";
import park3img from "../../images/1.svg";

function Header(props) {
  const { walletaddress } = useContext(AppStateContext);

  return (
    <>
      <div className="main  min-w-full flex ">
        <div>
          <h1 className="textcolor pt-3 ">PARK3</h1>
        </div>
        <div>
          <h1 className="textcolor pt-3 underline">{props.heading}</h1>
        </div>
        <div className="username-addr">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="50"
              fill="currentColor"
              class="ml-2 bi bi-wallet2"
              viewBox="0 0 16 16"
              className="color-white"
            >
              <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
            </svg>
            {walletaddress.slice(0, 6)}...{walletaddress.slice(38)}
          </div>
          <div className="proposeslist-btn">
            <Link to="list">ProposesList</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;

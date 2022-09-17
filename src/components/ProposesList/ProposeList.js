import React, { useState, useContext, useRef } from "react";
import "../../App.css";
import { AppStateContext } from "../../App";
import Header from "../Header/Header";
import Proposal from "../Propose/propose";

function ProposeList() {
  const { proposalData, setproposalData } = useContext(AppStateContext);
  return (
    <>
      <div className="h-screen back-color h-full">
        <Header heading="Proposes" />

        <div className="div-list">
          <Proposal />
        </div>
      </div>
    </>
  );
}

export default ProposeList;

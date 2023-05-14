import React, { useState, useEffect, useContext } from "react";

// Import the main component

// import { uploadFileToBlobStorage } from "./functions/uploadBlob";
import PdfIngest from "./components/pdfIngest/PdfIngest";
import ChatBox from "./components/chat/ChatBox.tsx";
import { ApiContext, ApiProvider } from "./contexts/ApiContext";
import NavBar from "./components/NavBar.jsx";

export const App = () => {
  const { loading, dispatch, currentPage } = useContext(ApiContext);

  return (
    <>
      <NavBar />
      {currentPage === "Ingest Pdf" && <PdfIngest />}
      {currentPage === "Chat" && <ChatBox />}
    </>
  );
};

export default App;

import React, { useState, useEffect } from "react";
// Import the main component

// import { uploadFileToBlobStorage } from "./functions/uploadBlob";
import PdfIngest from "./components/pdfIngest/PdfIngest";
import ChatBox from "./components/chat/ChatBox.tsx";

export const App = () => {
  return (
    <>
      <PdfIngest />
      <ChatBox />
    </>
  );
};

export default App;

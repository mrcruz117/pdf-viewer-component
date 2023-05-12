import React, { useState, useEffect } from "react";
// Import the main component

// import { uploadFileToBlobStorage } from "./functions/uploadBlob";
import PdfIngest from "./components/pdfIngest/PdfIngest";
import ChatBox from "./components/chat/ChatBox.tsx";
import { ApiProvider } from "./contexts/ApiContext";

export const App = () => {
  return (
    <ApiProvider>
      <PdfIngest />
      <ChatBox />
    </ApiProvider>
  );
};

export default App;

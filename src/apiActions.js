import axios from "axios";
// import FormData from "form-data";
// import { post } from "jquery";
// import moment from "moment";
const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = process.env.REACT_APP_API;

const api = axios.create({
  baseURL: API_URL,
  // headers: { Authorization: `token ${JWT_TOKEN}` },
});

export const messageToApi = async (pdfFiles) => {
  console.log("pdfFiles", pdfFiles);

  const fileArray = [];

  const formData = new FormData();
  formData.append("docType", `${pdfFiles[0].docType}`);
  formData.append("serialNumber", `${pdfFiles[0].serialNumber}`);
  pdfFiles.forEach((file, idx) => {
    fileArray.push(file.docUrl);
    console.log("file", file.docUrl);
    formData.append(`file${idx + 1}`, file.docUrl);
  });

  console.log("fileArray", fileArray);

  console.log("formData vals: ", formData);

  for (const value of formData) {
    console.log("value", value);
  }

  const headers = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const res = await api.post("/upload", formData, headers);

  console.log("res", res);
};

import React, { useState, useEffect } from "react";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library
import { Button, Card, Grid } from "@mui/material";

export const App = () => {
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // for onchange event
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");

  // for submit event
  const [viewPdf, setViewPdf] = useState(null);

  // onchange event
  const fileType = ["application/pdf"];
  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError("");
        };
      } else {
        setPdfFile(null);
        setPdfFileError("Please select valid pdf file");
      }
    } else {
      console.log("select your file");
    }
  };

  useEffect(() => {
    if (pdfFile) {
      setViewPdf(pdfFile);
    } else {
      setViewPdf(null);
    }
  }, [pdfFile]);

  // form submit
  const handlePdfFileSubmit = (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
    } else {
      setViewPdf(null);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        // display={"grid"}
        // direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          // display: "flex",
          // direction: "column",

          // border: "1px solid black",
          // justifyContent: "center",
          //  alignItems: "center",
          width: "80%",
        }}
        spacing={1}
      >
        <Card sx={{ width: "100%", padding: 5, margin: 3, boxShadow: 10 }}>
          <Grid container item xs={12}>
            {/* <form onSubmit={handlePdfFileSubmit}> */}
            <Grid
              item
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              xs={6}
            >
              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              > */}
              <Button variant="contained" component="label">
                Upload File
                <input
                  hidden
                  type="file"
                  className="form-control"
                  required
                  onChange={handlePdfFileChange}
                />
              </Button>
              {/* </div> */}
            </Grid>
            {pdfFileError && <div className="error-msg">{pdfFileError}</div>}
            {/* <br></br> */}
            <Grid
              item
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              xs={6}
            >
              <Button
                //  type="submit"
                onClick={() => {
                  console.log("ingest");
                  // handlePdfFileSubmit();
                }}
                className="btn btn-success btn-lg"
              >
                Ingest PDF
              </Button>
            </Grid>
            {/* </form> */}
          </Grid>
          {/* <br></br> */}
          <Grid
            item
            display={"flex"}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            xs={12}
          >
            <h4>View PDF</h4>
            {/* <div className="pdf-container"> */}
            {/* show pdf conditionally (if we have one)  */}
            {viewPdf && (
              <div
                style={{
                  height: "1000px",
                  width: "100%",
                }}
              >
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.5.141/build/pdf.worker.min.js">
                  <Viewer
                    fileUrl={viewPdf}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                </Worker>
              </div>
            )}

            {/* if we dont have pdf or viewPdf state is null */}
            {!viewPdf && <>No pdf file selected</>}
            {/* </div> */}
          </Grid>
        </Card>
      </Grid>
    </div>
  );
};

export default App;

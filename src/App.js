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
import ClearIcon from "@mui/icons-material/Clear";
import FolderIcon from '@mui/icons-material/Folder';
import {
  Alert,
  Avatar,
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

export const App = () => {
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // for onchange event
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");
  const [selectedDocType, setSelectedDocType] = useState(null);
  const [ingestionQueue, setIngestionQueue] = useState([]);

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
        setTimeout(() => {
          setPdfFileError("");
        }, 3000);
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

  function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {pdfFileError && (
        <Snackbar
          sx={{
            // marginTop: 1,
            boxShadow: 5,
          }}
          severity="error"
          open={pdfFileError}
          autoHideDuration={5000}
          // onClose={handleClose}
          message={pdfFileError}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          // action={action}
        >
          <Alert
            // onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {pdfFileError}
          </Alert>
        </Snackbar>
      )}
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
              xs={4}
            >
              <TextField
                sx={{ minWidth: 120 }}
                InputLabelProps={{ shrink: true }}
                autoWidth
                size={"small"}
                select
                value={selectedDocType}
                label="Document Type"
                onChange={(e) => setSelectedDocType(e.target.value)}
                // helperText="Please select your currency"
                variant="outlined"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"APU"}>APU</MenuItem>
                <MenuItem value={"Engine"}>Engine</MenuItem>
                <MenuItem value={"Aircraft"}>Aircraft</MenuItem>
              </TextField>
            </Grid>

            <Grid
              item
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              xs={4}
            >
              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              > */}
              <Button
                disabled={!selectedDocType}
                variant="contained"
                component="label"
              >
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

            <Grid
              item
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              xs={4}
            >
              <Button
                disabled={!pdfFile || !selectedDocType}
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

            <Grid item xs={12} md={6}>
              <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Avatar with text and icon
              </Typography>

              <List dense>
                {generate(
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <ClearIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Single-line item"
                      // secondary={secondary ? "Secondary text" : null}
                    />
                  </ListItem>
                )}
              </List>
            </Grid>

            {/* {pdfFileError && <div className="error-msg">{pdfFileError}</div>} */}

            {/* <div className="pdf-container"> */}
            {/* show pdf conditionally (if we have one)  */}
            {viewPdf && (
              <div
                style={{
                  height: "700",
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

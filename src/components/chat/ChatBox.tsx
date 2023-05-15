import React, { useContext, useEffect } from "react";
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  Link,
  Card,
  ThemeProvider,
  Typography,
  createTheme,
  TextField,
  MenuItem,
} from "@mui/material";
import {
  ChatController,

  // MuiChat,
} from "./chat-controller.ts";
import { ApiContext } from "../../contexts/ApiContext.js";

import { askQuestion } from "../../contexts/apiActions.js";

import { MuiChat } from "./mui/MuiChat.tsx";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#007aff",
    },
  },
});

export default function ChatBox(): React.ReactElement {
  const {
    loading,
    dispatch,
    containerOptions,
    setSelectedContainer,
    selectedContainer,
  } = useContext(ApiContext) as any;

  // const [selectedContainerName, setSelectedContainerName] = React.useState("");

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
  }, []);

  const [chatCtl] = React.useState(
    new ChatController({
      showDateTime: true,
    })
  );
  const handleSelect = (e) => {
    console.log("e", e.target);
    setSelectedContainer(e.target.value);
  };

  React.useEffect(() => {
    console.log("selectedContainer", selectedContainer);
    echo(chatCtl, selectedContainer);
  }, [chatCtl, selectedContainer]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ height: "500px" }}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            maxWidth: "640px",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "5px",
            bgcolor: "background.default",
            // margin: 3,
            boxShadow: 5,
          }}
        >
          {containerOptions.length > 0 && (
            <TextField
              sx={{ minWidth: 120, margin: 1 }}
              // disabled={ingestionQueue.length > 0}
              InputLabelProps={{ shrink: true }}
              // autowidth={true}
              size={"small"}
              select
              value={selectedContainer}
              label="Saved Documents"
              onChange={handleSelect}
              // helperText="Please select your currency"
              variant="outlined"
            >
              <MenuItem value={""}>Select</MenuItem>
              {containerOptions.map((option: any, idx) => {
                return (
                  <MenuItem key={`${option}_${idx}`} value={option}>
                    {option}
                  </MenuItem>
                );
              })}
            </TextField>
          )}
          <Box sx={{ flex: "1 1 0%", height: "500px" }}>
            <MuiChat chatController={chatCtl} />
          </Box>
        </Card>
      </Box>
    </ThemeProvider>
  );
}
async function echo(
  chatCtl: ChatController,
  selectedContainer: string
): Promise<void> {
  // await chatCtl.addMessage({
  //   type: "text",
  //   content: `How can I help you?`,
  //   self: false,
  //   avatar: <SmartToyIcon />,
  // });

  const text = await chatCtl.setActionRequest({
    type: "text",
    placeholder: "Ask a question",
  });

  // handle api response test
  // const getContainersRes = await getContainerNames();
  // console.log("getContainersRes", getContainersRes);
  // return;

  const question = {
    question: text.value,
    bundle: selectedContainer,
    // bundle: "APU/APU SN P-2273",
  };
  let answer;

  console.log("selectedContainer", selectedContainer);
  if (selectedContainer) {
    console.log("question", question);
    const test_question = await askQuestion(question);

    console.log("test_question", test_question);

    answer =
      test_question && test_question.data && test_question.data.answer
        ? test_question.data.answer
        : "Sorry, there was an error. Please try again.";
  } else {
    answer = "Please select a saved document.";
  }

  await chatCtl.addMessage({
    type: "text",
    content: `${answer}`,
    self: false,
    avatar: <SmartToyIcon />,
  });

  // await chatCtl.addMessage({
  //   type: "text",
  //   content: `What is your gender?`,
  //   self: false,
  //   avatar: "-",
  // });
  // const sel = await chatCtl.setActionRequest({
  //   type: "select",
  //   options: [
  //     {
  //       value: "man",
  //       text: "Man",
  //     },
  //     {
  //       value: "woman",
  //       text: "Woman",
  //     },
  //     {
  //       value: "other",
  //       text: "Other",
  //     },
  //   ],
  // });
  // await chatCtl.addMessage({
  //   type: "text",
  //   content: `You have selected ${sel.value}.`,
  //   self: false,
  //   avatar: "-",
  // });

  // await chatCtl.addMessage({
  //   type: "text",
  //   content: `What is your favorite fruit?`,
  //   self: false,
  //   avatar: "-",
  // });
  // const mulSel = await chatCtl.setActionRequest({
  //   type: "multi-select",
  //   options: [
  //     {
  //       value: "apple",
  //       text: "Apple",
  //     },
  //     {
  //       value: "orange",
  //       text: "Orange",
  //     },
  //     {
  //       value: "none",
  //       text: "None",
  //     },
  //   ],
  // });
  // await chatCtl.addMessage({
  //   type: "text",
  //   content: `You have selected '${mulSel.value}'.`,
  //   self: false,
  //   avatar: "-",
  // });

  // await chatCtl.addMessage({
  //   type: "text",
  //   content: `What is your favorite picture?`,
  //   self: false,
  //   avatar: "-",
  // });
  // const file = (await chatCtl.setActionRequest({
  //   type: "file",
  //   accept: "image/*",
  //   multiple: true,
  // })) as FileActionResponse;
  // await chatCtl.addMessage({
  //   type: "jsx",
  //   content: (
  //     <div>
  //       {file.files.map((f) => (
  //         <img
  //           key={file.files.indexOf(f)}
  //           src={window.URL.createObjectURL(f)}
  //           alt="File"
  //           style={{ width: "100%", height: "auto" }}
  //         />
  //       ))}
  //     </div>
  //   ),
  //   self: false,
  //   avatar: "-",
  // });

  // await chatCtl.addMessage({
  //   type: "text",
  //   content: `Please enter your voice.`,
  //   self: false,
  //   avatar: "-",
  // });
  // const audio = (await chatCtl
  //   .setActionRequest({
  //     type: "audio",
  //   })
  //   .catch(() => ({
  //     type: "audio",
  //     value: "Voice input failed.",
  //     avatar: "-",
  //   }))) as AudioActionResponse;
  // await (audio.audio
  //   ? chatCtl.addMessage({
  //       type: "jsx",
  //       content: (
  //         <a href={window.URL.createObjectURL(audio.audio)}>Audio downlaod</a>
  //       ),
  //       self: false,
  //       avatar: "-",
  //     })
  //   : chatCtl.addMessage({
  //       type: "text",
  //       content: audio.value,
  //       self: false,
  //       avatar: "-",
  //     }));

  // await chatCtl.addMessage({
  //   type: "text",
  //   content: `Please press the button.`,
  //   self: false,
  //   avatar: "-",
  // });
  // const good = await chatCtl.setActionRequest({
  //   type: "custom",
  //   Component: GoodInput,
  // });
  // await chatCtl.addMessage({
  //   type: "text",
  //   content: `You have pressed the ${good.value} button.`,
  //   self: false,
  //   avatar: "-",
  // });

  echo(chatCtl, selectedContainer);
}

// function GoodInput({
//   chatController,
//   actionRequest,
// }: {
//   chatController: ChatController;
//   actionRequest: ActionRequest;
// }) {
//   const chatCtl = chatController;

//   const setResponse = React.useCallback((): void => {
//     const res = { type: "custom", value: "Good!" };
//     chatCtl.setActionResponse(actionRequest, res);
//   }, [actionRequest, chatCtl]);

//   return (
//     <div>
//       <Button
//         type="button"
//         onClick={setResponse}
//         variant="contained"
//         color="primary"
//       >
//         Good!
//       </Button>
//     </div>
//   );
// }

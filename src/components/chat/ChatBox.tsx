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
} from "@mui/material";
import {
  ChatController,

  // MuiChat,
} from "./chat-controller.ts";
import React from "react";

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
  const [chatCtl] = React.useState(
    new ChatController({
      showDateTime: true,
    })
  );

  React.useMemo(() => {
    echo(chatCtl);
  }, [chatCtl]);

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
          <Box sx={{ flex: "1 1 0%", height: "500px" }}>
            <MuiChat chatController={chatCtl} />
          </Box>
        </Card>
      </Box>
    </ThemeProvider>
  );
}

async function echo(chatCtl: ChatController): Promise<void> {
  await chatCtl.addMessage({
    type: "text",
    content: `Please enter something.`,
    self: false,
    avatar: <SmartToyIcon />,
  });

  const text = await chatCtl.setActionRequest({
    type: "text",
    placeholder: "Please enter something",
  });
  await chatCtl.addMessage({
    type: "text",
    content: `You have entered:\n${text.value}`,
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

  echo(chatCtl);
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

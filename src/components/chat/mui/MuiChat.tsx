import { Box, Divider } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect } from "react";

import { ChatController } from "../chat-controller";
import {
  ActionRequest,
  CustomActionRequest,
  TextActionRequest,
} from "../chat-types";

import { MuiMessage } from "./MuiMessage.tsx";
import { MuiTextInput } from "./MuiTextInput.tsx";

export function MuiChat({
  chatController,
}: React.PropsWithChildren<{
  chatController: ChatController;
}>): React.ReactElement {
  const chatCtl = chatController;
  const [messages, setMessages] = React.useState(chatCtl.getMessages());
  const [actReq, setActReq] = React.useState(chatCtl.getActionRequest());

  const msgRef = React.useRef<HTMLDivElement>(null);
  const scroll = React.useCallback((): void => {
    if (msgRef.current) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight;

      // msgRef.current.scrollIntoView(true);
      msgRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [msgRef]);
  useEffect(() => {
    console.log("called", messages);
    scroll();
  }, [messages]);
  React.useEffect(() => {
    // console.log("msgRef.current", msgRef.current);
    function handleMassagesChanged(): void {
      setMessages([...chatCtl.getMessages()]);
      scroll();
    }
    function handleActionChanged(): void {
      setActReq(chatCtl.getActionRequest());
      scroll();
    }
    chatCtl.addOnMessagesChanged(handleMassagesChanged);
    chatCtl.addOnActionChanged(handleActionChanged);
  }, [chatCtl, scroll]);

  type CustomComponentType = React.FC<{
    chatController: ChatController;
    actionRequest: ActionRequest;
  }>;
  const CustomComponent = React.useMemo((): CustomComponentType => {
    if (!actReq || actReq.type !== "custom") {
      return null as unknown as CustomComponentType;
    }
    return (actReq as CustomActionRequest)
      .Component as unknown as CustomComponentType;
  }, [actReq]);

  const unknownMsg = {
    type: "text",
    content: "Unknown message.",
    self: false,
  };

  let prevDate = dayjs(0);
  let prevTime = dayjs(0);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        p: 1,
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
        "& > *": {
          maxWidth: "100%",
        },
        "& > * + *": {
          mt: 1,
        },
      }}
    >
      <Box
        sx={{
          flex: "1 1 0%",
          overflowY: "auto",
          // WebkitOverflowScrolling: "touch",
          display: "flex",
          flexDirection: "column",
          "& > *": {
            maxWidth: "100%",
          },
        }}
      >
        {messages.map((msg): React.ReactElement => {
          let showDate = false;
          let showTime = !!chatCtl.getOption().showDateTime;
          if (!!chatCtl.getOption().showDateTime && !msg.deletedAt) {
            const current = dayjs(
              msg.updatedAt ? msg.updatedAt : msg.createdAt
            );

            if (current.format("YYYYMMDD") !== prevDate.format("YYYYMMDD")) {
              showDate = true;
            }
            prevDate = current;

            if (current.diff(prevTime) < 60_000) {
              showTime = false;
            } else {
              prevTime = current;
            }
          }
          if (msg.type === "text" || msg.type === "jsx") {
            return (
              <MuiMessage
                key={messages.indexOf(msg)}
                id={`cu-msg-${messages.indexOf(msg) + 1}`}
                message={msg}
                showDate={showDate}
                showTime={showTime}
              />
            );
          }
          return (
            <MuiMessage
              key={messages.indexOf(msg)}
              id={`cu-msg-${messages.indexOf(msg) + 1}`}
              message={unknownMsg}
              showDate={showDate}
              showTime={showTime}
            />
          );
        })}
        <br />

        <div ref={msgRef} />
      </Box>
      <Divider />
      <Box
        sx={{
          flex: "0 1 auto",
          display: "flex",
          alignContent: "flex-end",
          "& > *": {
            minWidth: 0,
          },
          // borderTop: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        {actReq && actReq.type === "text" && (
          <MuiTextInput
            chatController={chatCtl}
            actionRequest={actReq as TextActionRequest}
          />
        )}
      </Box>
    </Box>
  );
}

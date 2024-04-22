import React, { useState, useEffect } from "react";
import {
  Chat,
  Channel,
  ChannelHeader,
  Thread,
  Window,
  MessageList,
  MessageInput,
  ChannelList,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import { EmojiPicker } from "stream-chat-react/emojis";
import Cookies from "universal-cookie";
import "stream-chat-react/dist/css/v2/index.css";
import "./Chats.css";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

const App = () => {
  const client = StreamChat.getInstance(import.meta.env.VITE_API_KEY);
  const username = cookies.get("username");
  const navigate = useNavigate();
  const token = cookies.get("token");
  const filters = { members: { $in: [username] } };
  const options = { presence: true, state: true };
  const sort = { last_message_at: -1 };

  useEffect(() => {
    if (!token) {
      navigate("/auth");
      return;
    }
  }, []);

  client
    .connectUser(
      {
        id: username,
      },
      token
    )
    .then(() => {
      console.log("chat connected");
    })
    .catch((e) => {
      console.log(e);
    });
  const handleClick = () => {
    navigate("/chats/new");
  };
  return (
    <div className="app-container">
      <Chat client={client} theme="messaging light">
        <div className="channel-list-container">
          <Button
            variant="contained"
            sx={{ marginBottom: "10px", padding: "10px", width: "100%" }}
            onClick={handleClick}
          >
            <AddIcon />
            Create New Channel
          </Button>
          <ChannelList
            sort={sort}
            filters={filters}
            options={options}
            showChannelSearch
          />
        </div>

        <div className="channel-container">
          <Channel EmojiPicker={EmojiPicker}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </div>
      </Chat>
    </div>
  );
};

export default App;

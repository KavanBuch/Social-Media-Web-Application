import React, { useState } from "react";
import {
  AppBar,
  Button,
  TextField,
  Autocomplete,
  Chip,
  Typography,
  Alert,
} from "@mui/material";
import styles from "./styles";
import * as api from "../../api/index";
import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

function CreateChat() {
  const [members, setMembers] = useState([]);
  const [channel, setChannel] = useState("");
  const [member, setMember] = useState("");
  const [error, setError] = useState(undefined);
  const username = cookies.get("username");
  const navigate = useNavigate();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(import.meta.env.VITE_API_KEY);

  const handleDeleteChip = (memberToDelete) => {
    setMembers(
      members.filter((member) => {
        return member != memberToDelete;
      })
    );
  };
  const handleAddChip = (member) => {
    setMembers([...members, member]);
  };
  const handleKeyPress = (e, fromMembers) => {
    if (e.keyCode === 13 && fromMembers) {
      handleAddChip(member);
    }
  };
  const createChannel = async () => {
    if (!channel) {
      setError("Channel name cannot be empty!!");
      return;
    }
    if (!members.length) {
      setError("Please povide members!!");
      return;
    }
    const { data } = await api.userExists(members);
    const success = data.success;
    if (!success) {
      setError("Some members are not valid.Please check the usernames again");
      return;
    }
    setError(undefined);
    members.push(username);
    const newMembers = Array.from(new Set(members));
    console.log(newMembers);
    try {
      await client.connectUser(
        {
          id: username,
        },
        token
      );
      const Channel = client.channel("team", {
        name: channel,
        members: newMembers,
      });
      await Channel.create();
      navigate("/chats");
    } catch (error) {
      setError("Something went wrong!!");
    }
  };
  return (
    <>
      <AppBar
        position="static"
        color="inherit"
        elevation={6}
        sx={styles.appBar}
      >
        <Typography variant="h5">Create A Channel</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          sx={styles.textField}
          name="channel"
          variant="outlined"
          label="Channel Name"
          fullWidth
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
        />
        <Autocomplete
          multiple
          freeSolo
          value={members}
          options={[]}
          renderTags={(value, getMemberProps) =>
            value.map((option, index) => (
              <Chip
                label={option}
                {...getMemberProps({ index })}
                onDelete={() => handleDeleteChip(option)}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              sx={styles.textField}
              {...params}
              value={members}
              variant="outlined"
              label="Add Members"
              placeholder="Type and press enter"
              onChange={(e) => setMember(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, true)}
            />
          )}
        />

        <Button
          sx={styles.button}
          onClick={createChannel}
          variant="contained"
          color="primary"
        >
          Create
        </Button>
      </AppBar>
    </>
  );
}

export default CreateChat;

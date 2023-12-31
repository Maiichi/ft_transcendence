import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import "./List.css";
import { I_User } from "..";
import { Button } from "../../../packages/feat-Account/styles";
import { useAppDispatch } from "../..";
import {
  acceptFriendRequest,
  declineFriendRequest,
} from "../../../packages/feat-Account/components";
import { Avatar } from "@mui/material";
import { purple } from "@mui/material/colors";

interface Props {
  friendRequests: I_User[];
}

export const FriendRequestsNotifications = ({ friendRequests }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleClick = (
    id: number,
    type: "accept" | "decline" | "viewProfile"
  ) => {
    switch (type) {
      case "accept":
        dispatch(acceptFriendRequest(id));
        break;
      case "decline":
        dispatch(declineFriendRequest(id));
        break;
      case "viewProfile":
        navigate(`/account/profile/${id}`);
        break;
      default:
        break;
    }
  };
  return (
    <List>
      {friendRequests.map((item, index) => (
        <ListItem key={index} disablePadding sx={{ pl: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Avatar
              onClick={() => handleClick(item.intraId, "viewProfile")}
              sx={{ width: "30px", height: "30px" }}
              src={item.avatar_url}
            />
            <h5 style={{ color: purple[400] }} className="title">
              {item.userName.slice(0.8)}
            </h5>
          </div>
          <ListItemButton
            className="item"
            onClick={() => handleClick(item.intraId, "viewProfile")}
          ></ListItemButton>

          <ListItemIcon className="icon">
            <CheckIcon
              color="secondary"
              onClick={() => handleClick(item.intraId, "accept")}
            />
          </ListItemIcon>
          <ListItemIcon className="icon">
            <CloseIcon onClick={() => handleClick(item.intraId, "decline")} />
          </ListItemIcon>
        </ListItem>
      ))}
    </List>
  );
};

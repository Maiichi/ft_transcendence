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
        break;

      default:
        break;
    }
  };
  return (
    <List>
      {friendRequests.map((item, index) => (
        <ListItem key={index} disablePadding>
          <>
            <ListItemButton
              className="item"
              onClick={() => handleClick(item.intraId, "accept")}
            >
              <ListItemIcon className="icon">
                <CheckIcon />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton
              className="item"
              onClick={() => handleClick(item.intraId, "decline")}
            >
              <ListItemIcon className="icon">
                <CloseIcon />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton
              className="item"
              onClick={() => handleClick(item.intraId, "viewProfile")}
            >
              <h5 className="title">{item.userName}</h5>
            </ListItemButton>
          </>
        </ListItem>
      ))}
    </List>
  );
};

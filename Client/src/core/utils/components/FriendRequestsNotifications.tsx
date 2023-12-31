
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import "./List.css";
import { I_User } from "..";
import { useAppDispatch } from "../..";
import {
  acceptFriendRequest,
  declineFriendRequest,
} from "../../../packages/feat-Account/components";
import { Avatar } from "@mui/material";
import { purple } from "@mui/material/colors";
import { IconHolder } from "../../../packages/feat-Chat/components/style";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",

        padding: "10px",
      }}
    >
      {friendRequests.map((item, index) => (
        <div
          style={{ display: "flex", alignItems: "center", gap: "15px" }}
          key={index}
        >
          <Avatar
            onClick={() => handleClick(item.intraId, "viewProfile")}
            sx={{ width: "30px", height: "30px" }}
            src={item.avatar_url}
          />

          <h5 style={{ color: purple[400] }} className="title">
            {item.userName.slice(0.8)}
          </h5>

          <IconHolder>
            <CheckIcon
              color="success"
              onClick={() => handleClick(item.intraId, "accept")}
            />
          </IconHolder>
          <IconHolder>
            <CloseIcon
              color="error"
              onClick={() => handleClick(item.intraId, "decline")}
            />
          </IconHolder>
        </div>
      ))}
    </div>
  );
};

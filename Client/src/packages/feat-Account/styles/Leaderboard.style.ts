import styled from "styled-components";
import {
  Avatar as AvatarMui,
  Button as ButtonMui,
  ListItem as ListItemMui,
  List as ListMui,
} from "@mui/material";

/**
 * `NoPlayer`
 */
const NoPlayer = styled.section`
  padding: 10%;
  font-size: large;
  & span {
    color: red;
  }
`;
/**
 * `Players` as  Button Mui element
 */
const Button = styled(ButtonMui)``;
/**
 * `Players` as  Avatar Mui element
 */
const Avatar = styled(AvatarMui)``;
/**
 * `Player` as  ListItem Mui element
 */
const Player = styled(ListItemMui)`
  box-shadow: rgba(0, 0, 0, 0.25) 0px 2.07377px 4.14754px 0px;
  border-radius: 8.295px;
  background-color: antiquewhite;
`;
/**
 * `Players` as  List Mui element
 */
const Players = styled(ListMui)`
  padding: 24px 12px !important;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  /* -webkit-box-align: center; */
  @media (max-width: 426px) {
  }
`;

export { Players, Player, NoPlayer, Avatar, Button };

export {
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Typography,
} from "@mui/material";
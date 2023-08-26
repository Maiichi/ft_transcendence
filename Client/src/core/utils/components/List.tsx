import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useNavigate } from "react-router-dom";

import "./List.css";
interface Menu {
  render: string;
  icon: any;
  redirect: string;
  style?: React.CSSProperties;
  onclick?: () => void;
}
interface Props {
  menu: Menu[];
}

export const ListComponent = ({ menu }: Props) => {
  const navigate = useNavigate();
  return (
    <List>
      {menu.map((item, index) => (
        <ListItem
          key={index}
          disablePadding
          onClick={() =>
            item.onclick ? item.onclick() : navigate(item.redirect)
          }
        >
          <ListItemButton className="item">
            <ListItemIcon className="icon">
              <item.icon style={item.style && item.style} />
            </ListItemIcon>
            <h5 className="title" style={item.style && item.style}>
              {item.render}
            </h5>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

import { useState, useEffect } from "react";

import styled from "styled-components";
import { Typography, PopperPlacementType, Avatar } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {
  Apps as AppsIcon,
  Logout,
  History,
  PermIdentity,
  Settings,
} from "@mui/icons-material";

import {
  Drawer,
  FriendRequestsNotifications,
  ListComponent,
  ListNav,
  PopperComponent,
} from "..";
import { useSize } from "../../hooks";
import { useAppDispatch, useAppSelector } from "../../../redux";
import { setDisplayNavbar } from "../../../CoreSlice";
import { userLogout } from "../../../../packages/feat-Auth/components/authSlice";
import { deepPurple, purple } from "@mui/material/colors";

import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { useAuthentication } from "../../../../packages/feat-Auth/authUtils";

import { useNavigate } from "react-router-dom";
import { getFriendRequests } from "../../../../packages/feat-Account/components";
import { I_User } from "../..";

type Anchor = "top" | "left" | "bottom" | "right";
interface MenuTabs {
  id: string;
  redirect?: string;
  render: JSX.Element;
}

type ActiveTabs = "notif" | "profile" | "search";
const useStyles = makeStyles({
  iconBase: {
    borderRadius: "6px",
    height: "25px",
    transition: "all 0.2s ease-in-out 0s",
    color: "rgb(94, 53, 177)",
    "&:hover": {
      background: "rgb(94, 53, 177)",
      color: "rgb(214, 220, 234)",
    },
  },
  dehazeIcon: {
    borderRadius: "6px",
    height: "25px",
    transition: "all 0.2s ease-in-out 0s",
    background: "rgb(237, 231, 246)",
    color: "rgb(94, 53, 177)",
    "&:hover": {
      background: "rgb(94, 53, 177)",
      color: "rgb(214, 220, 234)",
    },
  },
  "@media (max-width: 768px)": {
    dehazeIcon: {
      // Other styles that apply when the media query matches
    },
  },
});
const Menu = [
  {
    redirect: "/account/profile",
    render: "Profile",
    icon: PermIdentity,
    style: { color: purple[400] },
  },
  {
    redirect: "/gamesHistory",
    render: "matchs History",
    icon: History,
    style: { color: purple[500] },
  },
  {
    redirect: "/account/settings",
    render: "Account Settings",
    icon: Settings,
    style: { color: purple[600] },
  },
];
const ProfilePopper = () => {
  return <ListComponent menu={Menu} />;
};
const NotificationPopper = ({
  friendRequests,
}: {
  friendRequests: I_User[];
}) => {
  return (
    <>
      {friendRequests.length != 0 ? (
        <FriendRequestsNotifications friendRequests={friendRequests} />
      ) : (
        <Typography sx={{ p: 1, color: purple[700] }} variant="body1">
          You don't have any Friend requests
        </Typography>
      )}
    </>
  );
};

export const Header = () => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { isMobile } = useSize();
  const [activeTab, setActiveTab] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<any | null>(null);
  const [placement, setPlacement] = useState<PopperPlacementType>();
  const [ChildPopper, setChildPopper] = useState<JSX.Element>(<></>);
  const [popperStyle, setPopperStyle] = useState<React.CSSProperties>();

  const userAvatar = useAppSelector(
    ({ auth }) => auth.user?.avatar_url ?? null
  );
  const friendRequests: I_User[] = useAppSelector(
    (state) => state.friends.friendRequests
  );

  useEffect(() => {}, [activeTab]);

  const handleClose = (e: any) => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getFriendRequests());
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [isMobile]);
  useEffect(() => {
    activeTab != "search" &&
      document.addEventListener("click", handleClose, true);
    return () => {
      document.removeEventListener("click", handleClose, true);
    };
  }, [activeTab]);

  const popperClick =
    (
      newPlacement: PopperPlacementType,
      childPopper: JSX.Element,
      activeCick: ActiveTabs,
      popperStyle?: React.CSSProperties
    ) =>
    (event: React.MouseEvent<any>) => {
      setPopperStyle(popperStyle);
      setActiveTab(activeCick);
      setChildPopper(childPopper);
      setOpen(true);
      setAnchorEl(event.currentTarget);
      setPlacement(newPlacement);
    };

  const RightMenu: MenuTabs[] = [
    {
      id: "notif",
      render: (
        <IconButton
          onClick={popperClick(
            "bottom-start",
            <NotificationPopper friendRequests={friendRequests} />,
            "notif",
            {
              paddingTop: "24px",
            }
          )}
        >
          <Badge badgeContent={friendRequests.length} color="secondary">
            <NotificationsNoneIcon className={classes.iconBase} />
          </Badge>
        </IconButton>
      ),
    },
    {
      id: "profile",
      render: (
        <Avatar
          id="profile"
          sx={{ bgcolor: deepPurple[500], width: 40, height: 40, ml: 2, mr: 2 }}
          src={userAvatar ?? ""}
          onClick={popperClick("bottom-start", <ProfilePopper />, "profile", {
            paddingTop: "10px",
          })}
        >
          User
        </Avatar>
      ),
    },
  ];

  return (
    <>
      {isMobile && (
        <Drawer
          anchor={"top"}
          state={state}
          children={<ListNav toggleDrawer={toggleDrawer} />}
          toggleDrawer={toggleDrawer}
        />
      )}
      <PopperComponent
        paperStyle={{
          backgroundColor: "rgb(255, 255, 255)",
          color: "rgb(54, 65, 82)",
          borderRadius: "10px",
          overflow: "hidden",
          border: "none rgba(144, 202, 249, 0.145)",
        }}
        popperStyle={popperStyle}
        anchorEl={anchorEl}
        open={open}
        placement={placement}
        ChildComponent={ChildPopper}
      />
      <Root>
        {isMobile ? (
          <>
            <AppsIcon
              className={classes.iconBase}
              onClick={toggleDrawer("top", true)}
            />
          </>
        ) : (
          <>
            <Left>
              <AppsIcon
                className={classes.iconBase}
                onClick={() => dispatch(setDisplayNavbar(false))}
              />
              <>Ping PONG</>
            </Left>
          </>
        )}
        <Right>
          {RightMenu.map((item: MenuTabs) => (
            <div key={item.id}>{item.render}</div>
          ))}
          <Logout
            id="logout"
            className={classes.iconBase}
            onClick={() => {
              dispatch(userLogout());
            }}
          />
        </Right>
      </Root>
    </>
  );
};
const Root = styled.div`
  padding: 5px 10px;
  color: rgb(214, 220, 234);
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;
const Left = styled.div`
  width: 130px;
  display: flex;
  justify-content: space-between;
`;

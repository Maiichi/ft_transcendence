import { useState, useEffect } from "react";

import styled from "styled-components";
import { Typography, PopperPlacementType } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import HomeIcon from "@mui/icons-material/Home";
import DehazeIcon from "@mui/icons-material/Dehaze";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import {
  Drawer,
  ListComponent,
  ListNav,
  PopperComponent,
  SearchComponent,
} from "..";
import { useSize } from "../../hooks";
import { useAppDispatch } from "../../../redux";
import { setDisplayNavbar } from "../../../CoreSlice";
type Anchor = "top" | "left" | "bottom" | "right";
interface MenuTabs {
  id: string;
  redirect?: string;
  render: JSX.Element;
}
interface TabProps {
  isActive: boolean;
}
type ActiveTabs = "notif" | "profile" | "search";
const useStyles = makeStyles({
  iconBase: {
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
    redirect: "/profile",
    render: "Profile",
    icon: PermIdentityIcon,
  },
  {
    redirect: "/profile",
    render: "Account Settings",
    icon: SettingsIcon,
  },
  {
    redirect: "/logout",
    render: "Logout",
    icon: LogoutIcon,
    style: { color: "#f23f3f" },
    onclick: () => console.log("Logout"),
  },
];
const ProfilePopper = () => {
  return <ListComponent menu={Menu} />;
};
const NotificationPopper = () => {
  return <Typography sx={{ p: 2 }}>Notifications Popper.</Typography>;
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

  const handleClose = (e: any) => {
    setOpen(false);
  };
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
        <NotificationsNoneIcon
          id="notif"
          className={classes.iconBase}
          onClick={popperClick(
            "bottom-start",
            <NotificationPopper />,
            "notif",
            {
              paddingTop: "24px",
            }
          )}
        />
      ),
    },
    {
      id: "profile",
      render: (
        <ImgProfile
          id="profile"
          style={{ marginLeft: " 20px" }}
          src="https://cdn-icons-png.flaticon.com/512/4128/4128349.png"
          onClick={popperClick("bottom-start", <ProfilePopper />, "profile", {
            paddingTop: "10px",
          })}
        />
      ),
    },
  ];

  return (
    <>
      {isMobile && (
        <Drawer
          anchor={"left"}
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
            <DehazeIcon
              className={classes.iconBase}
              onClick={toggleDrawer("left", true)}
            />

            <SearchIcon
              className={classes.iconBase}
              style={{ marginLeft: "10px", marginRight: "auto" }}
              onClick={popperClick(
                "bottom",
                <SearchComponent clear={true} setOpen={setOpen} />,
                "search",
                {
                  padding: "5px 10px",
                  marginTop: "-34px!important",
                  background: "#ffffff",
                  width: "-webkit-fill-available",
                }
              )}
            />
          </>
        ) : (
          <>
            <Left>
              <DehazeIcon
                className={classes.iconBase}
                onClick={() => dispatch(setDisplayNavbar(false))}
              />
              <>LOGO</>
            </Left>
            <SearchComponent />
          </>
        )}
        <Right>{RightMenu.map((item: MenuTabs) => item.render)}</Right>
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
  width: 100px;
  display: flex;
  justify-content: space-between;
`;

const ImgProfile = styled.img`
  width: 33px;
  height: 34px;
`;

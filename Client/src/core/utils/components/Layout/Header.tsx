import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Typography, PopperPlacementType } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import DehazeIcon from "@mui/icons-material/Dehaze";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import { Drawer, ListNav, NavBar, PopperComponent, SearchComponent } from "..";
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
    "@media (max-width: 425px)": {
      background: "rgb(94, 53, 177)",
    },
    "  @media (max-width: 768px)": {
      background: "rgb(94, 53, 177)",
    },
  },
});
const ProfilePopper = () => {
  return <Typography sx={{ p: 2 }}>Profile Popper.</Typography>;
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
  console.log("Header");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { isMobile, isTab } = useSize();
  const [activeTab, setActiveTab] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<any | null>(null);
  const [placement, setPlacement] = useState<PopperPlacementType>();
  const [ChildPopper, setChildPopper] = useState<JSX.Element>(<></>);
  const [popperStyle, setPopperStyle] = useState<React.CSSProperties>();
  // const [drawerstate, setDrawerState] = useState({
  //   top: false,
  //   left: false,
  //   bottom: false,
  //   right: false,
  // });
  const handleClose = (e: any) => {
    setOpen(false);
  };
  useEffect(() => {
    setOpen(false);
  }, [isMobile]);
  useEffect(() => {
    console.log("sdq: ", activeTab);
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

  const ProfilePopper = () => {
    return <Typography sx={{ p: 2 }}>Profile Popper.</Typography>;
  };
  const NotificationPopper = () => {
    return <Typography sx={{ p: 2 }}>Notifications Popper.</Typography>;
  };
  const SearchPopper = () => {
    return <Typography sx={{ p: 2 }}>Search Popper.</Typography>;
  };

  const RightMenu: MenuTabs[] = [
    {
      id: "notif",
      render: (
        <NotificationsNoneIcon
          id="notif"
          className={classes.iconBase}
          onClick={popperClick("bottom", <NotificationPopper />, "notif", {
            paddingTop: "10px",
          })}
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
          onClick={popperClick("bottom-end", <ProfilePopper />, "profile", {
            paddingTop: "5px",
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
          borderRadius: "12px",
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
        {!isMobile && (
          <VideogameAssetIcon
            className={classes.iconBase}
            onClick={() => console.log("clicked")}
          />
        )}

        {isMobile ? (
          <DehazeIcon
            className={classes.iconBase}
            onClick={toggleDrawer("left", true)}
          />
        ) : (
          <DehazeIcon
            className={classes.dehazeIcon}
            onClick={() => dispatch(setDisplayNavbar(false))}
          />
        )}
        {isMobile ? (
          <MobileDisplay>
            <SearchIcon
              className={classes.iconBase}
              style={{ marginLeft: "10px" }}
              onClick={popperClick(
                "bottom",
                <SearchComponent clear={true} setOpen={setOpen} />,
                "search",
                {
                  paddingTop: "14px",
                }
              )}
            />
          </MobileDisplay>
        ) : (
          <SearchComponent />
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
const MobileDisplay = styled.div`
  margin-right: auto;
  @media screen and (max-width: 425px) {
  }
  @media screen and (min-width: 425px) and (max-width: 768px) {
  }
`;

const ImgProfile = styled.img`
  width: 33px;
  height: 34px;
`;

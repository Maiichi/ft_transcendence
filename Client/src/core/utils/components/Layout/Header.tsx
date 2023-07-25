import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PopperComponent, SearchComponent } from "..";
import { PopperPlacementType } from "@mui/material/Popper";
import { Typography } from "@mui/material";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import useMediaQuery from "@mui/material/useMediaQuery";
import { makeStyles } from "@material-ui/styles";
import { useSize } from "../../hooks";
import SearchIcon from "@mui/icons-material/Search";
import DehazeIcon from "@mui/icons-material/Dehaze";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
interface MenuTabs {
  id: string;
  redirect?: string;
  render: JSX.Element;
  activeTab: ActiveTabs;
}
interface TabProps {
  isActive: boolean;
}
type ActiveTabs = "notif" | "profile" | "home" | "game" | "test";
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
});
export const Header = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { isMobile, isTab } = useSize();
  console.log(isMobile, isTab);
  const [activeTab, setActiveTab] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<any | null>(null);
  const [placement, setPlacement] = useState<PopperPlacementType>();
  const [ChildPopper, setChildPopper] = useState<JSX.Element>(<></>);
  useEffect(() => {}, [activeTab]);
  const handleClose = (e: any) => {
    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClose, true);

    return () => {
      document.removeEventListener("click", handleClose, true);
    };
  }, []);

  const handleClick =
    (
      newPlacement: PopperPlacementType,
      childPopper: JSX.Element,
      activeCick: ActiveTabs
    ) =>
    (event: React.MouseEvent<any>) => {
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

  const RightMenu: MenuTabs[] = [
    {
      id: "notif",
      activeTab: "notif",
      render: (
        <NotificationsNoneIcon
          id="notif"
          className={classes.iconBase}
          onClick={handleClick("bottom", <NotificationPopper />, "notif")}
        />
      ),
    },
    {
      id: "profile",
      activeTab: "profile",
      render: (
        <ImgProfile
          id="profile"
          style={{ marginLeft: " 20px" }}
          src="https://cdn-icons-png.flaticon.com/512/4128/4128349.png"
          onClick={handleClick("bottom-end", <ProfilePopper />, "profile")}
        />
      ),
    },
  ];
  const LeftMenu: MenuTabs[] = [];

  const TabComponent = (item: MenuTabs) => {
    const tabClick = (item: MenuTabs) => {
      item.activeTab && setActiveTab(item.activeTab);
      item.redirect && navigate(item.redirect);
    };
    return (
      <Tab
        key={item.id}
        isActive={item.activeTab ? activeTab === item.activeTab : true}
        onClick={() => tabClick(item)}
      >
        {item.render}
      </Tab>
    );
  };

  return (
    <Root>
      <PopperComponent
        style={{
          backgroundColor: "rgb(255, 255, 255)",
          color: "rgb(54, 65, 82)",
          borderRadius: "12px",
          overflow: "hidden",
          border: "none rgba(144, 202, 249, 0.145)",
        }}
        anchorEl={anchorEl}
        open={open}
        placement={placement}
        ChildComponent={ChildPopper}
      />
      {!isMobile && (
        <VideogameAssetIcon
          className={classes.iconBase}
          onClick={() => console.log("clicked")}
        />
      )}
      {isMobile ? (
        <RightMo>
          <DehazeIcon
            className={classes.iconBase}
            onClick={() => console.log("clicked")}
          />
          <SearchIcon
            className={classes.iconBase}
            onClick={() => console.log("clicked")}
          />
        </RightMo>
      ) : (
        <SearchComponent />
      )}
      <Right>{RightMenu.map((item: MenuTabs) => item.render)}</Right>
    </Root>
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
const RightMo = styled.div`
  @media screen and (max-width: 425px) {
  }
  @media screen and (min-width: 425px) and (max-width: 768px) {
  }
`;

const Tab = styled.div<TabProps>`
  color: ${(props) =>
    props.isActive ? "rgb(94, 53, 177)" : "rgb(54, 65, 82)"};
  background: rgb(237, 231, 246);
  color: rgb(94, 53, 177);
  letter-spacing: 0em;
  font-weight: 400;
  line-height: 1.5em;
  font-family: Roboto, sans-serif;
  font-size: 0.875rem;
  margin-right: 20px;
`;

const ImgProfile = styled.img`
  width: 33px;
  height: 34px;
`;

import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PopperComponent } from "..";
import { PopperPlacementType } from "@mui/material/Popper";
import { Typography } from "@mui/material";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";

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
export const Header = () => {
  const navigate = useNavigate();
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
        <CircleNotificationsIcon
          id="notif"
          style={{ color: "#f2bb13" }}
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
          style={{}}
          src="https://cdn-icons-png.flaticon.com/512/4128/4128349.png"
          onClick={handleClick("bottom-end", <ProfilePopper />, "profile")}
        />
      ),
    },
  ];
  const LeftMenu: MenuTabs[] = [
    {
      id: "home",
      activeTab: "home",
      redirect: "/",
      render: <p>Home</p>,
    },
    {
      id: "test",
      activeTab: "test",
      redirect: "/test",
      render: <p>Login</p>,
    },
    {
      id: "game",
      activeTab: "game",
      redirect: "/",
      render: <p>Game</p>,
    },
  ];

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
        anchorEl={anchorEl}
        open={open}
        placement={placement}
        ChildComponent={ChildPopper}
      />
      <Left>
        {LeftMenu.map((item: MenuTabs) => (
          <TabComponent {...item} />
        ))}
      </Left>
      <Right>
        {RightMenu.map((item: MenuTabs) => (
          <TabRight>{item.render}</TabRight>
        ))}
      </Right>
    </Root>
  );
};
const Root = styled.div`
padding: 0 10px;
  background-color: rgb(8, 27, 75);
  color: rgb(214, 220, 234);
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  }
`;
const Left = styled.div`
  display: flex;
  align-items: center;
`;
const Right = styled.div`
  display: flex;
  align-items: center;
`;
const Tab = styled.div<TabProps>`
  color: ${(props) => (props.isActive ? "#f2bb13" : "rgb(214, 220, 234)")};
  border-bottom: ${(props) => props.isActive && "2px solid"};
  margin-right: 20px;
  &:hover {
    margin-right: 20px;
    border-bottom: 2px solid;
    color: rgb(242, 187, 19) !important;
  }
`;
const TabRight = styled.div`
  margin-left: 20px;
`;
const ImgProfile = styled.img`
  width: 33px;
  height: 34px;
`;

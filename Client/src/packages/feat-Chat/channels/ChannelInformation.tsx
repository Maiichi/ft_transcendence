import { useState } from "react";
import { ModalComponent, useAppSelector } from "../../../core";
import { I_Room } from "../components/types";

import {
  LogoutRounded,
  MoreHorizOutlined,
  PersonAddAltRounded,
  Settings,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { AddUserToRoomModal } from "./modals/AddUserToRoomModal";
import styled from "styled-components";

export const ChannelInformation = () => {
  const { roomId } = useAppSelector((state) => state.chat.currentConversation);
  const { memberships } = useAppSelector((state) => state.channels);
  const index = memberships.findIndex((item: any) => item.id == roomId);
  const user = useAppSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false);
  const [closeType, setCloseType] = useState<"auto" | "click" | undefined>(
    undefined
  );

  const [ChildModal, setChildModal] = useState<JSX.Element>(<></>);

  const handleClickModal = (
    childModal: JSX.Element,
    closeType?: "auto" | "click"
  ) => {
    setCloseType(closeType);
    setOpen(true);
    setChildModal(childModal);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const ChannelSettings = ({ membership }: { membership: I_Room }) => {
    
    const isOwner = (membership: I_Room, userId: number) => {
      const member = membership.members.find((member) => member.user.intraId === userId);
      return member?.isAdmin ? true : false;
    }
      
      const isChannelOwner: boolean = isOwner(membership, user.intraId);

    let settingsComponent;
    if (isChannelOwner) {
      settingsComponent = (
        <>
          <Settings />
          <PersonAddAltRounded
            sx={{
              cursor: "pointer",
              "&:hover": { backgroundColor: "rgb(245, 246, 247)" },
            }}
            onClick={() => {
              handleClickModal(
                <AddUserToRoomModal handleClose={handleClose} />
              );
            }}
          />
          <LogoutRounded />
        </>
      );
    } else settingsComponent = <LogoutRounded />;

    return <>{settingsComponent}</>;
  };

  return (
    <>
      <ModalComponent
        open={open}
        ChildComponent={ChildModal}
        handleClose={handleClose}
        closeType={closeType}
      />
      <RightSide>
        <ChannelNameHolder>
          <ChannelName>{memberships[index].name}</ChannelName>
          {memberships[index].description}
          <ChannelSettingIcons>
            <ChannelSettings membership={memberships[index]} />
          </ChannelSettingIcons>
        </ChannelNameHolder>
        <div>
          Owner:
          {[1, 2, 3, 4].map((item) => (
            <OwnerDiv>
              <Owner>
                <Avatar></Avatar>
                Name
              </Owner>
              <MoreHorizOutlined></MoreHorizOutlined>
            </OwnerDiv>
          ))}
          <Admins>admin</Admins>
          <Members>member</Members>
        </div>
      </RightSide>
    </>
  );
};
const RightSide = styled.div`
  flex: 2;
  height: 100%;
  /* border-radius: 20px; */
  border-left: 1px solid #d7d7d7;
`;

/** CHANNEL USERS **/

const ChannelNameHolder = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 0.5px solid #d7d7d7;
`;

const ChannelName = styled.h2`
  text-align: center;
`;

const ChannelSettingIcons = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 10px;
`;

const Owner = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Admins = styled.div`
  background-color: blue;
`;

const Members = styled.div`
  background-color: grey;
`;

const OwnerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: rgb(245, 246, 247);
  }
  padding: 5px;
`;

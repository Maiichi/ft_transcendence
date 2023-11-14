import { useEffect, useState } from "react";
import {
  LogoutRounded,
  Person,
  PersonAddAltRounded,
} from "@mui/icons-material";
import Badge from "@mui/material/Badge";

import { I_Room } from "../components/types";
import styled from "styled-components";
import { LeaveRoomModal } from "./modals/leaveChannelModal copy";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ModalComponent, useAppSelector } from "../../../core";
import { UsersRoom } from "./modals/UsersRoomModal";
import { CreateChannelModal } from "./modals/CreateChannelModal";
import { isOwner } from "../components/utils";
import { AddUserToRoomModal } from "./modals/AddUserToRoomModal";

export const ChannelBoxHeader = () => {
  const { roomId } = useAppSelector((state) => state.chat.currentConversation);
  const { memberships } = useAppSelector((state) => state.channels);
  const user = useAppSelector((state) => state.auth.user);

  const index = memberships.findIndex((item: any) => item.id == roomId);
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
  const isChannelOwner = isOwner(memberships[index], user.intraId);

  return (
    <Header>
      <ModalComponent
        open={open}
        ChildComponent={ChildModal}
        handleClose={handleClose}
        closeType={closeType}
      />

      <h4>
        # {memberships[index].name}
        {isChannelOwner && (
          <ArrowDropDownIcon
            onClick={() =>
              handleClickModal(
                <CreateChannelModal
                  handleClose={handleClose}
                  channelConversation={memberships[index]}
                />
              )
            }
          />
        )}
      </h4>
      <IconHolder>
        {isChannelOwner && (
          <ChannelMembers>
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
          </ChannelMembers>
        )}
        <ChannelMembers
          onClick={() =>
            handleClickModal(
              <UsersRoom
                channelConversation={memberships[index]}
                setOpen={setOpen}
              />,
              "auto"
            )
          }
        >
          <Person /> {memberships[index].members.length}
        </ChannelMembers>
        <ChannelMembers>
          <LogoutRounded
            onClick={() =>
              handleClickModal(
                <LeaveRoomModal
                  channelConversation={memberships[index]}
                  handleClose={handleClose}
                />
              )
            }
            style={{ cursor: "pointer" }}
          />
        </ChannelMembers>
      </IconHolder>
    </Header>
  );
};

const IconHolder = styled.div`
  display: flex;
  align-items: center;
`;

const Header = styled.div`
  border-bottom: 1px solid #d7d7d7;
  display: flex;
  justify-content: space-between;
  padding: 0px 10px 0px 10px;
  align-items: center;
`;
const ChannelMembers = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #d7d7d7;
  border-radius: 7px;
  margin: 2px;
  cursor: pointer;
  padding: 5px;
  width: fit-content;
  height: fit-content;
  &:hover {
    background-color: #f1f1f1;
  }
`;

import { useEffect, useState } from "react";

import { Box, Modal } from "@mui/material";
import { LogoutRounded, Person } from "@mui/icons-material";
import { I_Room } from "../../../Types/types";
import styled from "styled-components";
import { LeaveRoomModal } from "../../modals/leaveChannelModal";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ModalComponent, useAppSelector } from "../../../../../core";
import { UsersRoom } from "../../modals/UsersRoomModal";
import { CreateChannelModal } from "../../modals/CreateChannelModal";

export const ChannelBoxHeader = () => {
  const { room } = useAppSelector((state) => state.chat.currentConversation);
  const { memberships } = useAppSelector((state) => state.channels);

  const index = memberships.findIndex((item: any) => item.id == room.id);
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

  return (
    <Header>
      <ModalComponent
        open={open}
        ChildComponent={ChildModal}
        handleClose={handleClose}
        closeType={closeType}
      />
      <h4>
        # {memberships[index].name}{" "}
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
      </h4>
      <IconHolder>
        <ChannelMembers
          onClick={() =>
            handleClickModal(
              <UsersRoom channelConversation={memberships[index]} />,
              "click"
            )
          }
        >
          <Person /> {memberships[index].members.length}
        </ChannelMembers>
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
      </IconHolder>
    </Header>
  );
};

const IconHolder = styled.div`
  display: flex;
  align-items: center;
`;

const ChannelMembers = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #d7d7d7;
  border-radius: 7px;
  margin-right: 10px;
  cursor: pointer;
  padding: 5px;
  &:hover {
    background-color: #f1f1f1;
  }
`;
const Header = styled.div`
  border-bottom: 1px solid #d7d7d7;
  display: flex;
  justify-content: space-between;
  padding: 0px 10px 0px 10px;
  align-items: center;
`;

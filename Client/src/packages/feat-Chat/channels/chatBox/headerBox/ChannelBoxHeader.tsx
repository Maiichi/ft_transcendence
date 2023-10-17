import { useEffect, useState } from "react";
import { LogoutRounded, Person } from "@mui/icons-material";
import { I_Room } from "../../../Types/types";
import styled from "styled-components";
import { LeaveRoomModal } from "../../modals/leaveChannelModal";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ModalComponent } from "../../../../../core";
import { UsersRoom } from "../../modals/UsersRoomModal";
import { CreateChannelModal } from "../../modals/CreateChannelModal";
const UpdateRoomForm = () => {
  return <h2>Update Room</h2>;
};
export const ChannelBoxHeader = (props: { channelConversation: I_Room }) => {
  const { channelConversation } = props;

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
    <>
      <ModalComponent
        open={open}
        ChildComponent={ChildModal}
        handleClose={handleClose}
        closeType={closeType}
      />
      <h4>
        # {channelConversation.name}{" "}
        <ArrowDropDownIcon
          onClick={() =>
            handleClickModal(<CreateChannelModal handleClose={handleClose} channelConversation={channelConversation}/>)
          }
        />
      </h4>
      <IconHolder>
        <ChannelMembers
          onClick={() =>
            handleClickModal(
              <UsersRoom channelConversation={channelConversation} />,
              "click"
            )
          }
        >
          <Person /> {channelConversation.members.length}
        </ChannelMembers>
        <LogoutRounded
          onClick={() =>
            handleClickModal(
              <LeaveRoomModal
                channelConversation={channelConversation}
                handleClose={handleClose}
              />
            )
          }
          style={{ cursor: "pointer" }}
        />
      </IconHolder>
    </>
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

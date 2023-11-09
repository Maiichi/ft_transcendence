import { PersonAddAltRounded } from "@mui/icons-material";
import styled from "styled-components";
import { I_Room } from "../../components/types";

export const UsersRoom = ({
  channelConversation,
}: {
  channelConversation: I_Room;
}) => {
  return (
    <>
      <ModalHeader>
        <h2>Users</h2>
      </ModalHeader>
      <div
        style={{
          overflow: "hidden",
          maxHeight: "400px",
        }}
      >
        <div className="modal-search">{/* <SearchComponent /> */}</div>
        <ModalInviteUser>
          <PersonAddAltRounded fontSize="large" />
          <h4 style={{ marginLeft: "10px" }}>Invite user</h4>
        </ModalInviteUser>
        <UsersModal>
          {channelConversation.members.map((user) => (
            <UserElement key={user.user.intraId}>
              {user.user.userName}
            </UserElement>
          ))}
        </UsersModal>
      </div>
    </>
  );
};

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalInviteUser = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0px 0px 0px;

  &:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
`;

const UsersModal = styled.div`
  overflow-y: scroll;
  max-height: 100%;
  scrollbar-color: red;
`;

const UserElement = styled.p`
  &:hover {
    cursor: pointer;
    background-color: #f1f1f1;
  }
`;

import { useState } from "react";
import { Close, LockSharp, LockOpenSharp } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../../core";
import { createRoom } from "../redux/roomSlice";
import styled from "styled-components";
import { AntSwitch } from "../../components/AntSwitch";
import { Field, Form } from "react-final-form";

export const CreateChannelModal = (props: { handleClose: () => void }) => {
  const { handleClose } = props;
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.auth.user);
  const [activate, setActivate] = useState(true);
  const [roomCreationError, setRoomCreationError] = useState(null);
  const toggleActivate = () => {
    setActivate(!activate);
  };

  const closeModal = () => {
    handleClose();
    if (roomCreationError) setRoomCreationError(null);
  };

  const handleCreateRoom = (values: any) => {
    const roomData = {
      name: values.name,
      ownerId: account.intraId,
      description: values.description,
      type: activate ? "public" : "private",
      password: values.password,
    };
    dispatch(createRoom(roomData));
    handleClose();
  };

  const validate = (value: any) => {
    console.log("validate : ", value);
    const errors = {};

    return errors;
  };
  const fields = [
    {
      name: "name",
      required: true,
      hidden: false,
      label: "Channel name",
      type: "text",
      holder: "new channel",
    },
    {
      name: "description",
      required: false,
      hidden: false,
      label: "Channel Description (optional)",
      type: "text",
      holder: "channel description",
    },
    {
      name: "password",
      required: false,
      hidden: activate,
      label: "Password",
      type: "password",
      holder: "password",
    },
  ];
  return (
    <div>
      <ModalHeader>
        <h2>Create new channel</h2>
        <Close className={"close-button"} onClick={handleClose} />
      </ModalHeader>
      <ModalBody>
        {/* Display the error message here */}
        {/* {roomCreationError && <ErrorMessage>{roomCreationError}</ErrorMessage>} */}
        <Form
          onSubmit={handleCreateRoom}
          validate={validate}
          render={({ handleSubmit, form }) => (
            <form onSubmit={handleSubmit}>
              <>
                {fields.map((item, index) => (
                  <>
                    {item.hidden == false && (
                      <Field key={index} name={item.name}>
                        {({ input, meta }: any) => (
                          <ChannelFieldHolder>
                            {item.label}
                            <FieldInput
                              {...input}
                              type={item.type}
                              placeholder={item.holder}
                              //value={roomName}
                              // onChange={(text) => setRoomName(text.target.value)}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </ChannelFieldHolder>
                        )}
                      </Field>
                    )}
                  </>
                ))}
                <PasswordHeaderHolder>
                  {activate ? (
                    <>
                      <LockOpenSharp />
                      Set Room password
                    </>
                  ) : (
                    <LockSharp />
                  )}
                  <AntSwitch checked={!activate} onChange={toggleActivate} />
                </PasswordHeaderHolder>
              </>
              <ModalFooter>
                <CancelButton onClick={closeModal}>Cancel</CancelButton>
                <CreateButton type="submit">Create</CreateButton>
              </ModalFooter>
            </form>
          )}
        />
      </ModalBody>
    </div>
  );
};

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalBody = styled.div``;

const ErrorMessage = styled.div`
  color: red;
`;

const ChannelFieldHolder = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
`;

const FieldInput = styled.input`
  height: 100%;
  padding: 10px;
  border: 1px solid #d5d0d0;
  border-radius: 5px;
  margin-top: 10px;
  background-color: #f9f9f9;
`;

const PasswordHeaderHolder = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px;
  align-items: baseline;
`;

const ModalFooter = styled.div`
  margin: 25px 0px 0px 0px;
  display: flex;
  justify-content: space-evenly;
`;

const CreateButton = styled.button`
  height: 40px;
  width: 100px;
  border: 10px;
  border-radius: 10px;
  cursor: pointer;
  background-color: rgb(178, 163, 201);
`;

const CancelButton = styled.button`
  height: 40px;
  width: 100px;
  border: 10px;
  border-radius: 10px;
  cursor: pointer;
`;

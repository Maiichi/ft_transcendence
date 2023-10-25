import { useState } from "react";
import { Close, LockSharp, LockOpenSharp } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../../core";
import { createRoom, updateRoom } from "../redux/roomSlice";
import styled from "styled-components";
import { AntSwitch } from "../../components/AntSwitch";
import { Field, Form } from "react-final-form";
import { I_Room } from "../../Types/types";
interface Props {
  handleClose: () => void;
  channelConversation?: I_Room;
}
export const CreateChannelModal = (props: Props) => {
  const { channelConversation, handleClose } = props;
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.auth.user);
  const [activate, setActivate] = useState(
    channelConversation
      ? channelConversation?.type == "public"
        ? true
        : false
      : true
  );
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
      id: channelConversation?.id,
      name: values.name,
      ownerId: account.intraId,
      description: values.description,
      type: activate ? "public" : "private",
      password: values.password,
    };
    if (channelConversation) {
      dispatch(updateRoom(roomData));
    } else dispatch(createRoom(roomData));
    handleClose();
  };
  interface Field {
    name: string;
    value?: string;
    label: string;
    type: string;
    holder: string;
    required: boolean;
    hidden?: boolean;
  }
  const fields: Field[] = [
    {
      name: "name",
      value: channelConversation?.name,
      required: true,
      label: "Channel name",
      type: "text",
      holder: "new channel",
    },
    {
      name: "description",
      value: channelConversation?.name,
      required: false,
      label: "Channel Description (optional)",
      type: "text",
      holder: "channel description",
    },
    {
      name: "password",
      required: !activate,
      hidden: activate,
      label: "Password",
      type: "password",
      holder: "password",
    },
  ];
  const validate = (values: any) => {
    const errors: any = {};
    fields.forEach((field: Field) => {
      if (!Object.keys(values).includes(field.name) && field.required)
        errors[field.name] = "required";
    });
    return errors;
  };
  const title = channelConversation ? "Update Channel" : "Create new channel";
  return (
    <div>
      <ModalHeader>
        <h2>{title}</h2>
        <Close className={"close-button"} onClick={handleClose} />
      </ModalHeader>
      <ModalBody>
        <Form
          onSubmit={handleCreateRoom}
          validate={validate}
          render={({ handleSubmit, form }) => (
            <form onSubmit={handleSubmit}>
              <>
                {fields.map((item: Field, index: number) => (
                  <>
                    {!item.hidden && (
                      <Field
                        key={index}
                        name={item.name}
                        defaultValue={item.value}
                      >
                        {({ input, meta }: any) => {
                          return (
                            <ChannelFieldHolder>
                              {item.label}
                              <FieldInput
                                {...input}
                                type={item.type}
                                placeholder={item.holder}
                              />
                              {meta.error && meta.touched && (
                                <ErrorMessage>{meta.error}</ErrorMessage>
                              )}
                            </ChannelFieldHolder>
                          );
                        }}
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

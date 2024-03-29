import { useState } from "react";
import { Close } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../../core";
import { createRoom, updateRoom } from "../redux/roomSlice";
import styled from "styled-components";
import { Field, Form } from "react-final-form";
import { I_Room } from "../types";
import { FormControl, MenuItem, Select } from "@mui/material";
import { ErrorMessage } from "../style";
interface Props {
  handleClose: () => void;
  channelConversation?: I_Room;
}
interface Field {
  name: string;
  value?: string;
  label: string;
  type: string;
  options?: Array<string>;
  holder: string;
  required?: boolean;
  hidden?: boolean;
  dependencies?: Array<Dependencie>;
  regexPattern?: RegExp;
  errMessage?: string;
}
interface Dependencie {
  field: string;
  value: Array<string>;
  action: string;
}

export const CreateChannelModal = (props: Props) => {
  const { channelConversation, handleClose } = props;
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.auth.user);
  const [roomCreationError, setRoomCreationError] = useState(null);
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
      type: values.type,
      password: values.password,
    };
    if (channelConversation) {
      dispatch(updateRoom(roomData));
    } else dispatch(createRoom(roomData));
    handleClose();
  };

  const fields: Field[] = [
    {
      name: "name",
      value: channelConversation?.name,
      required: true,
      label: "Channel name",
      type: "text",
      holder: "new channel",
      errMessage:
        "The name should contain only 4 to 10 alphanumeric characters.",
      regexPattern: /^[a-zA-Z0-9]{4,10}$/,
    },
    {
      name: "type",
      value: channelConversation?.type,
      required: true,
      label: "Channel Type",
      type: "select",
      options: ["public", "protected", "private"],
      holder: "Channel Type",
    },
    {
      name: "password",
      dependencies: [
        {
          field: "type",
          value: ["protected"],
          action: "required",
        },
        {
          field: "type",
          value: ["public", "private"],
          action: "hidden",
        },
      ],
      label: "Password",
      type: "password",
      holder: "password",
      regexPattern: /^.{4,10}$/,
      errMessage: "Password length should be between 4 and 10 characters.",
    },
  ];
  const initialValues = {
    type: channelConversation ? channelConversation.type : "public",
    name: channelConversation ? channelConversation.name : "",
    description: channelConversation ? channelConversation.description : "",
  };

  const validate = (values: any) => {
    const errors: any = {};

    fields.forEach((field: Field) => {
      const value = values[field.name];
      if (
        (!Object.keys(values).includes(field.name) &&
          (field.required ||
            (field.dependencies &&
              checkRequiredDependencies(values, field.dependencies)))) ||
        (field.required && value == "")
      )
        errors[field.name] = `${field.label} is required`;
      else if (field.regexPattern && value && !field.regexPattern.test(value)) {
        errors[field.name] = field.errMessage || `${field.label} is invalid `;
      }
    });
    return errors;
  };
  const checkHiddenDependencies = (
    values: any,
    dependencies?: Array<Dependencie>
  ) => {
    let shouldHide = true;
    dependencies?.forEach((dependencie) => {
      if (
        dependencie.action == "hidden" &&
        dependencie.value.includes(values[dependencie.field])
      ) {
        shouldHide = false;
      }
    });
    return shouldHide;
  };
  const checkRequiredDependencies = (
    values: any,
    dependencies?: Array<Dependencie>
  ) => {
    let shouldRequired = false;
    dependencies?.forEach((dependencie) => {
      if (
        dependencie.action == "required" &&
        dependencie.value.includes(values[dependencie.field])
      ) {
        shouldRequired = true;
      }
    });
    return shouldRequired;
  };
  const title = channelConversation ? "Update Channel" : "Create new channel";

  return (
    <div>
      <ModalHeader>
        <h2>{title}</h2>
        <Close
          sx={{ "&:hover": { color: "red" } }}
          style={{ cursor: "pointer" }}
          onClick={handleClose}
        />
      </ModalHeader>
      <ModalBody>
        <Form
          onSubmit={handleCreateRoom}
          validate={validate}
          initialValues={initialValues}
          render={({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <>
                {fields.map((item: Field, index: number) => (
                  <Field
                    key={item.name}
                    name={item.name}
                    defaultValue={item.value}
                  >
                    {({ input, meta }: any) => (
                      <>
                        {checkHiddenDependencies(values, item.dependencies) && (
                          <>
                            <ChannelFieldHolder>
                              {item.label}
                              {item.type == "select" && item.options ? (
                                <FormControl fullWidth>
                                  <Select
                                    sx={{
                                      height: "40px !important",
                                      marginTop: "5px",
                                    }}
                                    {...input}
                                    placeholder={item.holder}
                                  >
                                    {item.options?.map((option) => (
                                      <MenuItem value={option} key={option}>
                                        {option}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              ) : (
                                <FieldInput
                                  {...input}
                                  type={item.type}
                                  placeholder={item.holder}
                                />
                              )}
                            </ChannelFieldHolder>
                            {meta.error && meta.touched && (
                              <ErrorMessage>{meta.error}</ErrorMessage>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </Field>
                ))}
              </>
              <ModalFooter>
                <CancelButton onClick={closeModal}>Cancel</CancelButton>
                <CreateButton type="submit">
                  {channelConversation ? "update" : "Create"}
                </CreateButton>
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

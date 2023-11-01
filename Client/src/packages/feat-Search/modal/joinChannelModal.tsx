import { Close } from "@mui/icons-material";
import { Field, Form } from "react-final-form";
import styled from "styled-components";
import { joinRoom } from "../redux/searchSlice";
import { useAppDispatch } from "../../../core";

export const JoinChannelModal = (props: {
  roomId: number;
  handleClose: () => void;
}) => {
  const { handleClose, roomId } = props;

  console.log("JoinChannelModal");
  const dispatch = useAppDispatch();
  const closeModal = () => {
    handleClose();
  };
  const handleJoinPrivateChannel = (values: any) => {
    console.log("handleJoinPrivateChannel");
    const roomInfo = {
      id: roomId,
      password: values.password,
    };
    dispatch(joinRoom(roomInfo));
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!Object.keys(values).includes("password"))
      errors["password"] = "required";
    return errors;
  };

  return (
    <div>
      <ModalHeader>
        <h3>Type the password to join the Channel</h3>
        <Close
          sx={{ "&:hover": { color: "red" } }}
          style={{ cursor: "pointer" }}
          onClick={handleClose}
        />
      </ModalHeader>
      <ModalBody>
        <Form
          onSubmit={handleJoinPrivateChannel}
          validate={validate}
          render={({ handleSubmit, form }) => (
            <form onSubmit={handleSubmit}>
              <Field name="password">
                {({ input, meta }) => {
                  return (
                    <div>
                      <label>Password</label>
                      <input
                        {...input}
                        type="password"
                        placeholder="Password"
                      />
                      {meta.touched && meta.error && <span>{meta.error}</span>}
                    </div>
                  );
                }}
              </Field>
              <CancelButton onClick={closeModal}>Cancel</CancelButton>
              <CreateButton
                onClick={() => {
                  console.log("clicked");
                }}
                type="submit"
              >
                Submit
              </CreateButton>
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

const FieldInput = styled.input`
  height: 100%;
  padding: 10px;
  border: 1px solid #d5d0d0;
  border-radius: 5px;
  margin-top: 10px;
  background-color: #f9f9f9;
`;

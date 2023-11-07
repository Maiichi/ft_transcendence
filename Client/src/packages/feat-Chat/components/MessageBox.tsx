import { convertDateTime } from "./utils";
import styled from "styled-components";

interface Props {
  own: boolean;
  data: {
    sender: {
      intraId: number;
      firstName: string;
      lastName: string;
      userName: string;
      avatar_url: string;
    };
    content: string;
    createdAt: string;
  };
}

export const MessageBox = ({ own, data }: Props) => {
  const Message = own ? MessageBoxOwn : MessageBoxWrapper;

  return (
    <Message key={data.createdAt}>
      <MessageTop>
        {data.sender.avatar_url !== null ? (
          <MessageImg
            src={require(`/app/images_uploads/${data.sender.avatar_url}`)}
            alt=""
          />
        ) : (
          <MessageImg src="" alt="" />
        )}
        <MessageText>{data.content}</MessageText>
      </MessageTop>
      <MessageBottom>{convertDateTime(data.createdAt)}</MessageBottom>
    </Message>
  );
};

const MessageBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageImg = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
  margin: 10px;
`;

const MessageTop = styled.div`
  display: flex;
`;

const MessageText = styled.p`
  padding: 10px;
  border-radius: 20px;
  background-color: rgb(122, 83, 199);
  color: white;
  max-width: 500px;
`;

const MessageBottom = styled.div`
  font-size: 12px;
  text-align: right;
`;

const MessageBoxOwn = styled(MessageBoxWrapper)`
  align-items: flex-end;
`;

const MessageBoxOwnText = styled(MessageText)`
  background-color: lightgray;
  color: black;
`;

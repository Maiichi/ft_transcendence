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
  const MessageContent = own ? MessageBoxOwnText : MessageText;
  const MessageBottom = own ? OwnDate : Date;
  return (
    <Message key={data.createdAt}>
      <MessageTop>
        {data.sender.avatar_url !== null ? (
          <MessageImg src={`${data.sender.avatar_url}`} alt="" />
        ) : (
          <MessageImg src="" alt="" />
        )}
        <MessageContent>{data.content}</MessageContent>
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
  max-width: 600px;
  overflow-wrap: break-word;
  width: max-content;
`;

const OwnDate = styled.div`
  font-size: 12px;
  text-align: right;
`;
const Date = styled.div`
  font-size: 12px;
  text-align: left;
  margin-left: 15px;
`;
const MessageBoxOwn = styled(MessageBoxWrapper)`
  align-items: flex-end;
`;

const MessageBoxOwnText = styled(MessageText)`
  background-color: lightgray;
  color: black;
  overflow-wrap: break-word;
  width: max-content;
  max-width: 600px;
`;

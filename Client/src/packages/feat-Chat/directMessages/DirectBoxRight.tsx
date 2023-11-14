import { Avatar, Divider } from "@mui/material";
import { Block, Gamepad, Person, PersonAddAlt1 } from "@mui/icons-material";
import styled from "styled-components";

export const RightSide = () => {
    return (
      <Root>
        <Header>
            {/* <h3>{directConversation?.participants[0].userName}</h3> */}
            <Avatar
            sx={{height: 200, width: 200}}
            src="https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png" 
            alt="" />
            <StatusHolder>
                <h4 style={{margin: '0px'}}>Not Available</h4>
                <StatusCercle />
            </StatusHolder>      
        </Header>
        <Divider style={{height : '2px', margin : '0px 30px 0px 30px'}} />
        <Body>
            <IconHolder>
                <Person /> 
                <IconText>View Profile</IconText>
            </IconHolder>
            <IconHolder>
                <Gamepad /> 
                <IconText>Invite to game</IconText>
            </IconHolder>
            <IconHolder>
                <PersonAddAlt1 /> 
                {/* <IconText >{directConversation?.id ? 'send Message' : 'Add to friend list'}</IconText> */}
            </IconHolder>
            <IconHolder>
                <Block /> 
                <IconText>Block</IconText>
            </IconHolder>
            
        </Body>
        </Root>
    );
  };
  
const Root = styled.div`
flex : 2;
height: 100%;
/* border-radius: 20px; */
border-left: 1px solid #d7d7d7;
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
`;

const Footer = styled.div``;

const StatusHolder = styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin: 20px;
`;

const StatusCercle = styled.div`
    height: 20px;
    width: 20px;
    background-color: grey;
    border-radius: 20px;
    margin-right: 5px;
`;

const IconHolder = styled.div`
    display: flex;
    margin : 10px;
    align-items: center;
    &:hover {
        cursor: pointer;
        background-color:  #f5f6f7;
        width: calc(90% - 20px);
    }
`;

const IconText = styled.h4`
    margin : 0px 0px 0px 7px;
`;

import { I_DirectConversation } from "../../Types/types";
import './boxHeader.css';

export const DirectBoxHeader = (props: { directConversation: I_DirectConversation }) => {
    const {directConversation} = props;
    console.log("directBoxHeader rendring !")
    return (
        <>
            <h4>{directConversation?.receiver?.userName}</h4>
        </>
    );
}
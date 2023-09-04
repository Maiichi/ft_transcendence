import { Message } from "../../message/Message";

export const ChatBoxBody = () => { 
    return (
        <div className="chatBoxWrapper">
            <div className="chatBoxTop">
                {[1, 2, 3, 4].map((item) => (
                <>
                    {/* <Message own={false} />
                    <Message own /> */}
                </>
                ))}
            </div>
        </div>
    );
}
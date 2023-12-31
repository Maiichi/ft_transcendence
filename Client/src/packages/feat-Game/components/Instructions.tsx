import React from "react";
import styled from "styled-components";

const QuestionMarkIcon = styled.div`
    font-size: 20px; // Adjust size as needed
    cursor: pointer;
    position: relative;
    display: inline-block;
    margin-left: 10px;
    border: 2px solid; // Blue border color
    border-radius: 50%; // Circular border
    width: 30px; // Adjust width as needed
    height: 30px; // Adjust height as needed
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Tooltip = styled.div`
    visibility: hidden;
    width: 360px;
    line-height: 150%;
    background-color: #3b82f6;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 20px;
    position: absolute;
    z-index: 3;
    top: 125%; // Position below the icon
    left: 50%;
    //margin-left: -100px; // Center the tooltip
    opacity: 0;
    transition: opacity 0.3s;
    text-align: left;

    ${QuestionMarkIcon}:hover & {
        visibility: visible;
        opacity: 1;
    }
`;

const Kbd = styled.kbd`
    background-color: #f7f7f7;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-shadow: 0 1px 0 #ccc;
    padding: 2px 4px;
    font-size: 0.85em;
    font-family: Arial, sans-serif;
    color: black;
`;
interface InstructionsProps {
    currentStep: string; // You can replace 'string' with more specific type if needed
}

export const Instructions: React.FC<InstructionsProps> = ({ currentStep }) => {
    const getInstructions = () => {
        switch (currentStep) {
            case "mapSelection":
                return (
                    <>
                        <strong>Here's how you can get started:</strong>
                        <br />
                        <br />- Choose Your Challenge
                        <br />- Make Your Selection: Click on a map to select
                        it. The selected map will be highlighted. <br />- Submit
                        Your Choice: Once you've made your selection, click
                        'Submit' to confirm and proceed to the next step.
                    </>
                );
            case "inviteFriend":
                return (
                    <>
                        <strong>Game Invitation:</strong>
                        <br />
                        <br />- Click the <strong>
                            "Invite a Friend"
                        </strong>{" "}
                        button to select someone from your friend list. They
                        will receive an invitation to join your game.
                        <br />- Alternatively, if you prefer to play right away,
                        select <strong>"Go to Matchmaking"</strong> to find a
                        random opponent.
                    </>
                );
            case "matchLoading":
                return (
                    <>
                        <strong>Finding Your Match...</strong>
                        <br />
                        <br />- Hang tight, this may take just a moment. Get
                        ready to show off your Pong skills!
                        <br />- If you wish to cancel the search, simply click
                        the <strong>'Cancel'</strong> button.
                    </>
                );
            case "game":
                return (
                    <>
                        <strong>Game Controls:</strong>
                        <br />
                        <br />- Use <Kbd>↑</Kbd> to move the paddle up.
                        <br />- Use <Kbd>↓</Kbd> to move the paddle down.
                    </>
                );
            default:
                return "Welcome to the game!";
        }
    };

    return (
        <QuestionMarkIcon>
            ?<Tooltip>{getInstructions()}</Tooltip>
        </QuestionMarkIcon>
    );
};

import styled from "styled-components";
import { GameStepComponentProps } from "../utils/types";
import { ModalComponent, useAppDispatch, useAppSelector } from "../../../core";
import { setGameStep } from "../redux/GameSlice";
import { STEPS } from "../utils/constants";
import { InviteUserToGame } from "./InviteGame";
import { useState } from "react";

const StyledCard = styled.div`
    width: 100%;
    max-width: 32rem;
    margin: 5rem auto 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    background: white;
`;

const StyledCardHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
`;

const StyledCardTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
`;

const StyledCardDescription = styled.p`
    font-size: 1.25rem;
    color: #6b7280;
    margin-top: 0.5rem;
`;

const StyledCardContent = styled.div`
    border-top: 1px solid #e5e7eb;
    padding: 1.5rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const StyledCardFooter = styled.div`
    display: flex;
    justify-content: center;
    padding: 1rem 2rem;
`;

const StyledButton = styled.button`
    width: 100%; // Full width of the container
    padding: 1rem 0; // Vertical padding
    margin: 0.5rem 0; // Margin for top and bottom
    border-radius: 0.25rem; // Slightly rounded corners
    border: none; // No border for the button
    background-color: ${(props) =>
        props.color === "blue" ? "#007bff" : "#28a745"}; // Blue or Green
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${(props) =>
            props.color === "blue"
                ? "#0069d9"
                : "#218838"}; // Darken the color on hover
    }
`;

const BackButton = styled(StyledButton)`
    background: none;
    color: #007bff; // Blue text
    border: 1px solid #007bff; // Blue border
    padding: 0.5rem 1rem; // Reduced padding for smaller button

    &:hover {
        background: #007bff;
        color: white;
    }
`;

const OrSeparatorContainer = styled.div`
    position: relative; // Relative positioning for the container of the separator and "OR" text
    width: 100%; // Full width to center the content
    display: flex;
    align-items: center; // Center "OR" vertically
    justify-content: center; // Center "OR" horizontally
    margin: 2rem 0; // Space above and below the separator
`;

const SeparatorLine = styled.span`
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    width: 100%;
    border-bottom: 1px solid #d1d5db; // Light grey color for the separator line
    z-index: 0; // Ensure it's behind the "OR" text
`;

const OrText = styled.span`
    background-color: white; // Match the card background
    z-index: 1; // Ensure the "OR" text is above the separator line
    padding: 0 0.5rem; // Horizontal padding for the "OR" text
    color: #6c757d; // Grey text
    font-weight: bold;
`;

export const InviteFriend: React.FC<GameStepComponentProps> = ({
    socket,
    onReset,
}) => {
    const gameMode = useAppSelector((state) => state.gameState.gameMode);
    const dispatch = useAppDispatch();

    // properties for modal
    const [open, setOpen] = useState(false);
    const [closeType, setCloseType] = useState<"auto" | "click" | undefined>(
        undefined
    );
    const [ChildModal, setChildModal] = useState<JSX.Element>(<></>);
    const handleClickModal = (
        childModal: JSX.Element,
        closeType?: "auto" | "click"
    ) => {
        setCloseType(closeType);
        setOpen(true);
        setChildModal(childModal);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleInviteSent = () => {
        socket &&
            handleClickModal(
                <InviteUserToGame
                    selectedUser={null}
                    socket={socket}
                    handleClose={handleClose}
                />
            );
    };
    const handleJoinQueue = () => {
        if (socket) {
            socket.emit("join_queue_match", gameMode);
        }
        dispatch(setGameStep(STEPS.WAITING_QUEUE));
    };
    return (
        <>
            <ModalComponent
                open={open}
                ChildComponent={ChildModal}
                handleClose={handleClose}
                closeType={closeType}
            />
            <StyledCard>
                <StyledCardHeader>
                    <StyledCardTitle>Game Invitation</StyledCardTitle>
                    <StyledCardDescription>
                        Choose your next action before the game starts.
                    </StyledCardDescription>
                </StyledCardHeader>
                <StyledCardContent>
                    <StyledButton color="blue" onClick={handleInviteSent}>
                        Invite a Friend
                    </StyledButton>

                    <OrSeparatorContainer>
                        <SeparatorLine />
                        <OrText>OR</OrText>
                    </OrSeparatorContainer>

                    <StyledButton color="green" onClick={handleJoinQueue}>
                        Go to Matchmaking
                    </StyledButton>
                </StyledCardContent>
                <StyledCardFooter>
                    <BackButton onClick={onReset}>
                        Back to Mode selection
                    </BackButton>
                </StyledCardFooter>
            </StyledCard>
        </>
    );
};

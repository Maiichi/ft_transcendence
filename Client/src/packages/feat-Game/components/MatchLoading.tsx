import styled, { keyframes } from "styled-components";
import { GameStepComponentProps } from "../utils/types";
import { useAppDispatch, useAppSelector } from "../../../core";
import { resetGameState } from "../redux/GameSlice";
import { Instructions } from "./Instructions";
import { deepPurple } from "@mui/material/colors";

interface SkeletonProps {
    width?: string;
    rounded?: boolean;
}

interface StyledAvatarProps {
    src: string;
}

// Keyframes for the skeleton loading effect
const loading = keyframes`
  0% { background-color: #f0f0f0; }
  50% { background-color: #e0e0e0; }
  100% { background-color: #f0f0f0; }
`;

const rotateAndPause = keyframes`
  0%, 20%, 100% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(360deg);
  }
`;

const StyledSkeleton = styled.div<SkeletonProps>`
    display: inline-block;
    height: 4rem;
    width: ${({ width }) => width || "4rem"};
    border-radius: ${({ rounded }) => (rounded ? "9999px" : "0.25rem")};
    animation: ${loading} 1.5s ease-in-out infinite;
    background-color: #f0f0f0;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; // Center the content vertically and horizontally
    padding: 20px;

    gap: 20px;
    min-height: 100vh; // Keeps the container at least as tall as the viewport
    box-sizing: border-box; // Include padding in the height calculation

    @media (min-width: 768px) {
        min-height: auto; // Allow the container to shrink for larger screens
        height: auto; // Adjust the height based on the content
        justify-content: flex-start; // Align content to the top
    }
`;

const Title = styled.h1`
    font-size: 1.875rem;
    font-weight: bold;
    text-align: center;
`;

const AvatarContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 2.5rem;
`;

const StyledAvatar = styled.div<StyledAvatarProps>`
    background-color: #d1d5db;
    border-radius: 50%;
    width: 4rem; // Adjust size as needed
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url(${(props) => props.src}) no-repeat center center;
        background-size: cover;
    }
`;

const StyledButton = styled.button`
    margin-top: 2.5rem;
    padding: 0.75rem 2rem;
    border-radius: 9999px;
    border: 2px solid #d1d5db;
    background-color: transparent;
    color: ${deepPurple[900]};
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
    &:hover {
        background-color: ${deepPurple[300]};
        color: white;
    }
`;

const XIcon = styled.svg`
    height: 1.5rem;
    width: 1.5rem;
    color: #6c757d;
    transition: transform 0.3s ease-in-out;
    animation: ${rotateAndPause} 3s ease-in-out infinite;
`;
const TitleContainer = styled.div`
    display: flex;
    justify-content: center; // Center the contents
    gap: 20px;
    align-items: center;
    margin-bottom: 1rem; // Space below the title container
`;

export const MatchLoading: React.FC<GameStepComponentProps> = ({ socket }) => {
    const countdown = useAppSelector((state) => state.game.countdown);
    const avatar_url = useAppSelector((state) => state.auth.user.avatar_url);
    const dispatch = useAppDispatch();
    const handleCancel = () => {
        socket?.emit("cancelGame");
        // onReset();
        dispatch(resetGameState());
    };

    return (
        <ContentContainer>
            <TitleContainer>
                <Instructions currentStep="matchLoading" />
                <Title>
                    {countdown !== null
                        ? `Game starts in ${countdown}`
                        : "Loading your match..."}
                </Title>
            </TitleContainer>

            <AvatarContainer>
                <StyledAvatar src={avatar_url} />
                <XIcon
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                </XIcon>
                <StyledSkeleton rounded />
            </AvatarContainer>
            {countdown === null ? (
                <StyledButton onClick={handleCancel}>Cancel</StyledButton>
            ) : (
                <></>
            )}
        </ContentContainer>
    );
};

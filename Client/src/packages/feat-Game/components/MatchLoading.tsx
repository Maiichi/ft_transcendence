import styled, { keyframes } from "styled-components";
import { GameState, GameStepComponentProps } from "../utils/types";
import { useAppDispatch } from "../../../core";
import { setGameStep } from "../redux/GameSlice";
import { STEPS } from "../utils/constants";
import { useEffect } from "react";

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
    margin-top: 2.5rem;
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
    color: #007bff;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
    &:hover {
        background-color: #007bff;
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

export const MatchLoading: React.FC<GameStepComponentProps> = ({
    socket,
    onReset,
}) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (socket) {
            socket.on("frame", (data) => {
                console.log("frame>>>>", data);
                dispatch(setGameStep(STEPS.GAME_START));
            });
        }
    }, [socket]);

    return (
        <ContentContainer>
            <Title>Loading your match...</Title>
            <AvatarContainer>
                <StyledAvatar src="https://via.placeholder.com/50x50" />
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
            <StyledButton onClick={onReset}>Cancel</StyledButton>
        </ContentContainer>
    );
};

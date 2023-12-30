import styled from "styled-components";
import { GameStepComponentProps } from "../utils/types";
import { useState } from "react";
import { MODES, STEPS } from "../utils/constants";
import { useAppDispatch } from "../../../core";
import { setGameMode, setGameStep } from "../redux/GameSlice";
import dualMapImage from "../images/DUAL_MAP.jpeg";
import tripleMapImage from "../images/TRIPLE_MAP.jpeg";

const MAPS = [
    {
        id: MODES.DUAL,
        title: "Dual game",
        description: "Dual Game describe the famous pong game (EASY)",
        imageUrl: dualMapImage,
    },
    {
        id: MODES.TRIPLE,
        title: "Messy jungle",
        description: "Messy jungle it's a game that has a midlle paddle (HARD)",
        imageUrl: tripleMapImage,
    },
];

const MainContainer = styled.main`
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
    font-size: 2rem; // Tailwind's text-4xl
    font-weight: bold; // Tailwind's font-bold
    text-align: center;
    flex-grow: 1; // Title takes up maximum space
`;

const CardsContainer = styled.div`
    display: flex;
    justify-content: center; // Center cards horizontally
    flex-wrap: wrap;
    gap: 20px;
    max-width: 1200px;
    width: 100%;
    margin: auto; // Center the cards container in the main container
`;

type CardProps = {
    isSelected: boolean;
};
const Card = styled.div<CardProps>`
    background: #fdfdfd; // Slightly off-white background
    border: ${(props) =>
        `3px solid ${props.isSelected ? "#60a5fa" : "transparent"}`};
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); // Enhanced box-shadow for depth
    border-radius: 12px;
    padding: 1.5rem;
    transition: box-shadow 0.3s, transform 0.3s;
    flex: 1 0 auto;
    min-width: 250px; // Minimum width before the card will wrap
    display: flex;
    flex-direction: column;
    cursor: pointer;
    box-sizing: border-box; // Include padding and border in the width

    &:hover {
        border-color: #60a5fa;
        transform: translateY(-5px);
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 768px) {
        flex-basis: 100%; // Cards take full width on smaller screens
        max-width: 100%;
        margin-bottom: 20px;
        padding: 1rem; // Adjust padding for smaller screens
    }
`;

const CardTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
`;

const CardDescription = styled.p`
    color: #6b7280;
`;

const ImagePlaceholder = styled.div`
    width: 100%;
    padding-top: 56.25%; // Aspect ratio of 16:9
    background: #e2e8f0; // Tailwind's gray-200 as a placeholder color
    border-radius: 8px; // Rounded corners for the placeholder
`;

const CardImage = styled.img`
    width: 100%;
    height: auto; // Maintain aspect ratio
    border-radius: 8px; // Rounded corners for the image
    margin-top: 1rem; // Space between the description and the image
`;

const SubmitButton = styled.button`
    background-color: #3b82f6; // Tailwind's bg-blue-500
    color: white; // Tailwind's text-white
    padding: 0.75rem 1.5rem; // Tailwind's py-3 px-6
    border-radius: 0.375rem; // Tailwind's rounded-md
    font-size: 1rem; // Tailwind's text-lg
    font-weight: 600; // Tailwind's font-semibold
    margin-top: 2rem; // Space between cards and button
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #2563eb; // Tailwind's bg-blue-600 for hover effect
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const TitleContainer = styled.div`
    display: flex;
    justify-content: center; // Center the contents
    align-items: center;
    width: 100%;
    margin-bottom: 1rem; // Space below the title container
`;

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
    width: 200px;
    background-color: #3b82f6;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 20px;
    position: absolute;
    z-index: 1;
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

export const MapSelection: React.FC<GameStepComponentProps> = () => {
    const dispatch = useAppDispatch();
    const [selectedMapId, setSelectedMapId] = useState<string>(MODES.DUAL);

    const handleCardClick = (mapId: string) => {
        setSelectedMapId(mapId);
        dispatch(setGameMode(mapId));
    };

    const handleMapSelected = () => {
        dispatch(setGameStep(STEPS.INVITE_FRIEND));
    };

    return (
        <MainContainer>
            <TitleContainer>
                <QuestionMarkIcon>
                    ?
                    <Tooltip>
                        Game Instructions:
                        <br />
                        <br />
                        - Select a map <br />
                        - Invite a friend or join the queue <br />- Enjoy the
                        game!
                    </Tooltip>
                </QuestionMarkIcon>
                <Title>Select Your Map</Title>
            </TitleContainer>
            <CardsContainer>
                {MAPS.map((element) => (
                    <Card
                        key={element.id}
                        onClick={() => handleCardClick(element.id)}
                        isSelected={element.id === selectedMapId}
                    >
                        <CardTitle>{element.title}</CardTitle>
                        <CardDescription>{element.description}</CardDescription>
                        <CardImage src={element.imageUrl} alt={element.title} />
                    </Card>
                ))}
            </CardsContainer>
            <ButtonContainer>
                <SubmitButton onClick={handleMapSelected}>Submit</SubmitButton>
            </ButtonContainer>
        </MainContainer>
    );
};

import { makeStyles } from "@material-ui/styles";
import styled from "styled-components";

export const useStyles = makeStyles({
  iconBase: {
    borderRadius: "6px",
    height: "25px",
    transition: "all 0.2s ease-in-out 0s",
    background: "rgb(237, 231, 246)",
    color: "rgb(94, 53, 177)",
    "&:hover": {
      background: "rgb(94, 53, 177)",
      color: "rgb(214, 220, 234)",
    },
  },
  dehazeIcon: {
    borderRadius: "6px",
    height: "25px",
    transition: "all 0.2s ease-in-out 0s",
    background: "rgb(237, 231, 246)",
    color: "rgb(94, 53, 177)",
    "&:hover": {
      background: "rgb(94, 53, 177)",
      color: "rgb(214, 220, 234)",
    },
  },
  "@media (max-width: 768px)": {
    dehazeIcon: {
      // Other styles that apply when the media query matches
    },
  },
});

export const IconHolder = styled.div`
  display: flex;
  margin: 10px 0px 10px 0px;
  gap: 5px;
  cursor: pointer;
  &:hover {
    background-color: rgb(245, 246, 247);
  }
`;
export const RightSide = styled.div`
  display: flex;
  padding: 16px;
  width: 160px;
  flex-direction: column;
  gap: 16px;
  border-left: 1px solid rgb(215, 215, 215);
`;
export const NotFound = styled.h4`
  margin: 0px;
  padding: 5px 0;
  text-align: center;
  font-weight: 200;
`;

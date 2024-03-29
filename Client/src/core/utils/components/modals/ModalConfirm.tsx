import { Button } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import styled from "styled-components";

export const ModalConfirm = (props: {
  title: string;
  subtitle?: string;
  closeTitle?: string;
  confirmTitle?: string;
  handleClose: () => void;
  handleClick: () => void;
}) => {
  const { title, subtitle, handleClose, handleClick, closeTitle,confirmTitle  } = props;
  return (
    <>
      <ModalHeader>
        <Title>{title}</Title>
        {subtitle && <Subtitle> {subtitle}</Subtitle>}
      </ModalHeader>
      <ModalFooter>
        <Button
          variant="outlined"
          sx={{
            color: deepPurple[900],
            background:
             deepPurple[100],
          }}
          onClick={handleClose}
        >
          {closeTitle ? closeTitle : 'Cancel'}
        </Button>
        <Button  sx={{
            color: deepPurple[100],
            background:
            deepPurple[700],
          }} variant="contained" color="error" onClick={handleClick}>
            {confirmTitle ? confirmTitle : 'Confirm'}
        </Button>
      </ModalFooter>
    </>
  );
};
const ModalHeader = styled.div`
  text-align: center;
`;
const ModalFooter = styled.div`
  margin: 25px 0px 0px 0px;
  display: flex;
  justify-content: space-evenly;
`;
const Subtitle = styled.p`
  font-size: 12pt;
  font-weight: 200;
  margin: 0 0 9pt 0;
`;
const Title = styled.h3`
  font-family: "Open Sans";
  font-size: 14pt;
  line-height: 18pt;

  font-weight: 500;
  margin: 0px 0px 9pt;
`;

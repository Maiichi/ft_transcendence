import { SportsCricket } from "@mui/icons-material";
import { Button } from "../../styles";

function SendGameRequist({ userName }: { userName: string }) {
  const sendGameRequist = () => "";
  return (
    <Button onClick={() => sendGameRequist()}>
      <SportsCricket />
    </Button>
  );
}

export default SendGameRequist;

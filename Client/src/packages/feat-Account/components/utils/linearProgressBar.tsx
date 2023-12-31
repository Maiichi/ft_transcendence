import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const LinearDeterminate = ({ progress = 0 }) => {
  return (
    <Box sx={{ width: "100%", mt: 2, mb: 1 }}>
      <LinearProgress
        color="secondary"
        variant="determinate"
        sx={{ borderRadius: "10px", m: "0 2px", height: "10px" }}
        value={progress}
      />
    </Box>
  );
};

export default LinearDeterminate;

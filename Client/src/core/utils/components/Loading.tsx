import { Skeleton, Typography } from "@mui/material";

const Loading = () => (
  <>
    {[1, 2, 3, 4].map(() => (
      <>
        <Typography variant="h1">
          <Skeleton />
        </Typography>

        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </>
    ))}
  </>
);

export default Loading;
export { Loading };

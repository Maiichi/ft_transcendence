import { Skeleton, Typography } from "@mui/material";

const Loading = () => (
  <>
    {[1, 2, 3, 4].map((index) => (
      <div key={index}>
        <Typography variant="h1">
          <Skeleton />
        </Typography>

        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </div>
    ))}
  </>
);

export default Loading;
export { Loading };

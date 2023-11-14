import styled, { keyframes } from "styled-components";
import { Typography } from "@mui/material";

/**
 * `as Typography from mui`
 */
const Text = styled(Typography)<{}>``;
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
`;
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 3s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;
const H5 = styled.h5``;
/**
 * `Title` as Typography Mui element // now as section
 */
const Title = styled.section`
  padding: 30px 0 10px 0;
  text-align: center;
  font-family: "Plus Jakarta Sans", sans-serif;
  letter-spacing: 10px;
  font-weight: 700;
  line-height: 1.2;
  font-size: 2rem;
  border-top: 1px solid;
`;
/**
 *  `styled component Root`
 */
const Root = styled.div<{ $primary?: boolean }>`
  background-color: "inherits";
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

export { Root, Title, H5, Rotate, Text };

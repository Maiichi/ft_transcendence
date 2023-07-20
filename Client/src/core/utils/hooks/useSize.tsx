import { useMediaQuery } from "@mui/material";

export const useSize = () => {
  const isMobile = useMediaQuery("(max-width:425px)");
  const isTab = useMediaQuery("(max-width:768px)");
  return { isMobile, isTab };
};

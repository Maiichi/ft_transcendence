import { useMediaQuery } from "@mui/material";

export const useSize = () => {
  const isMobile = useMediaQuery("(max-width:426px)");
  const isTab = useMediaQuery("(max-width:768px)");
  return { isMobile, isTab };
};

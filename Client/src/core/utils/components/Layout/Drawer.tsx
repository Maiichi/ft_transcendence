import * as React from "react";

import SwipeableDrawer from "@mui/material/SwipeableDrawer";

type Anchor = "top" | "left" | "bottom" | "right";

interface Props {
  anchor: Anchor;
  state: any;
  children: any;
  toggleDrawer: any;
}
export const Drawer = (props: Props) => {
  const { anchor, state, children, toggleDrawer } = props;

  return (
    <div>
      <React.Fragment key={anchor}>
        <SwipeableDrawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
          onOpen={toggleDrawer(anchor, true)}
        >
          {children}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};

import { I_DirectConversation } from "../components/types";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { useSize } from "../../../core/utils/hooks";
import { setDiscussionsDisplay } from "../components/chatSlice";
import { useAppDispatch } from "../../../core";
import { useStyles } from "../components/style";
import { setDisplayUserActions } from "../../../core/CoreSlice";

export const DirectBoxHeader = (props: {
  directConversation: I_DirectConversation;
}) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { isMobile } = useSize();

  const { directConversation } = props;
  console.log("directBoxHeader rendring !");
  return (
    <>
      {isMobile && (
        <DehazeIcon
          className={classes.iconBase}
          onClick={() => {
            dispatch(setDiscussionsDisplay(true));
          }}
        />
      )}
      <h4>{directConversation?.receiver?.firstName} {directConversation?.receiver?.lastName}</h4>
      <DehazeIcon
          className={classes.iconBase}
          onClick={() => {
            dispatch(setDisplayUserActions(true))
          }}
      />
    </>
  );
};

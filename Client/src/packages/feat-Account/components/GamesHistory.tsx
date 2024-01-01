import { useNavigate, useSearchParams } from "react-router-dom";
import { Loading, useAppDispatch, useAppSelector } from "../../../core";
import { Fragment, useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Collapse,
  IconButton,
  Typography,
  TableContainer,
  Avatar,
  Grid,
} from "@mui/material";
import { GameslogType, MatchHistoryType, getMatchHistory } from ".";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { Container } from "../styles";
import { useSize } from "../../../core/utils/hooks";
import { convertDateTime } from "../../feat-Chat/components/utils";

const GamesHistory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const { isMobile } = useSize();

  const gidPath = searchParams.get("uid");
  const oId: number = useAppSelector((state) => state.auth.user.intraId);
  const gid: number =
    gidPath && /^[0-9]+$/.test(gidPath) ? parseInt(gidPath, 10) : oId;
  const isOwner: boolean = gid === oId;

  const matchs: GameslogType = useAppSelector(
    (state) => state.profile.matchs.matchsHistory
  );
  const isLoading = useAppSelector((state) => state.profile.matchs.isLoading);

  useEffect(() => {
    dispatch(getMatchHistory({ userID: gid, primary: false }));
    isOwner && navigate("/gamesHistory", { replace: true });
  }, []);

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">palyer1</TableCell>
                <TableCell />
                <TableCell align="center">Score</TableCell>
                <TableCell />
                <TableCell align="center">player2</TableCell>
                {!isMobile && <TableCell />}
              </TableRow>
            </TableHead>
            <TableBody>
              {matchs?.map((match, index) => (
                <Row key={`match${index}`} match={match} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

function Row(props: { match: MatchHistoryType }) {
  const { match } = props;
  const [open, setOpen] = useState(false);
  const { isMobile, isTab } = useSize();
  if (match.Players.length !== 2) return null; /// never applied
  function GridContainerPlayer({ left = false }) {
    const child = (
      <>
        <Grid item xs={3}>
          <Avatar alt="pop" src={match.Players[left ? 1 : 0].avatar_url} />
        </Grid>
        <Grid item xs={3}>
          <Typography textAlign={isTab ? "start" : "center"}>
            {match.Players[left ? 1 : 0].userName.slice(0, 8)}
          </Typography>
        </Grid>
      </>
    );
    return (
      <>
        {isTab ? (
          <Grid sx={{ gap: "10%" }}>{child}</Grid>
        ) : (
          <Grid
            container
            spacing={3}
            sx={{ gap: "10%" }}
            direction={left ? "row" : "row-reverse"}
          >
            {child}
          </Grid>
        )}
      </>
    );
  }
  return (
    <Fragment>
      <TableRow
        onClick={() => (isMobile ? setOpen(!open) : null)}
        sx={{ "& > *": { borderBottom: "unset" }, overflow: "scroll" }}
      >
        <TableCell component="th" scope="row">
          <GridContainerPlayer left />
        </TableCell>
        <TableCell align="right" padding={"none"}>
          {match.Players[1].score}
        </TableCell>
        <TableCell align="center">{":"}</TableCell>
        <TableCell align="left">{match.Players[0].score}</TableCell>
        <TableCell align="center">
          <GridContainerPlayer />
        </TableCell>
        {!isMobile && (
          <TableCell align="right">
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell sx={{ p: 0 }} colSpan={6}>
          <Collapse in={open} unmountOnExit sx={{}}>
            <Typography
              variant="body1"
              sx={{ textAlign: "center", width: "70%", pl: "7%" }}
            >
              {`At ${convertDateTime(match.createdAt)}`}
              <br />
              {`${match.Players[0].userName.slice(0,8)} play with ${match.Players[1].userName.slice(0,8)}`}
              <br /> {` on a ${match.type} match!`}
            </Typography>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default GamesHistory;
export { GamesHistory };

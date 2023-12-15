import { useNavigate, useSearchParams } from "react-router-dom";
import { Loading, useAppDispatch, useAppSelector } from "../../core";
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
  Alert,
  AlertColor,
} from "@mui/material";
import { GameslogType, MatchHistoryType, getMatchHistory } from "./components";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { Container } from "./styles";
import { useSize } from "../../core/utils/hooks";

// TODO: not all suppoerted to see the history of other
// must be friend, other ways you are able to show last n=5 games
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
    // setSearchParams({ uid: 'newValue' });
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
                {isMobile || <TableCell />}
              </TableRow>
            </TableHead>
            <TableBody>
              {matchs?.map((match) => (
                <Row match={match} />
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
  const isMobile = useSize().isMobile;

  function GridContainerPlayer({ you = false }) {
    return (
      <Grid
        container={!isMobile}
        spacing={3}
        sx={{ gap: "10%" }}
        direction={you ? "row" : "row-reverse"}
      >
        <Grid item xs={3} md={2}>
          <Avatar alt="pop" src={match.pic} />
        </Grid>
        <Grid item xs={3} md={4}>
          <Typography textAlign={"center"}>
            {you ? "yoou" : match.name.slice(0.8)}
          </Typography>
        </Grid>
      </Grid>
    );
  }
  function JsxResult() {
    const resultmsg = match.result
      ? match.result === -1
        ? `A valiant effort, but ${match.name} claimed victory over you on `
        : `Victory is yours! You conquered ${match.name} on `
      : `Neither victory nor defeat! The match with ${match.name} on `; // resulted in a tie`}

    return (
      <>
        {resultmsg} <Typography variant="h6">{match.time}</Typography>{" "}
        {match.result ? null : "resulted in a tie"}
      </>
    );
  }
  function getResultcolor(): AlertColor {
    return match.result ? (match.result === -1 ? "error" : "success") : "info";
  }

  return (
    <Fragment>
      <TableRow
        onClick={() => (isMobile ? setOpen(!open) : null)}
        sx={{ "& > *": { borderBottom: "unset" }, overflow: "scroll" }}
      >
        <TableCell component="th" scope="row">
          <GridContainerPlayer you />
        </TableCell>
        <TableCell align="right" padding={"none"}>
          {match.gain}
        </TableCell>
        <TableCell align="center">{":"}</TableCell>
        <TableCell align="left">{match.nogain}</TableCell>
        <TableCell align="center">
          <GridContainerPlayer />
        </TableCell>
        {isMobile || (
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
            <Alert severity={getResultcolor()} color={getResultcolor()}>
              <JsxResult />
            </Alert>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default GamesHistory;
export { GamesHistory };

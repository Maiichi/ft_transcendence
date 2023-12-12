import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../core";
import { Fragment, useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Collapse,
  IconButton,
  Typography,
  TableContainer,
  Avatar,
  Button,
  Tooltip,
  Zoom,
  Rating,
  Grid,
  Alert,
} from "@mui/material";
import { GameslogType, MatchHistoryType } from "./components";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { Container } from "./styles";
import { useSize } from "../../core/utils/hooks";
import { styled } from "@mui/material/styles";

// TODO: not all suppoerted to see the history of other
// must be friend, other ways you are able to show last n=5 games
const GamesHistory = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const gidPath = searchParams.get("uid");
  const oId: number = useAppSelector((state) => state.auth.user.intraId);

  const matchs: GameslogType = Object.values(
    require("./static-data/MatchesHistory.json").matchs
  );
  const gid: number =
    gidPath && /^[0-9]+$/.test(gidPath) ? parseInt(gidPath, 10) : oId;
  const isOwner: boolean = gid === oId;

  useEffect(() => {
    isOwner && navigate("/gamesHistory", { replace: true });
    // setSearchParams({ uid: 'newValue' });
  }, []);

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell />
            <TableCell align="left">palyer1</TableCell>
            <TableCell align="center">Score</TableCell>
            <TableCell align="right">player2</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
            {matchs.map((mathc) => (
              <Row row={mathc} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

function Row(props: { row: MatchHistoryType }) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const isMobile = useSize().isMobile;

  row.result = row.gain < row.nogain || (row.gain > row.nogain ? -1 : false);
  return (
    <Fragment>
      <TableRow
        onClick={() => (isMobile ? setOpen(!open) : null)}
        sx={{ "& > *": { borderBottom: "unset" } }}
      >
        <TableCell component="th" scope="row" >
          <Grid container={!isMobile} spacing={3} sx={{}}>
            <Grid item xs={3} md={2}>
              <Avatar alt="pop" src={row.pic} />
            </Grid>
            <Grid item xs={3} md={4}>
              <Typography>{row.name}</Typography>
            </Grid>
          </Grid>
        </TableCell>
        <TableCell align="right">{row.gain}</TableCell>
        <TableCell align="center">{":"}</TableCell>
        <TableCell align="left">{row.nogain}</TableCell>
        <TableCell align="right">
          <Grid container={!isMobile} spacing={3} direction="row-reverse">
            <Grid item xs={3} md={2}>
              <Avatar alt="pop" src={row.pic} />
            </Grid>
            <Grid item xs={3} md={4}>
              <Typography>{"youu"}</Typography>
            </Grid>
          </Grid>
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
            <Table size="medium" sx={{ pb: 1, pt: 1 }}>
              <TableHead hidden></TableHead>
              <TableBody>
                <Alert
                  severity={
                    row.result
                      ? row.result === -1
                        ? "error"
                        : "success"
                      : "warning"
                  }
                  color={
                    row.result
                      ? row.result === -1
                        ? "error"
                        : "success"
                      : "info"
                  }
                >
                  {row.result
                    ? row.result === -1
                      ? `A valiant effort, but ${row.name} claimed victory over you on ${row.time}`
                      : `Victory is yours! You conquered ${row.name} on ${row.time}`
                    : `Neither victory nor defeat! The match with ${row.name} on ${row.time} resulted in a tie`}
                </Alert>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default GamesHistory;
export { GamesHistory };

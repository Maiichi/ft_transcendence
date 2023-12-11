import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {  useAppSelector } from "../../core";
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
} from "@mui/material";
import { GameslogType, MatchHistoryType } from "./components";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { Container } from "./styles";
import { useSize } from "../../core/utils/hooks";
import { styled } from "@mui/material/styles";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

// TODO: not all suppoerted to see the history of other
// must be friend, other ways you are able to show last n=5 games
const GamesHistory = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const gidPath = searchParams.get("uid");
  const oId: number = useAppSelector((state) => state.auth.user.intraId);

  const gid: number =
    gidPath && /^[0-9]+$/.test(gidPath) ? parseInt(gidPath, 10) : oId;
  const isOwner: boolean = gid === oId;

  useEffect(() => {
    isOwner && navigate("/gamesHistory", { replace: true });
    // setSearchParams({ uid: 'newValue' });
  }, []);

  return <CollapsibleTable />;
  // return (
  //   <>
  //     <Relationship elseId={gid} user={oId} relation={"friend"}>
  //     </Relationship>
  //   </>
  // );
};
const matchs: GameslogType = Object.values(
  require("./static-data/MatchesHistory.json").matchs
);

function Row(props: { row: MatchHistoryType }) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const isMobile = useSize().isMobile;

  return (
    <Fragment>
      <TableRow
        onClick={() => (isMobile ? setOpen(!open) : null)}
        sx={{ "& > *": { borderBottom: "unset" } }}
      >
        <TableCell component="th" scope="row">
          <Tooltip
            sx={{ borderRadius: "50%" }}
            TransitionComponent={Zoom}
            title={<Avatar alt="pop" src={row.pic} />}
          >
            <p>{row.name}</p>
          </Tooltip>
        </TableCell>
        <TableCell align="right">{row.gain}</TableCell>
        <TableCell align="center">{":"}</TableCell>
        <TableCell align="left">{row.nogain}</TableCell>
        <TableCell align="right">
          <Tooltip
            TransitionComponent={Zoom}
            title={<Avatar alt="pop" src={row.pic} />}
          >
            <p>{"youu"}</p>
          </Tooltip>
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
        <TableCell sx={{ pb: 0, pt: 0 }} colSpan={6}>
          <Collapse in={open} unmountOnExit>
            <Table size="medium">
              <TableHead hidden></TableHead>
              <TableBody>
                <Div>
                  {row.gain > row.nogain
                    ? "you win"
                    : row.gain === row.nogain
                    ? "eq"
                    : "you lost"}
                  {` on `}
                  {row.time}
                </Div>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

function CollapsibleTable() {
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {/* <TableRow>
              <TableCell />
              <TableCell>palyer1</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">player2</TableCell>
            </TableRow> */}
          </TableHead>
          <TableBody>
            {matchs.map((mathc) => (
              <Row row={mathc}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
export default GamesHistory;
export { GamesHistory };

import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../core";
import { useEffect } from "react";

// TODO: not all suppoerted to see the history of other
// must be frind, other ways you are able to show last n=5 games
const GamesHistory = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const gidPath = searchParams.get("uid");
  const oid: number = useAppSelector((state) => state.auth.user.intraId);

  const gid: number =
    gidPath && /^[0-9]+$/.test(gidPath) ? parseInt(gidPath, 10) : oid;
  const isOwner: boolean = gid === oid;

  useEffect(() => {
    isOwner && navigate("/gamesHistory", { replace: true });
    // setSearchParams({ uid: 'newValue' });
  }, []);

  return (
    <>
      <div>GamesHistory {` =>  ${gid}`}</div>
    </>
  );
};

export default GamesHistory;
export { GamesHistory };

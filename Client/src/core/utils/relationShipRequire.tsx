import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import { getUserFriends } from "../../packages/feat-Chat/channels/redux/friendThunk";
import { getFriends } from "../../packages/feat-Chat/channels/redux/friendSlice";

type RelationShip =  'friend' | 'blocked' | 'notfriend' | 'requested'| 'requester' | 'self'

interface UsersId {
  elseId: number;
  children: JSX.Element;
  relation?: RelationShip;
  user?: number;
}

const Relationship: (props: UsersId) => JSX.Element = ({
  elseId,
  relation,
  children,
  user,
}: UsersId) => {
  const dispatch = useAppDispatch();
//   const oId = useAppSelector((state) => state.auth.user.intraId);
//   const friends = useAppSelector((state) => state.friends);

//   useEffect(() => {
//     dispatch(getUserFriends());
//   }, []);

//   console.log(friends);
  return children;
};

//   export const isFriend = (props: UsersId) =>
//     userRelationship(props) === "friend";
/**
 * This suggests that the user has sent a friend request to someone else.
 **/
//   export const isRequested = (props: UsersId) =>
//     userRelationship(props) === "requested";
/**
 * This suggests that the user has received a friend request from someone else.
 **/
//   export const isRequester = (props: UsersId) =>
//     userRelationship(props) === "requester";

export default RelationShip;
export { Relationship };

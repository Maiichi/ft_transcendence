import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import { getUserFriends } from "../../packages/feat-Chat/components/redux/friendThunk";
import { Loading } from "./components";
import { Button } from "@mui/material";
import { userType } from "../../packages/feat-Account/components";

type RelationShip =
  | "notfriend"
  | "friend"
  | "blocked"
  | "blockedMe"
  | "requested"
  | "requester"
  | "self";

interface Foo {
  opId: number;
  relations: Array<RelationShip>;
  children: JSX.Element;
  notallow?: JSX.Element;
  isOwner?: boolean;
}
// TODO: RelationShip
const Relationship: (props: Foo) => JSX.Element = ({
  opId,
  relations,
  children,
  notallow = <h1> not allowd </h1>,
  isOwner = false,
}: Foo) => {
  const dispatch = useAppDispatch();
  const [matchedrelation, setMR] = useState<boolean | undefined>(undefined);
  // const [Go, letGo] = useState(false);
  const {
    friends,
    isLoading,
  }: { friends: Array<userType>; isLoading: boolean } = useAppSelector(
    (state) => state.friends
  );

  useEffect(() => {
    relations.some(
      (relation) =>
        (relation === "friend" && dispatch(getUserFriends())) ||
        (relation === "blocked" && null)
    );
  }, []);
  useEffect(() => {
    if (!friends) return;
    setMR(
      relations.some(
        (relation) =>
          (relation === "friend" &&
            !!friends?.find((user) => user.intraId === opId)) ||
          (relation === "blocked" && !!null)
      )
    );
  }, [friends]);

  if (isOwner) return children;
  return isLoading || !friends || matchedrelation === undefined ? (
    <Loading />
  ) : matchedrelation ? (
    children
  ) : (
    notallow
  );
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

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import { getUserFriends } from "../../packages/feat-Chat/components/redux/friendThunk";
import { Loading } from "./components";
import {
  AddLoading,
  RelationShipType,
  userType,
} from "../../packages/feat-Account/components";

interface Foo {
  opId: number;
  relations: Array<RelationShipType>;
  children: JSX.Element;
  notallow?: JSX.Element;
  isOwner?: boolean; // require  of self relation or false as default
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

  const { foo: friends, isLoading }: AddLoading<userType[]> = useAppSelector(
    ({ friends }) => {
      return { foo: friends.friends, isLoading: friends.isLoading };
    }
  );

  useEffect(() => {
    relations.some(
      (relation) =>
        ((relation === "friend" || relation === "notfriend") &&
          dispatch(getUserFriends())) ||
        (relation === "requested" && null) ||
        (relation === "requester" && null) ||
        (relation === "blockedMe" && null) ||
        (relation === "blocked" && null)
    );
  }, []);
  useEffect(() => {
    if (!friends) return;
    setMR(
      relations.some(
        (relation) =>
          (relation === "self" && isOwner) ||
          (relation === "friend" &&
            !!friends?.find((user) => user.intraId === opId)) ||
          (relation === "notfriend" &&
            !!friends?.find((user) => user.intraId !== opId)) ||
          (relation === "requested" && false) ||
          (relation === "requester" && false) ||
          (relation === "blockedMe" && false) ||
          (relation === "blocked" && false)
      )
    );
  }, [friends]);

  if (isOwner) return children;
  return isLoading || matchedrelation === undefined ? (
    <Loading />
  ) : matchedrelation ? (
    children
  ) : (
    notallow
  );
};

export default Relationship;
export { Relationship };

import { PopperPlacementType, Typography } from "@mui/material";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { PopperComponent, useAppDispatch, useAppSelector } from "../../core";

export const Home = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<any | null>(null);
  const [placement, setPlacement] = useState<PopperPlacementType>();

  const handleClick =
    (newPlacement: PopperPlacementType) => (event: React.MouseEvent<any>) => {
      setPlacement(newPlacement);
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
    };
  // navigate("/test");
  // const state: CounterState = useAppSelector((state) => state.counter);
  // const todos: TodosState = useAppSelector((state) => state.todos);
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(fetchTodos(4));
  // }, [dispatch]);
  const han = () => {
    navigate("/test");
  };

  const arr = [
    {
      item: (
        <ImgProfile
          src="https://cdn-icons-png.flaticon.com/512/4128/4128349.png"
          style={{ margin: "200px" }}
          onClick={handleClick("bottom-end")}
        />
      ),
    },
    {
      item: (
        <ImgProfile
          src="https://cdn-icons-png.flaticon.com/512/4128/4128349.png"
          onClick={handleClick("bottom")}
        />
      ),
    },
  ];
  return (
    <>
      <PopperComponent
        anchorEl={anchorEl}
        open={open}
        placement={placement}
        ChildComponent={
          <Typography sx={{ p: 2 }}>The content of the Popper.</Typography>
        }
      />
      {arr.map((field) => (
        <>{field.item}</>
      ))}
      {/* <button style={{ margin: "200px" }} onClick={handleClick("bottom-end")}>
        sss
      </button> */}
    </>
  );
};
const ImgProfile = styled.img`
  width: 33px;
  height: 34px;
  margin-top: 5px;
`;

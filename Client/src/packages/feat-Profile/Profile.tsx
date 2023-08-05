import { Avatar, Divider } from "@mui/material";
import { useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../core";
import {
  CounterState,
  decrement,
  increment,
  incrementByAmount,
} from "./components/CounterSlice";
import { TodosState } from "./components/TodosSlice";
import { fetchTodos } from "./components/TodosThunk";

export const Profile = () => {
  const state: CounterState = useAppSelector((state) => state.counter);
  // const todos: TodosState = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(fetchTodos(4));
  // }, []);

  return (
    <Root>
      <Title style={{ fontSize: "2rem" }}>Account</Title>
      <Cards>
        <CardAvatar>
          <Avatar
            sx={{ width: "80px", height: "80px" }}
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
          />

          <Title style={{ fontSize: "1rem" }}>Bouroummana Ismail</Title>
          <H5>ibouroum</H5>
          <hr />

          <Button>Upload Picture</Button>
        </CardAvatar>
        <CardInfos>Infos</CardInfos>
      </Cards>
    </Root>
  );
};
const Root = styled.div`
  margin: 6vw 4vw;
  padding: 10px;
`;
const Cards = styled.div`
  display: flex;
`;
const CardAvatar = styled.div`
  width: 40%;
  margin-right: 5px;
  padding: 32px 24px;
  background-color: rgb(255, 255, 255);
  color: rgb(17, 25, 39);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 2px;
  /* overflow: hidden; */
  border-radius: 20px;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const CardInfos = styled.div`
  width: 65%;
  margin-left: 5px;
  padding: 32px 24px;
  background-color: rgb(255, 255, 255);
  color: rgb(17, 25, 39);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 2px;
  border-radius: 20px;
`;
const Title = styled.h4`
  margin: 0px;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 700;

  line-height: 1.2;
`;
const Ava = styled.div`
  position: relative;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  flex-shrink: 0;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  line-height: 1;
  border-radius: 50%;
  overflow: hidden;
  user-select: none;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0px;
  height: 80px;
  margin-bottom: 16px;
  width: 80px;
`;
const Button = styled.button`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  outline: 0px;
  border: 0px;
  margin: 0px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  font-weight: 600;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 0.875rem;
  line-height: 1.75;
  min-width: 64px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  color: rgb(99, 102, 241);
  width: 100%;
  border-radius: 12px;
  text-transform: none;
  padding: 9px 16px;
  &:hover {
    text-decoration: none;
    background-color: rgba(99, 102, 241, 0.04);
  }
`;
const H5 = styled.h4`
  margin: 0px;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.57;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  color: rgb(108, 115, 127);
`;

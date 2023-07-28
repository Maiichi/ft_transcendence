import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../core";
import {
  CounterState,
  decrement,
  increment,
  incrementByAmount,
} from "./components/CounterSlice";
import { TodosState } from "./components/TodosSlice";
import { fetchTodos } from "./components/TodosThunk";

export const Game = () => {
  const state: CounterState = useAppSelector((state) => state.counter);
  // const todos: TodosState = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(fetchTodos(4));
  // }, []);


  return <>Game</>;
};

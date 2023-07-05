import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../config/redux/hooks";
import {
  CounterState,
  decrement,
  increment,
  incrementByAmount,
} from "./components/CounterSlice";
import { TodosState } from "./components/TodosSlice";
import { fetchTodos } from "./components/TodosThunk";

export const Home = () => {
  const state: CounterState = useAppSelector((state) => state.counter);
  const todos: TodosState = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTodos(4));
},[dispatch])

console.log(todos)


  return (
    <>
      <p>{state.value}</p>
      <button onClick={() => dispatch(increment())}>"+" </button>
      <button onClick={() => dispatch(decrement())}>"-" </button>
      <button onClick={() => dispatch(incrementByAmount(2))}>"=" </button>
      <p>{state.nbr}</p>
    </>
  );
};

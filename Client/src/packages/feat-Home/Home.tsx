import { useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../core";

export const Home = () => {
  const navigate = useNavigate();
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
  return (
    <>
      <button onClick={() => han()}>sss</button>
    </>
  );
};

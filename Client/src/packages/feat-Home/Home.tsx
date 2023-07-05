import { useAppDispatch, useAppSelector } from "../../config/redux/hooks";
import {
  CounterState,
  decrement,
  increment,
  incrementByAmount,
} from "./components/CounterSlice";

export const Home = () => {
  const state: CounterState = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

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

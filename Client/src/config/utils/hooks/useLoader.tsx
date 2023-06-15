import { useEffect, Reducer, useReducer } from "react";

interface StateType {
  data: any;
  loading: boolean;
  error: string | any | null;
}

type ActionType = { type: "touch"; payload: any };

const reducer: Reducer<StateType, ActionType> = (
  prevState: StateType,
  action: ActionType
): StateType => {
  switch (action.type) {
    case "touch":
      return { ...prevState, ...action.payload };
    default:
      throw new Error();
  }
};

export interface IHash {
  [details: string]: any;
}

export interface IUseLoaderType extends StateType {
  reload: (arg?: IHash) => Promise<void>;
}

export function useLoader<T>(
  loader: (arg?: IHash) => Promise<T>
): IUseLoaderType {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    doLoad().then((ignored) => null);
  }, []);

  const doLoad = async (args?: any) => {
    dispatch({
      type: "touch",
      payload: { loading: true },
    });
    try {
      const data = await loader(args);
      dispatch({
        type: "touch",
        payload: { data, loading: false, error: null },
      });
    } catch (err: any) {
      return dispatch({
        type: "touch",
        payload: { loading: false, error: err.message },
      });
    }
  };

  return { ...state, reload: doLoad } as IUseLoaderType;
}

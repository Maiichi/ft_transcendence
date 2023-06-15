import { ServerError, MainLoader, AdapterInterface } from "../../../config";
import { IHomeAdapter } from "./types";

const HomeContainer = (props: IHomeAdapter) => {
  const { value } = props;
  return (
    <>
      <div>{value}</div>
    </>
  );
};

export const HomeAdapter: AdapterInterface<IHomeAdapter> = {
  errorView: ServerError,
  skeletonView: MainLoader,
  mainView: HomeContainer,
};

import { DataLoader } from "../../config";
import { HomeAdapter } from "./components/HomeAdapter";
import { IHomeAdapter } from "./components/types";

// const apis: Promise<IHomeAdapter> = new Promise(
//   (resolve: (value: IHomeAdapter) => void, reject: (error: Error) => void) => {
//     setTimeout(() => {
//       resolve({ value: "foo" });
//     }, 1000);
//   }
// );

const apis = (): Promise<IHomeAdapter> =>
  new Promise(
    (
      resolve: (value: IHomeAdapter) => void,
      reject: (error: Error) => void
    ) => {
      setTimeout(() => {
        resolve({ value: "foo" });
      }, 1000);
    }
  );

export const Home = () => {
  return (
    <>
      <DataLoader<IHomeAdapter>
        loader={apis}
        skeleton={() => <HomeAdapter.skeletonView />}
        error={() => <HomeAdapter.errorView />}
        render={(data) => {
          return (
            <>
              <HomeAdapter.mainView value={data.value} />
            </>
          );
        }}
      />
    </>
  );
};

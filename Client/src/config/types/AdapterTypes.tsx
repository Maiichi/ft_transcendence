import { ComponentType } from "react";

export interface AdapterInterface<T> {
  errorView: ComponentType<any>;
  skeletonView: ComponentType<any>;
  mainView: ComponentType<T>;
}

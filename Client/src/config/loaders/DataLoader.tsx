import React, { ComponentType, ReactNode, useState, useEffect } from "react";
import { IHash, useLoader } from "../utils";

export interface DataLoaderProps<T> {
  value?: any;
  loader: (arg?: IHash) => Promise<T>;
  skeleton: ReactNode | ComponentType<any>;
  error: ReactNode | ComponentType<any>;
  render: (data: T, reload?: (arg?: IHash) => void) => ReactNode;
}

export function DataLoader<T>(props: DataLoaderProps<T>) {
  //   const [initialized, setInitialized] = useState(false);
  const { data, loading, error, reload } = useLoader<T>(props.loader);
  //   useEffect(() => {
  //     if (initialized) {
  //       reload().then(() => null);
  //     } else {
  //       setInitialized(true);
  //     }
  //   }, [props.value]);

  /**
   * Building a cloned error state Element and replace onReload with the true reload function.
   */
  let errorComponent = props.error;

  if (typeof errorComponent == "function") {
    errorComponent = React.cloneElement(props.error(), {
      onReload: reload,
    });
  }

  if (loading) {
    if (typeof props.skeleton == "function") {
      return <props.skeleton />;
    }
    return props.skeleton;
  }

  if (error) {
    return errorComponent;
  }

  return props.render(data as T, reload);
}

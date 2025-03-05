import { ReactNode, useMemo } from "react";
import useRequest from "./request.service";
import { RequestContext } from "./request.context";

export const RequestProvider = ({ children }: { children: ReactNode }) => {
  const {
    addRequest,
    deleteRequest,
    loading,
    updateRequest,
    getRequestByFolderId,
    getRequestById,
    currentRequest,
    changeCurrentRequest,
  } = useRequest();

  const value = useMemo(
    () => ({
      addRequest,
      deleteRequest,
      loading,
      updateRequest,
      getRequestByFolderId,
      getRequestById,
      currentRequest,
      changeCurrentRequest,
    }),
    [
      addRequest,
      deleteRequest,
      loading,
      updateRequest,
      getRequestByFolderId,
      getRequestById,
      currentRequest,
      changeCurrentRequest,
    ]
  );

  console.log("RequestProvider value", value);
  

  return (
    <RequestContext.Provider value={value}>{children}</RequestContext.Provider>
  );
};

import { ReactNode, useMemo } from "react";
import { MockserverContext } from "./mockserver.context";
import useMockserver from "./mockserver.services";

export const MockserverProvider = ({ children }: { children: ReactNode }) => {
  const { createMockServer, getMockserversByProjectId, getMockServerById } = useMockserver();

  const value = useMemo(
    () => ({
      createMockServer,
      getMockserversByProjectId,
      getMockServerById,
    }),
    [createMockServer, getMockserversByProjectId, getMockServerById]
  );

  return (
    <MockserverContext.Provider value={value}>
      {children}
    </MockserverContext.Provider>
  );
};

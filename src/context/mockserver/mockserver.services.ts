import { Mockserver } from "../../interfaces/mockserver.interface";
import _fetch from "../utils/fetch";

const useMockserver = () => {
  const createMockServer = async (mockServer: Mockserver) => {
    await _fetch("/mockserver", {
      method: "POST",
      body: JSON.stringify(mockServer),
      headers: {
        "Content-Type": "application/json",
      },
      includeCredentials: true,
    });
  };

  const getMockserversByProjectId = async (projectId: number) => {
    const response = await _fetch(`/mockserver?project=${projectId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      includeCredentials: true,
    });
    return response;
  };

  const getMockServerById = async (id: number, asRequest?: boolean) => {

    if (asRequest) {
      return await _fetch(`/mockserver/${id}?asRequest=true`, {
        headers: {
          "Content-Type": "application/json",
        },
        includeCredentials: true,
      });
    }

    return await _fetch(`/mockserver/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      includeCredentials: true,
    });
  };

  return {
    createMockServer,
    getMockserversByProjectId,
    getMockServerById,
  };
};

export default useMockserver;

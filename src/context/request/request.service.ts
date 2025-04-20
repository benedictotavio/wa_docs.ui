import { useMemo, useState } from "react";
import { Request } from "../../interfaces/request.interface";
import _fetch from "../utils/fetch";

const useRequest = () => {
  const [loading, setLoading] = useState(true);
  const [currentRequest, setCurrentRequest] = useState<Request | null>(null);

  const addRequest = async (request: Request) => {
    try {
      await _fetch(`/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
        includeCredentials: true,
      }).then((response) => {
        localStorage.setItem("request", JSON.stringify(response.id));
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateRequest = async (request: Request) => {
    try {
      await _fetch(`/request/${request.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
        includeCredentials: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRequest = async (requestId: number) => {
    try {
      await _fetch(`/request/${requestId}`, {
        method: "DELETE",
        includeCredentials: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getRequestByFolderId = async (folderId: number) => {
    try {
      setLoading(true);
      const response = await _fetch(`/request?folderId=${folderId}`, {
        includeCredentials: true,
      });
      const data = await response;
      if (!currentRequest) {
        setCurrentRequest(data[0]);
        localStorage.setItem("request", JSON.stringify(data[0].id));
      }

      return data;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getRequestById = async (requestId: number) => {
    try {
      const response = await _fetch(`/request/${requestId}`, {
        includeCredentials: true,
      });
      const data = await response;
      setCurrentRequest(data);
      localStorage.setItem("request", JSON.stringify(data.id));
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const changeCurrentRequest = async (request: Request | number) => {
    if (typeof request === "number") {
      await getRequestById(request).then((request) => {
        setCurrentRequest(request);
      });
      localStorage.setItem("request", JSON.stringify(request));
    } else {
      setCurrentRequest(request);
      localStorage.setItem("request", JSON.stringify(request.id));
    }
  };

  useMemo(async () => {
    console.log("Current Request", currentRequest);
    
    setLoading(true);
    if (currentRequest) return;
    const requestId = localStorage.getItem("request");
    if (!requestId) return;
    await getRequestById(parseInt(requestId)).then((request) => {
      setCurrentRequest(request);
    });
    setLoading(false);
  }, [currentRequest]);

  return {
    currentRequest,
    loading,
    addRequest,
    updateRequest,
    deleteRequest,
    getRequestByFolderId,
    getRequestById,
    changeCurrentRequest,
  };
};

export default useRequest;

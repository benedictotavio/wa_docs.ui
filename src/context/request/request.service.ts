import { useEffect, useState } from "react";
import { Request, RequestMethod } from "../../interfaces/request.interface";
import _fetch from "../utils/fetch";

const useRequest = () => {
  const [loading, setLoading] = useState(true);
  const [currentRequest, setCurrentRequest] = useState<Request>({
    id: 0,
    name: "",
    uri: "",
    method: RequestMethod.GET,
    headers: "[]",
    body: "{}",
    folderId: 0,
  });

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
      console.log(error);
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
      console.log(error);
    }
  };

  const deleteRequest = async (requestId: number) => {
    try {
      await _fetch(`/request/${requestId}`, {
        method: "DELETE",
        includeCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getRequestByFolderId = async (folderId: number) => {
    try {
      setLoading(true);
      const response = await _fetch(`/request?folderId=${folderId}`, {
        includeCredentials: true,
      });
      const data = await response;
      return data;
    } catch (error) {
      console.log(error);
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
      console.log(error);
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

    console.log("currentRequest", currentRequest);
  };

  useEffect(() => {
    const loadRequest = async () => {
      setLoading(true);
      const requestId = localStorage.getItem("request");
  
      console.log("requestId", requestId);
  
      if (requestId) {
        const req = await getRequestById(parseInt(requestId));
        console.log("req", req);
        setCurrentRequest(req);
      }
  
      setLoading(false);
    };
  
    loadRequest();
  }, []);

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

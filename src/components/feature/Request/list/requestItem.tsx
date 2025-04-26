import { useContext } from "react";
import { Request } from "../../../../interfaces/request.interface";
import { RequestContext } from "../../../../context/request/request.context";
import BoxMethod from "../box/BoxMethod";

interface RequestItemProps {
  request: Request;
}

const RequestItem: React.FC<RequestItemProps> = ({ request }) => {
  const { changeCurrentRequest } = useContext(RequestContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    changeCurrentRequest(request);
  };

  return (
    <li className="list-group-item px-0">
      <button className="btn border-0 bg-transparent px-0" onClick={handleClick}>
        <BoxMethod method={request.method} />
        {request.name}
      </button>
    </li>
  );
};

export default RequestItem;

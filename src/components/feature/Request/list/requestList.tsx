import { Request } from "../../../../interfaces/request.interface";
import RequestItem from "./requestItem";

export interface RequestListProps {
  requests: Request[];
}

const RequestList: React.FC<RequestListProps> = ({ requests }) => {
  return (
    requests?.length > 0 && (
      <ul className="list-group list-group-flush p-0 m-0">
        {requests.map((request) => (
          <RequestItem key={request.id} request={request} />
        ))}
      </ul>
    )
  );
};

export default RequestList;

import { RequestMethod } from "../../../../interfaces/request.interface";

interface BoxMethodProps {
  method: RequestMethod;
}

const BoxMethod: React.FC<BoxMethodProps> = ({ method }) => {
  const getColor = (method: RequestMethod) => {
    switch (method) {
      case RequestMethod.GET:
        return "bg-warning";
      case RequestMethod.POST:
        return "bg-light text-dark border border-dark";
      case RequestMethod.PUT:
        return "bg-danger";
      case RequestMethod.DELETE:
        return "bg-success";
      case RequestMethod.OPTIONS:
        return "bg-primary";
      case RequestMethod.HEAD:
        return "bg-secondary";
      case RequestMethod.PATCH:
        return "bg-info";
      default:
        return "bg-gray-500";
    }
  };

  return <span className={`inline-block px-2 py-1 mx-1 rounded-md ${getColor(method)} text-white`}>{method}</span>;
}

export default BoxMethod;
import { useState } from "react";

interface MenuItemProps {
  text: string;
  folders: { id: number; name: string }[];
}

const MenuItem: React.FC<MenuItemProps> = ({ text, folders }) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="list-group-item border-0">
      <button className="d-flex justify-content-center align-items-center gap-2 bg-transparent" onClick={() => setIsOpen(!isOpen)}>
        <i className="d-flex justify-content-end align-items-end px-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
            />
          </svg>
        </i>
        <h6 className="text-dark mb-0">{text}</h6>
      </button>
      {isOpen && folders.length > 0 && (
        <ul>
          {folders.map((folder) => (
            <li key={folder.id} className="list-group-item border-0">
              <span>{folder.name}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;

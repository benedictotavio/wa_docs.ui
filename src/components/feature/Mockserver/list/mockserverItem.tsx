import { useState } from "react";
import { Mockserver } from "../../../../interfaces/mockserver.interface";
import Modal from "../../../../design/modal/Modal";
import FormMockServer from "../form/FormMockServer";

export interface MockServerItemProps {
  mockserver: Mockserver;
}

const MockServerItem: React.FC<MockServerItemProps> = ({ mockserver }) => {
  const [isModalMockServerOpen, setIsModalMockServerOpen] = useState(false);

  const handleClick = () => {
    setIsModalMockServerOpen(true);
  };

  return (
    <li className="list-group-item">
      <button
        onClick={handleClick}
        className="d-flex flow-row align-items-center justify-content-between"
      >
        <h5>
          <i className="mx-2">&#128423;</i>
          {mockserver.name}
        </h5>
      </button>
      <Modal
        isOpen={isModalMockServerOpen}
        onClose={() => setIsModalMockServerOpen(false)}
        isCenter
      >
        <FormMockServer
          mockServer={mockserver}
          projectId={mockserver.projectId}
        />
      </Modal>
    </li>
  );
};

export default MockServerItem;

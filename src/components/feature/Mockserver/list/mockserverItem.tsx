import { useState } from "react";
import { Mockserver } from "../../../../interfaces/mockserver.interface";
import Modal from "../../../../design/modal/Modal";
import FormMockServer from "../form/FormMockServer";
import HtmlIcon from "../../../../design/icon/htmlIcon/HtmlIcon";
import Button from "../../../../design/button/Button";

export interface MockServerItemProps {
  mockserver: Mockserver;
}

const MockServerItem: React.FC<MockServerItemProps> = ({ mockserver }) => {
  const [isModalMockServerOpen, setIsModalMockServerOpen] = useState(false);

  const handleClick = () => {
    setIsModalMockServerOpen(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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
        <h4 className="text-center">{mockserver.name}</h4>
        <hr />
        <div className="d-flex align-items-center justify-content-center gap-2">
          <span>
            https://{mockserver.baseUrl?.trim()}
            {mockserver.path.trim()}
          </span>
          <Button onClick={
            () => copyToClipboard(
              `https://${mockserver.baseUrl?.trim()}:1080${mockserver.path.trim()}`
            )
          } isTransparent>
            <HtmlIcon hex="&#x2750;" lineHeight={1} />
          </Button>
        </div>
        <FormMockServer
          mockServer={mockserver}
          projectId={mockserver.projectId}
        />
      </Modal>
    </li>
  );
};

export default MockServerItem;

import { useContext, useMemo, useState } from "react";
import { Mockserver } from "../../../../interfaces/mockserver.interface";
import { MockserverContext } from "../../../../context/mockserver/mockserver.context";
import MockServerItem from "./mockserverItem";
import Modal from "../../../../design/modal/Modal";
import FormMockServer from "../form/FormMockServer";
import { ProjectContext } from "../../../../context/project/project.context";

const MockServerList: React.FC = () => {
  const { getMockserversByProjectId } = useContext(MockserverContext);
  const { currentProject } = useContext(ProjectContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mockServers, setMockServers] = useState<Mockserver[]>([]);

  useMemo(() => {
    getMockserversByProjectId(currentProject?.id ?? 0).then((data) => {
      setMockServers(data);
    });
  }, [getMockserversByProjectId, currentProject]);

  return (
    <ul className="list-group list-group-flush">
      {mockServers.length > 0 ? (
        mockServers.map((mockServer) => (
          <MockServerItem mockserver={mockServer} key={mockServer.id} />
        ))
      ) : (
        <li className="list-group-item d-flex mx-auto">
          <button
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            Criar novo mock server
          </button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            isCenter
          >
            <FormMockServer projectId={currentProject?.id ?? 0} />
          </Modal>
        </li>
      )}
    </ul>
  );
};

export default MockServerList;

import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/auth/auth.provider";
import { TeamProvider } from "./context/team/team.provider";
import { ProjectProvider } from "./context/project/project.provider";
import { FolderProvider } from "./context/folder/folder.provider";
import { RequestProvider } from "./context/request/request.provider";
import { MockserverProvider } from "./context/mockserver/mockserver.provider";

function App() {
  return (
    <AuthProvider>
      <TeamProvider>
        <ProjectProvider>
          <MockserverProvider>
            <RequestProvider>
              <FolderProvider>
                <Outlet />
              </FolderProvider>
            </RequestProvider>
          </MockserverProvider>
        </ProjectProvider>
      </TeamProvider>
    </AuthProvider>
  );
}

export default App;

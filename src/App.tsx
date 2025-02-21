import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/auth/auth.provider";
import { TeamProvider } from "./context/team/team.provider";
import { ProjectProvider } from "./context/project/project.provider";
import { FolderProvider } from "./context/folder/folder.provider";
import { RequestProvider } from "./context/request/request.provider";

function App() {
  return (
    <AuthProvider>
      <RequestProvider>
        <TeamProvider>
          <ProjectProvider>
            <FolderProvider>
              <Outlet />
            </FolderProvider>
          </ProjectProvider>
        </TeamProvider>
      </RequestProvider>
    </AuthProvider>
  );
}

export default App;

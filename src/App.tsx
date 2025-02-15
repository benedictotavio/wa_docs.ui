import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/auth/auth.provider";
import { TeamProvider } from "./context/team/team.provider";
import { ProjectProvider } from "./context/project/project.provider";
import { FolderProvider } from "./context/folder/folder.provider";

function App() {
  return (
    <AuthProvider>
      <TeamProvider>
        <ProjectProvider>
          <FolderProvider>
            <Outlet />
          </FolderProvider>
        </ProjectProvider>
      </TeamProvider>
    </AuthProvider>
  );
}

export default App;

import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/auth/auth.provider";
import { UserProvider } from "./context/users/users.provider";
import { TeamProvider } from "./context/team/team.provider";
import { ProjectProvider } from "./context/project/project.provider";
import { FolderProvider } from "./context/folder/folder.provider";

function App() {
  return (
    <UserProvider>
      <TeamProvider>
        <ProjectProvider>
          <FolderProvider>
            <AuthProvider>
              <Outlet />
            </AuthProvider>
          </FolderProvider>
        </ProjectProvider>
      </TeamProvider>
    </UserProvider>
  );
}

export default App;

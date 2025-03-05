import { useContext } from "react";
import FolderTree from "../feature/Folder/folderTree";
import { ProjectContext } from "../../context/project/project.context";

interface MenuItemProps {
  children?: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ children }) => {
  const { currentProject } = useContext(ProjectContext);

  return (
    <li className="w-100 list-group-item mx-0 px-0 mt-2">
      {!children ? (
          <FolderTree projectId={currentProject?.id ?? 0} />
      ) : (
        <>{children}</>
      )}
    </li>
  );
};
export default MenuItem;

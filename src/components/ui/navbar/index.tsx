import styles from "./index.module.css";
import { useContext } from "react";
import { TeamContext } from "../../../context/team/team.context";
import TeamPanel from "../../feature/Team/panel/Panel";
import UserProfileMenuProps from "../userProfileMenu";

const Navbar: React.FC = () => {
  const { team } = useContext(TeamContext);

  return (
    <nav className={styles.navbar}>
      <TeamPanel team={team} />
      <UserProfileMenuProps />
    </nav>
  );
};

export default Navbar;

import { Team } from "../../../interfaces/team.interface";
import Banner from "./banner/Banner";

interface TeamProps {
    team: Team;
}


const TeamPanel: React.FC<TeamProps> = ({ team }) => {

    console.log("Team", team);

    return team && <Banner title={team.name} description={team.description} />;
};

export default TeamPanel;

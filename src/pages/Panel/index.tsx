import Request from "../../components/feature/Request";
import Menu from "../../components/ui/menu";
import MenuItem from "../../components/ui/menuItem";
import Navbar from "../../components/ui/navbar";

const Panel = () => {
    return (
        <div className="row w-100 h-100">
            <div className="col-md-3">
                <Menu>
                    <MenuItem text="Projeto 1" folders={[{ id: 1, name: "Folder 1" }, { id: 2, name: "Folder 2" }]} />
                </Menu>
            </div>
            <div className="col-md-9 m-0 p-0">
                <Navbar />
                <Request />
            </div>
        </div>
    )
}

export default Panel;
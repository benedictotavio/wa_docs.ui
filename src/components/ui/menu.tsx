import { NavLink } from "react-router-dom";

interface MenuProps {
    children?: React.ReactNode;
}

const Menu: React.FC<MenuProps> = ({ children }) => {
    return (
        <aside className="mt-5 p-0 m-0 bg-transparent shadow-sm bg-none">
            <div className="m-3 mb-4">
                <NavLink to="/" className={"d-flex justify-content-center align-items-center gap-4"}>
                    <i className="m-1" style={{ fontSize: "2rem" }}>
                        &#x1FA90;
                    </i>
                    <h3>
                        Wa DOCS
                    </h3>
                </NavLink>
            </div>

            <menu className="d-flex flex-column">
                <div className="d-flex flex-row">
                    <input type="text" className="form-control" placeholder="Pesquisar" />
                    <button className="btn btn-primary">
                        <i>+</i>
                    </button>
                </div>

                <ul className="list-style-none m-0 p-0">
                    {children}
                </ul>
            </menu>
        </aside>
    );
};

export default Menu;

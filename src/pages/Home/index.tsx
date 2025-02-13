import { NavLink } from "react-router-dom"
import FormLogin from "../../components/ui/formLogin"

function Home() {

  return (
    <div className="d-flex justify-content-center align-items-center flex-column h-75 w-100">
      <h1>Bem-vindo ao <i>WA Docs</i></h1>
      <FormLogin />
      <NavLink to="/cadastro">Cadastrar</NavLink>
    </div>
  )
}

export default Home
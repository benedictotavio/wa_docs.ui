import FormLogin from "../../components/ui/formLogin"

function Home() {

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <h1>Bem-vindo ao <i>WA Docs</i></h1>
      <FormLogin />
    </div>
  )
}

export default Home
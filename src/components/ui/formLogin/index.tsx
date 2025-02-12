import { useContext, useState } from "react"
import Form from "../../../design/form/form"
import { AuthContext } from "../../../context/auth/auth.context"
import InputText from "../../../design/inputs/InputText/inputText"

const FormLogin = () => {

    const { login } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        login(
            email,
            password).catch(err => {
                alert(err.message)
            }).then(() => {
                setEmail('')
                setPassword('')
            }).catch(err => {
                alert(err.message)
            })
    }

    return (
        <Form onSubmit={handleSubmit} buttonText="Entrar">
            <InputText type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />
            <InputText type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Senha" />
        </Form>
    )
}

export default FormLogin
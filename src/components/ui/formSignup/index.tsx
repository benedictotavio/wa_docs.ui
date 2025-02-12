import { FormEvent, useContext, useState } from "react"
import { AuthContext } from "../../../context/auth/auth.context"
import Form from "../../../design/form/form"
import InputText from "../../../design/inputs/InputText/inputText"

const FormSignup = () => {

  const { signUp } = useContext(AuthContext)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('')

  const handleSubmit = async (e: FormEvent) => {

    if (password.trim() !== confirmPassword.trim()) {
      alert('As senhas não conferem')
      return
    }

    e.preventDefault()
    signUp({
      username,
      email,
      password,
      confirmPassword,
      role: role
    }).then(() => {
      setUsername('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setRole('')
    }).catch(err => {
      alert(err.message)
    })
  }

  return (
    <Form onSubmit={handleSubmit} buttonText="Registrar">
      <InputText type="text" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Username" />
      <InputText type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />
      <InputText type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
      <InputText type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} placeholder="Confirm Password" />
    </Form>
  )
}

export default FormSignup
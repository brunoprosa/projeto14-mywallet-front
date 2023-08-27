import styled from "styled-components"
import { useNavigate, Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"

export default function SignInPage() {

  const [email, setEmail] = useState("")
	const [senha, setSenha] = useState("")

  const navigate = useNavigate()

  function singIn (e) {

    e.preventDefault()

		const requisicao = axios.post(`${import.meta.env.VITE_API_URL}/`, {
			email,
      senha
		})

    requisicao.then(resp => {
        localStorage.setItem("token", resp.data.token);
        navigate("/home")
      })
    requisicao.catch(err => alert(err))

  }

  return (
    <SingInContainer>
      <form>
        <MyWalletLogo onSubmit={singIn} />
        <input 
          placeholder="E-mail" 
          type="email" 
          value={email}
          onChange={e => setEmail(e.target.value)}
          required 
        />
        <input 
          placeholder="Senha" 
          type="password" 
          autocomplete="new-password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required  
        />
        <button>Entrar</button>
      </form>

      <Link to = '/cadastro'>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

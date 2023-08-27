import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"
import dotenv from "dotenv"

export default function SignUpPage() {

  const [email, setEmail] = useState("")
	const [senha, setSenha] = useState("")
  const [senha2, setSenha2] = useState("")
  const [nome, setNome] = useState("")

  dotenv.config()
  const navigate = useNavigate()

  function singUp (e) {

    e.preventDefault()

    if(senha !== senha2) return alert('senhas se diferem')

		const requisicao = axios.post(`${import.meta.env.VITE_API_URL}/cadastro`, {
			nome, 
      email,
      senha
		})

    requisicao.then(() => navigate("/"))
    requisicao.catch((err) => alert(err))

  }

  return (
    <SingUpContainer>
      <form onSubmit={singUp}>
        <MyWalletLogo />
        <input 
          placeholder="Nome" 
          type="text" 
          value={nome}
          onChange={e => setNome(e.target.value)}
          required 
        />
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
        <input 
          placeholder="Confirme a senha" 
          type="password" 
          autocomplete="new-password" 
          value={senha2}
          onChange={e => setSenha2(e.target.value)}
          required 
        />
        <button>Cadastrar</button>
      </form>

      <Link to = '/'>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

import styled from "styled-components"
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from "react"
import axios from "axios"

export default function TransactionsPage() {

  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  const {tipo} = useParams()
  let [valor, setValor] = useState('')
  const [descricao, setDescricao] = useState('')

  useEffect(() =>{
    if(!token) navigate('/')
  },[])

  function novaTransacao(e){

    e.preventDefault()

    valor = Number(valor)

    const promise = axios.post(
      `${import.meta.env.VITE_API_URL}/nova-transacao/:${tipo}`,
      {valor, descricao},
      config
    )

    promise.then(() => navigate('/home'))
    promise.catch(err => alert(err))
  }

  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={novaTransacao}>
        <input 
          data-test="registry-amount-input"
          placeholder="Valor" 
          type="text"
          value={valor}
          onChange={e => setValor(e.target.value)}
          required 
        />
        <input 
          data-test="registry-name-input"
          placeholder="Descrição" 
          type="text" 
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          required 
        />
        <button data-test="registry-save" >Salvar {tipo}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`

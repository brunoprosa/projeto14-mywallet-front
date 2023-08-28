import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"

export default function HomePage() {

  const [saldo, setSaldo] = useState(0)
  const [transacoes, setTransacoes] = useState([{dia: 1, descricao: "1", tipo: 'entrada', valor: 2}])
  const [data, setData] = useState({nome: 'oi', transacoes})
  const [sinal, setSinal] = useState('positivo')
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }

  useEffect(() =>{

    if(!token) navigate('/')

    const promise = axios.get(`${import.meta.env.VITE_API_URL}/home`, config)
    promise.then(res => setData(res.data))
    promise.catch(err => console.log(err))

  }, [])

  useEffect(() =>{
    let auxi = [...data.transacoes]
    setTransacoes(auxi)
    let aux = 0

    for(let i = 0; i < data.transacoes.length; i++){
      if(data.transacoes[i].tipo === "entrada"){
        aux += data.transacoes[i].valor
      }else{
        aux -= data.transacoes[i].valor
      }
    }
    setSaldo(aux)
    if(aux < 0) setSinal('negativo')
  })

  console.log(data)

  function logOut(){

    const promise = axios.delete(`${import.meta.env.VITE_API_URL}/home`, { token })

    navigate('/')

  }

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name" >Olá, ${data.nome}</h1>
        <BiExit data-test="logout" onClick={logOut}/>
      </Header>

      <TransactionsContainer>
        <ul>
          {transacoes.map(t => 
            <ListItemContainer>
              <div>
                <span>{t.dia}</span>
                <strong data-test="registry-name" >{t.descricao}</strong>
              </div>
              <Value data-test="registry-amount" color={t.tipo}>{t.valor}</Value>
            </ListItemContainer>
          )}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value data-test="total-amount" color={sinal}>{saldo}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <Link to = '/nova-transacao/entrada'>
          <button data-test="new-income">
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </button>
        </Link>
        <Link to = '/nova-transacao/saida'>
          <button data-test="new-expense">
            <AiOutlineMinusCircle />
            <p>Nova <br />saída</p>
          </button>
        </Link>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`
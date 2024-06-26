import { Image, Button, Container,Row,Col} from "react-bootstrap"
import "../css/WelcomePage.css"
import "../css/MyStyles.css"
import belFlag from "../assets/img/bel-flag.png"
import {useNavigate} from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export default function WelcomePage(){
  const navigate = useNavigate();
  if(localStorage.getItem("token")){
  return <Navigate to='/main'/>  
  }
  return(
   <div className="welcome-page">
   <Container className="welcome-page-container" fluid>
    <Row >
      <Col >
    <Image src={belFlag} rounded />
      </Col>
    </Row>
    <Row className="my-row">
      <Col ><h1 className="welcome-header">Добро пожаловать на сайт, посвященный выборам в Республике Беларусь</h1></Col> 
    </Row>
    <Row className="my-row">
      <Col ></Col>
      <Col md="auto" > 
    <Button size="lg" variant="myprimary" onClick={()=>navigate('/auth')}>Авторизация</Button>
      </Col>
      <Col md="auto" >
    <Button size="lg" variant="myprimary" onClick={()=>navigate('/reg')}>Регистрация</Button>
      </Col>
      <Col ></Col>
    </Row>
   </Container>
   </div>
  )
}

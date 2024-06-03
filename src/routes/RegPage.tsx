import { Alert, Button, Col, Container, Form, Row, } from "react-bootstrap";
import "../css/RegPage.css"
import "../css/MyStyles.css"
import { registration } from "../api/userApi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Region } from "../redux/slices/regionSlice";
import { User, loadUser } from "../redux/slices/userSlice";
import {} from 'jwt-decode';
import { Navigate, useNavigate } from "react-router-dom";

export default function RegPage(){
  const regions = useSelector((state:RootState)=>state.regions.value);
 const [email,setEmail] = useState('');
 const [password,setPassword] = useState('');
 const [regionID,setRegionID] = useState(1);
 const [response,setResponse] = useState('');
 const [error,setError] = useState(false);
const dispatch = useDispatch();
const user = useSelector((state:RootState)=>state.users.value);
const navigate = useNavigate();

if(localStorage.getItem("token")){
         return <Navigate to='/main'/>  
  }

 async function regButtonHandler(){ 
   try{
      if(email && password && regionID && regions.length>0){

      const data:User=  await registration(email,password,regionID);
         if(data.id!==undefined){
            dispatch(loadUser(data));
            navigate("/main");
        }
      }
      else{
      setResponse("Все поля должны быть заполнены!");         
      setError(true);
      setTimeout(()=>setError(false),5000);
      }
   }
   catch(error){
      console.log(error);
   }
 }


 return (
    <div className="reg-page">
      <Container>
         <Row>
         <Col></Col>
            <Col md={6}>
      <Form className="reg-form">
         <Form.Group className="mb-3">
            <Form.Label>Email adress</Form.Label>
            <Form.Control value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Введите email-адресс"/>
         </Form.Group>
         <Form.Group className="mb-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Введите пароль"/>
         </Form.Group>
         <Form.Group>
            <Form.Label>Выберите область</Form.Label>
         <Form.Select onChange={(e)=>setRegionID(Number(e.target.value))}>
            {regions.map(item=>(
               <option value={item.id}>{item.name}</option>
            ))}
         </Form.Select>
         </Form.Group>
         <div className="d-grid">
         <Button variant="myprimary" onClick={regButtonHandler} className="mt-3">Зарегистрироваться</Button>
         </div>
         <Alert className="mt-3" variant="danger" style={{display:error?'block':'none'}}>{response}</Alert>
      </Form>
      </Col>
      <Col></Col>
      </Row>
      </Container>
    </div>
 )   
}
import { Form,Button, Container, Row, Col, Alert } from "react-bootstrap";
import "../css/AuthPage.css"
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { login } from "../api/userApi";
import { loadUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "../interfaces/ErrorResponse";


export default function AuthPage(){
const dispatch = useDispatch();
const [email,setEmail] = useState('');
const [password,setPaswword] = useState('');
const [authError,setAuthError] = useState<any>('');
const navigate = useNavigate();
const [error,setError] = useState(false);
        if(localStorage.getItem("token")){
  return <Navigate to='/main'/>  
  }

   async function authButtonHandler(){
      if(!email || !password){
         setAuthError("Заполните все поля!")
         setError(true);
         setTimeout(()=>setError(false),5000) 
         return;
      }
      try{

      const data = await login(email,password);
      dispatch(loadUser(data));
      navigate("/main");
        
   }
   catch(error){
      if(axios.isAxiosError(error)){
         const axiosError = error as AxiosError<ErrorResponse>;
         if(axiosError.response){
            setAuthError(axiosError.response.data.message);
            setTimeout(()=>setError(false),5000) 
            setError(true);
         }
      }
   }
  }

   return(
    <div className="auth-page">
      <Container className="auth-container">
      <Row>
         <Col></Col>
         <Col md={6} >
      <Form className="auth-form">
         <Form.Group className="mb-3">
            <Form.Label>Email adress</Form.Label>
            <Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Введите email-адресс"/>
         </Form.Group>
         <Form.Group className="mb-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control type="password" value={password} onChange={(e)=>setPaswword(e.target.value)} placeholder="Введите пароль"/>
         </Form.Group>
         <div className="d-grid">
         <Button variant="myprimary" onClick={authButtonHandler} className="mt-3">Войти</Button>
         </div>
         <Alert className="mt-3" variant="danger" style={{display:error?'block':'none'}}>{authError}</Alert>
      </Form>
         </Col>
         <Col></Col>
      </Row>
      <Row>
      <Col>
      </Col>
      </Row>
</Container>
    </div>)
}
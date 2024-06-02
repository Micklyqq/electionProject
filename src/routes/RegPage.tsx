import { Button, Col, Container, Form, Row, } from "react-bootstrap";
import "../css/RegPage.css"
import "../css/MyStyles.css"
import { registration } from "../api/userApi";
import { useState } from "react";
export default function RegPage(){
 const [email,setEmail] = useState('');
 const [password,setPassword] = useState('');
 const [regionID,setRegionID] = useState(0);
 const [response,setResponse] = useState('');
 const regButtonHandler = async()=>{
   try{
      if(email && password && regionID){

      const response = await registration(email,password,regionID);
      setResponse(response);
      }
      else{
      setResponse("Все поля должны быть заполнены!");         
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
         <Form.Select>
            <option value={"Витебская область"}>Витебская область</option>
            <option value={"Могилёвская область"}>Могилёвская область</option>
            <option value={"Гомельская область"}>Гомельская область</option>
            <option value={"Минская область"}>Минская область</option>
            <option value={"Бресткая область"}>Брестская область</option>
         </Form.Select>
         </Form.Group>
         <div className="d-grid">
         <Button variant="myprimary" type="submit" className="mt-3">Зарегистрироваться</Button>
         </div>
      </Form>
      </Col>
      <Col></Col>
      </Row>
      </Container>
    </div>
 )   
}
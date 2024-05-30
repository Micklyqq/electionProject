import { Form,Button, Container, Row, Col } from "react-bootstrap";
import "../css/AuthPage.css"

export default function AuthPage(){
   return(
    <div className="auth-page">
      <Container className="auth-container">
      <Row>
         <Col></Col>
         <Col md={6}  style={{border:"1px solid black"}}>
      <Form className="auth-form">
         <Form.Group className="mb-3">
            <Form.Label>Email adress</Form.Label>
            <Form.Control type="email" placeholder="Введите email-адресс"/>
         </Form.Group>
         <Form.Group className="mb-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control type="password" placeholder="Введите пароль"/>
         </Form.Group>
         <div className="d-grid">
         <Button variant="myprimary" type="submit" className="mt-3">Войти</Button>
         </div>
      </Form>
         </Col>
         <Col></Col>
      </Row>
</Container>
    </div>)
}
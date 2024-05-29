import { Form,Button } from "react-bootstrap";

export default function AuthPage(){
   return(
    <div className="reg-page">
      <Form className="reg-form">
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
    </div>)
}
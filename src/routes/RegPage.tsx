import { Button, Form, } from "react-bootstrap";
import "../css/RegPage.css"
import "../css/MyButtons.css"
export default function RegPage(){
 return (
    <>
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
         <Form.Group className="mb-3">
            <Form.Label>Серийный номер паспорта</Form.Label>
            <Form.Control type="text" placeholder="Введите серийный номер паспорта"/>
         </Form.Group>
         <Form.Group>
            <Form.Label>Выберите область</Form.Label>
         <Form.Select>
            <option>Витебская область</option>
            <option>Могилёвская область</option>
            <option>Гомельская область</option>
            <option>Минская область</option>
            <option>Брестская область</option>
         </Form.Select>
         </Form.Group>
         <div className="d-grid">
         <Button variant="myprimary" type="submit" className="mt-3">Зарегистрироваться</Button>
         </div>
      </Form>
    </div>
    </>
 )   
}
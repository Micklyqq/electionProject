import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import vtbBack from "../assets/img/vitebskBackground.png"
import bosinka from "../assets/img/bosinka.png"
import maslak from "../assets/img/maslak.png"
import podnebes from "../assets/img/podnebes.png"
import "../css/MyStyles.css"
import "../css/ElectionPage.css" 
export default function ELectionPage(){
    return(
        <>
        <NavigationBar/>
    <div className="election-page">
      <Container className="mt-5">
       <Row>
        <Col>
       <h1>Выборы в городскую думу Витебска</h1> 
        </Col>
        </Row> 
        <Row className="mt-3">
            <Col>
            <Image style={{maxWidth:"100%"}} src={vtbBack}/>
            </Col>
        </Row>
        <Row>
            <Col md={1}></Col>
            <Col className="elect-description mt-3">
            <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?</p>
            </Col>
            <Col md={2}></Col>
        </Row>
        <Row>
            <Col className="mt-3">
            <h2>Список кандидатов</h2>
            </Col>
        </Row>
        <Row className="mt-2">
            <Col>
           <h3>Выберите одного из кандидатов за которого хотите проголосовать</h3> 
            </Col>
        </Row>
        <Row className="mt-3">
            <Col>
            <Card style={{width:"18rem"}}>
           <Card.Img src={bosinka}/>
            <Card.Body>
                <Card.Title>Босин Боська Олегович</Card.Title>
                <Card.Text>Директор №2 г.Витебска</Card.Text>
                <Button variant="myprimary">Проголосовать</Button>
            </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card style={{width:"18rem"}}>
           <Card.Img src={maslak}/>
            <Card.Body>
                <Card.Title>Маслаков Ванька Ваномасович</Card.Title>
                <Card.Text>Директор №2 г.Витебска</Card.Text>
                <Button variant="myprimary">Проголосовать</Button>
            </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card style={{width:"18rem"}}>
           <Card.Img src={podnebes}/>
            <Card.Body>
                <Card.Title>Поднебесный Алексей Инцелович</Card.Title>
                <Card.Text>Директор №2 г.Витебска</Card.Text>
                <Button variant="myprimary">Проголосовать</Button>
            </Card.Body>
            </Card>
            </Col>
        </Row>
        </Container>  
    </div>
    </>
    )
}
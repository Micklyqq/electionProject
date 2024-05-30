import { Button, Card, Col, Container, Row } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar"
import VtbTownhall from "../assets/img/vitebsk_townhall.png"
import "../css/MainPage.css"
import "../css/MyStyles.css"
import { useNavigate } from "react-router-dom";
export default function MainPage(){
    const navigate = useNavigate();
    return(
        <>
        <NavigationBar/>
        <div className="main-page">
            <Container className="mt-5 p-5">
                <Row>
                    <Col><h1>Актуальные выборные процессы в вашем регионе</h1></Col>
                </Row>
                <Row>
                    <Col md={3}>
                    <Card className="bg-light mt-3">
                        <Card.Header>22/03/2024 - 25/03/2024</Card.Header>
                        <Card.Body>
                        <Card.Img variant="top" src={VtbTownhall}/>
                        <Card.Title className="fw-bold ">Выбору в городскую думу</Card.Title>
                        <Card.Text className="">
                            Внеочередные выборы в городскую думу города Витебск
                        </Card.Text>
                        <Button onClick={()=>navigate("/election")} variant="myprimary" >Проголосовать</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col md={3}>
                    <Card className="bg-light mt-3">
                        <Card.Header>22/03/2024 - 25/03/2024</Card.Header>
                        <Card.Body>
                        <Card.Img variant="top" src={VtbTownhall}/>
                        <Card.Title className="fw-bold ">Выбору в городскую думу</Card.Title>
                        <Card.Text className="">
                            Внеочередные выборы в городскую думу города Витебск
                        </Card.Text>
                        <Button onClick={()=>navigate("/election")} variant="myprimary" >Проголосовать</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col md={3}>
                    <Card className="bg-light mt-3">
                        <Card.Header>22/03/2024 - 25/03/2024</Card.Header>
                        <Card.Body>
                        <Card.Img variant="top" src={VtbTownhall}/>
                        <Card.Title className="fw-bold ">Выбору в городскую думу</Card.Title>
                        <Card.Text className="">
                            Внеочередные выборы в городскую думу города Витебск
                        </Card.Text>
                        <Button onClick={()=>navigate("/election")} variant="myprimary" >Проголосовать</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col md={3}>
                    <Card className="bg-light mt-3">
                        <Card.Header>22/03/2024 - 25/03/2024</Card.Header>
                        <Card.Body>
                        <Card.Img variant="top" src={VtbTownhall}/>
                        <Card.Title className="fw-bold ">Выбору в городскую думу</Card.Title>
                        <Card.Text className="">
                            Внеочередные выборы в городскую думу города Витебск
                        </Card.Text>
                        <Button onClick={()=>navigate("/election")} variant="myprimary" >Проголосовать</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col md={3}>
                    <Card className="bg-light mt-3">
                        <Card.Header>22/03/2024 - 25/03/2024</Card.Header>
                        <Card.Body>
                        <Card.Img variant="top" src={VtbTownhall}/>
                        <Card.Title className="fw-bold ">Выбору в городскую думу</Card.Title>
                        <Card.Text className="">
                            Внеочередные выборы в городскую думу города Витебск
                        </Card.Text>
                        <Button onClick={()=>navigate("/election")} variant="myprimary" >Проголосовать</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col md={3}>
                    <Card className="bg-light mt-3">
                        <Card.Header>22/03/2024 - 25/03/2024</Card.Header>
                        <Card.Body>
                        <Card.Img variant="top" src={VtbTownhall}/>
                        <Card.Title className="fw-bold ">Выбору в городскую думу</Card.Title>
                        <Card.Text className="">
                            Внеочередные выборы в городскую думу города Витебск
                        </Card.Text>
                        <Button onClick={()=>navigate("/election")} variant="myprimary" >Проголосовать</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col md={3}>
                    <Card className="bg-light mt-3">
                        <Card.Header>22/03/2024 - 25/03/2024</Card.Header>
                        <Card.Body>
                        <Card.Img variant="top" src={VtbTownhall}/>
                        <Card.Title className="fw-bold ">Выбору в городскую думу</Card.Title>
                        <Card.Text className="">
                            Внеочередные выборы в городскую думу города Витебск
                        </Card.Text>
                        <Button onClick={()=>navigate("/election")} variant="myprimary" >Проголосовать</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col md={3}>
                    <Card className="bg-light mt-3">
                        <Card.Header>22/03/2024 - 25/03/2024</Card.Header>
                        <Card.Body>
                        <Card.Img variant="top" src={VtbTownhall}/>
                        <Card.Title className="fw-bold ">Выбору в городскую думу</Card.Title>
                        <Card.Text className="">
                            Внеочередные выборы в городскую думу города Витебск
                        </Card.Text>
                        <Button onClick={()=>navigate("/election")} variant="myprimary" >Проголосовать</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col md={3}>
                    <Card className="bg-light mt-3">
                        <Card.Header>22/03/2024 - 25/03/2024</Card.Header>
                        <Card.Body>
                        <Card.Img variant="top" src={VtbTownhall}/>
                        <Card.Title className="fw-bold ">Выбору в городскую думу</Card.Title>
                        <Card.Text className="">
                            Внеочередные выборы в городскую думу города Витебск
                        </Card.Text>
                        <Button onClick={()=>navigate("/election")} variant="myprimary" >Проголосовать</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    );
}
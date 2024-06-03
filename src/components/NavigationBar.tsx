
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import BelFlag from "../assets/img/bel-flag.png"
import { useNavigate } from "react-router-dom";
export default function NavigationBar(){
    const exit = ()=>{
        localStorage.removeItem('token');
        navigate('/')
    }
    const navigate = useNavigate();
            return (
            <>
            <Navbar style={{backgroundColor: "#e3f2fd"}} >
                <Container>
                    <Navbar.Brand href="/main">Выборы   <Image rounded src={BelFlag} style={{maxWidth:"15%"}}></Image></Navbar.Brand>
                    <Nav className="me-auto" >
                        <Nav.Link onClick={()=>navigate("/main")}>Главная</Nav.Link>
                        <Nav.Link>О сайте</Nav.Link>
                        <Nav.Link>Профиль</Nav.Link>
                        <Nav.Link onClick={()=>exit()} >Выход</Nav.Link>
                    </Nav>
                    </Container>
            </Navbar>
            </>)
}
import { Alert, Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar"
import VtbTownhall from "../assets/img/vitebsk_townhall.png"
import "../css/MainPage.css"
import "../css/MyStyles.css"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { Election } from "../interfaces/Election";
import { createElection, getElections } from "../api/electionApi";
import { nanoid } from "nanoid";
export default function MainPage(){
    const regions = useSelector((state:RootState)=>state.regions.value);
        const user = useSelector((state:RootState)=>state.users.value);
    const [election,setElection]=useState<Election[]>([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [modalError,setModalError] = useState('')
    useEffect(() => {
      const fetchData= async()=>{
      try {
                if(user.regionID){
        const data:Election[] = await getElections(user.regionID)
        if(data){
            setElection(data);
        }
        }
      } catch (error) {
        console.log(error)
      }
      }

      fetchData();
    
    }, [])
    const navigate = useNavigate();

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [regionID,setRegionID] = useState(1);
    const [startDate,setStartDate] = useState('');
    const [endDate,setEndDate] = useState('');
    const createElectionHandler = async ()=>{
       if(!title || !description || !startDate || !endDate){
        setModalError("Нужно заполнить все поля!");
       setTimeout(()=>setModalError(''),5000) 
        return;
       } 
        const date = `${startDate} - ${endDate}`        


       const response = await createElection(title,description,regionID,date) 
       if(response){
      navigate('/election/'+response.id); 
       }
       else{
        setModalError(response)
       }
    }


    return(
        <>
        <NavigationBar/>
        {user.role!==undefined && user.role==="USER"?
            (
                <div className="main-page user" >
                <Container className="mt-5 p-5">
                    <Row>
                        <Col><h1>Актуальные выборные процессы в вашем регионе</h1></Col>
                    </Row>
                    <Row key={nanoid()}>
                    {election.length>0 && election.map(item=>(
                        <Col md={3} key={item.id}>
                        <Card className="bg-light mt-3">
                            <Card.Header>{item.date}</Card.Header>
                            <Card.Body>
                            <Card.Img variant="top" src={VtbTownhall}/>
                            <Card.Title className="fw-bold ">{item.title}</Card.Title>
                            <Card.Text className="">{item.description}</Card.Text>
                            <Button onClick={()=>navigate("/election/"+item.id)} variant="myprimary" >Проголосовать</Button>
                            </Card.Body>
                        </Card>
                        </Col>
                    ))}
                    </Row>
                </Container>
            </div>
            ):
            (

        <div className="main-page admin">
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Создание выборного процесса</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="Form.ControlInput1">
              <Form.Label>Заголовок</Form.Label>
              <Form.Control
                type="text"
                placeholder="Выборы в госдуму"
                autoFocus
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="Form.ControlTextarea1"
            >
              <Form.Label>Описание</Form.Label>
              <Form.Control 
              value={description}
              onChange={(e)=>setDescription(e.target.value)} 
              as="textarea" rows={3} />
            </Form.Group>
            <Form.Group>
            <Form.Label>Выберите область</Form.Label>
         <Form.Select onChange={(e)=>setRegionID(Number(e.target.value))}>
            {regions.map(item=>(
               <option key={nanoid()} value={item.id}>{item.name}</option>
            ))}
         </Form.Select>
         </Form.Group>
         <Form.Group>
            <Form.Label>Выберите дату проведения</Form.Label>
            <Form.Control value={startDate} onChange={(e)=>setStartDate(e.target.value)} type="date"/>
            <Form.Control value={endDate} onChange={(e)=>setEndDate(e.target.value)} type="date"/>
         </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
            <Alert variant="danger" style={{display: modalError ? 'block' : 'none'}}>{modalError}</Alert>
          <Button variant="secondary" onClick={handleClose}>
           Назад 
          </Button>
          <Button variant="myprimary" onClick={createElectionHandler}>
           Добавить 
          </Button>
        </Modal.Footer>
      </Modal>
            <Container className="mt-5 p-5">
                <Row>
                    <Col><h1>Актуальные выборные процессы в вашем регионе</h1></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col style={{paddingRight:"8vw"}}>
                    <Button onClick={handleShow}  variant="myprimary" style={{width:"15vw"}}>Создать</Button>
                    </Col>
                </Row>
                <Row key={nanoid()}>
                {election.length>0 && election.map(item=>(
                    <Col md={3} key={item.id}>
                    <Card className="bg-light mt-3">
                        <Card.Header>{item.date}</Card.Header>
                        <Card.Body>
                        <Card.Img variant="top" src={VtbTownhall}/>
                        <Card.Title className="fw-bold ">{item.title}</Card.Title>
                        <Card.Text className="">{item.description}</Card.Text>
                        <Button onClick={()=>navigate("/election/"+item.id)} variant="myprimary" >Проголосовать</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
                </Row>
            </Container>
        </div>
            )
        }

        </>
    );
}
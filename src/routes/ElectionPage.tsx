import {Alert, Button, Card, Col, Container, Form, Image, Modal, Row } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import vtbBack from "../assets/img/vitebskBackground.png"
import bosinka from "../assets/img/bosinka.png"
import "../css/MyStyles.css"
import "../css/ElectionPage.css"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addVote, getOneElection, getVote } from "../api/electionApi";
import { Election } from "../interfaces/Election";
import { createCandidate, getAllCandidates } from "../api/candidateApi";
import { Candidate } from "../interfaces/Candidate";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import AlertComponent from "../components/AlertComponent";

export default function ELectionPage(){
   const {id} = useParams<{id:string}>(); 
    const [election,setElection] = useState<Election>(Object)
    const [candidates,setCandidates] = useState<Candidate[]>([]);
    const user = useSelector((state:RootState)=>state.users.value);
    const [showSuccess,setShowSuccess] = useState(false);
    const [showError,setShowError] = useState(false);
    const [modalError,setModalError] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [refetch,setRefetch] = useState(false);
    useEffect(() => {
    const fetch = async()=>{
    try{
        const data = await getOneElection(Number(id));
        const candidate:Candidate[] = await getAllCandidates(Number(id));
        if(data.id){
            setElection(data);
        }
        if(candidate.length>0){
            setCandidates(candidate);
        }
    }
    catch(error){
        console.log(error);
    }
    }  
    
    fetch();
    }, [id,refetch])
   
    async function voteFunc (electionID:number,candidateID:number){
        if(user.id){

        const checkVote = await getVote(user.id,electionID);
        if(Object.keys(checkVote).length>0){
            setShowError(true);
            setTimeout(() => setShowError(false), 5000);
        }

        else{
            const vote = await addVote(electionID,user.id,candidateID);
            setRefetch(!refetch);
            setShowSuccess(true);
        }
        }
    }

    const createCandidateHandler= async ()=>{
        if(!fullname|| !description || !party || !id){
 
         alert(party)
         setModalError("Нужно заполнить все поля!");
        setTimeout(()=>setModalError(''),5000) 
         return;
        } 
 
        const response = await createCandidate(fullname,description,Number(id),party) 
        if(response){
            handleClose()
            setRefetch(!refetch);
        }
        else{
         setModalError(response)
        }
     }


const [fullname,setFullName] = useState('');
const [description,setDescription] = useState('');
const [party,setParty] = useState('');

    return(
        <>
        <NavigationBar/>
        {
           user.role!== undefined && user.role==='USER'?(
                <div className="election-page user" >
                <Container className="mt-5">
                 <Row>
                  <Col>
                 <h1>{election.title}</h1> 
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
                      <p>{election.description}</p>
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
                  <AlertComponent successMessage="Голос защитан!"
                  errorMessage="Вы уже проголосовали!"
                  showSuccess={showSuccess}
                  showError={showError}
                  />
                  <Row className="mt-3">
                  {candidates.map(item=>(
                      <Col className="mt-3" key={nanoid()}>
                      <Card style={{width:"18rem"}}>
                     <Card.Img src={bosinka}/>
                      <Card.Body>
                          <Card.Title>{item.fullname}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">Партия: {item.party}</Card.Subtitle>
                          <Card.Subtitle className="mb-2 text-muted">Голоса: {item.votes}</Card.Subtitle>
                          <Card.Text>{item.description}</Card.Text>
                          <Button variant="myprimary" onClick={()=>voteFunc(item.electionID,item.id)}>Проголосовать</Button>
                      </Card.Body>
                      </Card>
                      </Col>
                  ))}
                  </Row>
                  </Container>  
              </div>

            ):
            (

    <div className="election-page admin" >
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Создание выборного процесса</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="Form.ControlInput1">
              <Form.Label>Полное имя кандидата</Form.Label>
              <Form.Control
                type="text"
                placeholder="Пётр Васильевич Лосев"
                autoFocus
                value={fullname}
                onChange={(e)=>setFullName(e.target.value)}
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
            <Form.Label>Укажите партию кандидата</Form.Label>
         <Form.Control placeholder="Беспартийный" type="text" value={party} onChange={(e)=>setParty(e.target.value)}/>
         </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
            <Alert variant="danger" style={{display: modalError ? 'block' : 'none'}}>{modalError}</Alert>
          <Button variant="secondary" onClick={handleClose}>
           Назад 
          </Button>
          <Button variant="myprimary" onClick={createCandidateHandler}>
           Добавить 
          </Button>
        </Modal.Footer>
      </Modal>
      <Container className="mt-5">
       <Row>
        <Col>
       <h1>{election.title}</h1> 
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
            <p>{election.description}</p>
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
        <AlertComponent successMessage="Голос защитан!"
        errorMessage="Вы уже проголосовали!"
        showSuccess={showSuccess}
        showError={showError}
        />
                        <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col style={{paddingRight:"8vw"}}>
                    <Button onClick={handleShow}  variant="myprimary" style={{width:"15vw"}}>Добавить</Button>
                    </Col>
                </Row>
        <Row className="mt-3">
        {candidates.map(item=>(
            <Col md={3} className="mt-3" key={nanoid()}>
            <Card style={{width:"18rem"}}>
           <Card.Img src={bosinka}/>
            <Card.Body>
                <Card.Title>{item.fullname}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Партия: {item.party}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Голоса: {item.votes}</Card.Subtitle>
                <Card.Text>{item.description}</Card.Text>
                <Button variant="myprimary" onClick={()=>voteFunc(item.electionID,item.id)}>Проголосовать</Button>
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
    )
}
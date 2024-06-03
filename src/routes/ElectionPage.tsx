import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import vtbBack from "../assets/img/vitebskBackground.png"
import bosinka from "../assets/img/bosinka.png"
import maslak from "../assets/img/maslak.png"
import podnebes from "../assets/img/podnebes.png"
import "../css/MyStyles.css"
import "../css/ElectionPage.css"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneElection } from "../api/electionApi";
import { Election } from "../interfaces/Election";
import { getAllCandidates } from "../api/candidateApi";
import { Candidate } from "../interfaces/Candidate";

export default function ELectionPage(){
   const {id} = useParams<{id:string}>(); 
    const [election,setElection] = useState<Election>(Object)
    const [candidates,setCandidates] = useState<Candidate[]>([]);
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
    }, [])
    
    return(
        <>
        <NavigationBar/>
    <div className="election-page">
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
        <Row className="mt-3">
        {candidates.map(item=>(
            <Col className="mt-3">
            <Card style={{width:"18rem"}}>
           <Card.Img src={bosinka}/>
            <Card.Body>
                <Card.Title>{item.fullname}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Партия: {item.party}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Голоса: {item.votes}</Card.Subtitle>
                <Card.Text>{item.description}</Card.Text>
                <Button variant="myprimary">Проголосовать</Button>
            </Card.Body>
            </Card>
            </Col>
        ))}
        </Row>
        </Container>  
    </div>
    </>
    )
}
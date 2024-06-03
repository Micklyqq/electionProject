import { Button, Card, Col, Container, Row } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar"
import VtbTownhall from "../assets/img/vitebsk_townhall.png"
import "../css/MainPage.css"
import "../css/MyStyles.css"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { Election } from "../interfaces/Election";
import { getElections } from "../api/electionApi";
export default function MainPage(){
        const user = useSelector((state:RootState)=>state.users.value);
    const [election,setElection]=useState<Election[]>([])
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
    return(
        <>
        <NavigationBar/>
        <div className="main-page">
            <Container className="mt-5 p-5">
                <Row>
                    <Col><h1>Актуальные выборные процессы в вашем регионе</h1></Col>
                </Row>
                <Row>
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
        </>
    );
}
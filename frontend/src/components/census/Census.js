import React from 'react';
import { Alert, Form, Row, Col, Table, Container, Button } from 'react-bootstrap'
import PersonRow from './person-row/PersonRow.js'
import './Census.css';


class Census extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            surname: "",
            person_list: [],
            alert_variant: "",
            alert_message: "",
            alert_show: false
        }
    }

    componentDidMount() {
        this.fetchPeople()
    }

    render() {
        let alert;
        if (this.state.alert_show) {
            alert = <Alert variant={this.state.alert_variant} dismissible onClose={() => this.setState({alert_show: false})}><p>{this.state.alert_message}</p></Alert> 
        }
        return (
            <Container>
            <Container>
            {alert}
            </Container>

            <Container>
            <Form>
            <Row>
                <Col>
                <Form.Control onChange={this.handleChange} placeholder="First name" name="name" value={this.state.name} />
                </Col>
                <Col>
                <Form.Control onChange={this.handleChange} placeholder="Last name" name="surname" value={this.state.surname} />
                </Col>
                <Col>
                <Button onClick={this.submitNewPerson}>Add Person</Button>
                </Col>
            </Row>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.person_list.map((person, i) => 
                        <PersonRow key={i} id={person.id} name={person.name} surname={person.surname} url={person.url} fetchPeople={this.fetchPeople} displayMessage={this.displayMessage}/>
                    )}
                </tbody>
            </Table>
            </Container>
            </Container>

        )
    }

    displayMessage = (variant, message) => {
        this.setState({
            alert_variant: variant,
            alert_message: message,
            alert_show: true
        })
    }

    fetchPeople = () => {
        const axios = require('axios')
        axios.get('http://127.0.0.1:8000/person/')
        .then((response) => {

            this.setState( {
                person_list: response.data
            })


        })
        .catch((e) => {
            this.displayMessage("danger", "Could not connect to the database :(.")
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitNewPerson = () => {
        const name = this.state.name
        const surname = this.state.surname

        if (name !== "" && surname !== "") {
            const axios = require('axios');

            const data = new FormData()
            data.append('name', this.state.name)
            data.append('surname', this.state.surname)

            axios.post('http://127.0.0.1:8000/person/', data)
            .then(() => {
                this.displayMessage("success", "Person has been succesfully added.")
                this.fetchPeople()
            })
            .catch((e) => {
                this.displayMessage("danger", "Could not add new person to the database, try again later.")
            })

        }

        this.setState({
            name: "",
            surname: ""
        })

    }

}

export default Census
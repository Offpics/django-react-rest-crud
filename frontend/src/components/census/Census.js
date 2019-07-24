import React from 'react';
import { Form, Row, Col, Table, Container, Button } from 'react-bootstrap'
import PersonRow from './person-row/PersonRow.js'
import './Census.css';


class Census extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            surname: "",
            person_list: [],
        }
    }

    componentDidMount() {
        this.fetchPeople()
    }

    render() {
        return (
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
                        <PersonRow key={i} id={person.id} name={person.name} surname={person.surname} url={person.url} fetchPeople={this.fetchPeople}/>
                    )}
                </tbody>
            </Table>
            </Container>

        )
    }

    fetchPeople = () => {
        const axios = require('axios')
        axios.get('http://127.0.0.1:8000/person/')
        .then((response) => {

            this.setState( {
                person_list: response.data
            })

        })
        console.log(this.state.person_list)
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
                this.fetchPeople()
            })

        }

        this.setState({
            name: "",
            surname: ""
        })

    }

}

export default Census
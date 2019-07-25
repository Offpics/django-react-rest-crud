import React from 'react'
import { Button, Form } from 'react-bootstrap'
import './PersonRow.css';


class PersonRow extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
            surname: this.props.surname
        }
    }

    render() {
        return(
            <tr>
            <td>{this.props.id}</td>
            <td>
            <Form.Control value={this.state.name} name="name" onChange={this.handleChange} />
            </td>
            <td>
            <Form.Control value={this.state.surname} name="surname" onChange={this.handleChange} />
            </td>
            <td>
                <Button onClick={this.handlePatch} variant="primary" className="buttonMargin">Patch</Button>
                <Button onClick={this.deletePerson} variant="danger">Delete</Button>
            </td>
            </tr>

        )
    }

    handlePatch = () => {
        const axios = require('axios');

        const data = new FormData()
        data.append('name', this.state.name)
        data.append('surname', this.state.surname)

        axios.patch(this.props.url, data)
        .then(() => {
            this.props.fetchPeople()
            this.props.displayMessage("success", `Person of id=${this.props.id} has been updated.`)
        })
        .catch((e) => {
            this.props.displayMessage("danger", `Person of id=${this.props.id} has not been updated.`)
        })

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    deletePerson = () => {
        const axios = require('axios')

        axios.delete(this.props.url)
        .then(() => {
            this.props.fetchPeople()
            this.props.displayMessage("success", `Person of id=${this.props.id} has been deleted.`)
        })
        .catch((e) => {
            this.props.displayMessage("danger", `Person of id=${this.props.id} has not been deleted.`)
        })

    }
}

export default PersonRow
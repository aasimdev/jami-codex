import axios from 'axios';
import { API_BASE_URL } from 'const/apiConst';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardText,
    FormGroup,
    Form,
    Input,
    Row,
    Col
} from "reactstrap";

const NewRole = () => {

    const options = [
        {
            label: "Admin",
            value: "Admin",
        },
        {
            label: "Editor",
            value: "Editor",
        },
        {
            label: "Maintenance",
            value: "Maintenance",
        },
    ];

    const [state, setState] = useState('');

    let history = useHistory();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value
        }))
    }

    const loggedID = localStorage.getItem('id');


    const payload = {
        'name': state.role,
        'user_id': loggedID
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        axios.post(API_BASE_URL + 'api/role/create-role', payload)
            .then(function (res) {
                if (res.status === 200) {
                    toast.success("New role has been created");
                    history.push('/admin/role');
                }
                else {
                    history.push('/admin/new-role');
                }
            })
            .catch(function (error) {
                toast.error("Something is wrong");
                console.log(error);
            })
    }

    return (
        <div className="content">
            <Card className='cardHeightFix'>
                <CardHeader>
                    <h5 className="title">New Role</h5>
                </CardHeader>
                <CardBody>
                    <Form>
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <label htmlFor="role">
                                        Role
                                    </label>
                                    <Input
                                        id="role"
                                        name="select"
                                        type="select"
                                        value={state.role}
                                        onChange={handleChange}
                                    >
                                        <option>
                                            Please select role
                                        </option>
                                        {options.map((option) => (
                                            <option value={option.value}>{option.label}</option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
                <CardFooter>
                    <Button className="btn-fill" onClick={handleSubmitClick} color="primary" type="submit">
                        Save
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default NewRole
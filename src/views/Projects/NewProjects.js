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

    const [state, setState] = useState('');

    let history = useHistory();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value
        }))
    }


    const payload = {
        'name': state.name,
        'start_date': state.start_date,
        'end_date': state.end_date,
        'status': state.status
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        axios.post(API_BASE_URL + 'api/project/create', payload)
            .then(function (res) {
                if (res.status === 200) {
                    toast.success("New project has been created");
                    history.push('/admin/projects');
                }
                else {
                    history.push('/admin/new-project');
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
                    <h5 className="title">New Project</h5>
                </CardHeader>
                <CardBody>
                    <Form>
                        <Row>
                            <Col md="12">
                                <FormGroup>
                                    <label>Name</label>
                                    <Input
                                        placeholder="Name"
                                        type="text"
                                        id='name'
                                        value={state.name}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup>
                                    <label>Start date</label>
                                    <Input
                                        placeholder="Start date"
                                        type="date"
                                        id='start_date'
                                        value={state.start_date}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup>
                                    <label>End date</label>
                                    <Input
                                        placeholder="End date"
                                        type="date"
                                        id='end_date'
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup>
                                    <label htmlFor="status">
                                        Status
                                    </label>
                                    <Input
                                        id="status"
                                        name="status"
                                        type="select"
                                        value={state.status}
                                        onChange={handleChange}
                                    >
                                        <option>
                                            Pending
                                        </option>
                                        <option>
                                            In progress
                                        </option>
                                        <option>
                                            Testing
                                        </option>
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
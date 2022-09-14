import React from 'react'

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

const EditRole = () => {
    return (
        <div className="content">
            <Card className='cardHeightFix'>
                <CardHeader>
                    <h5 className="title">Edit Project</h5>
                </CardHeader>
                <CardBody>
                    <Form>
                        <Row>
                            <Col md="12">
                                <FormGroup>
                                    <label>Name</label>
                                    <Input
                                        defaultValue="Asim Hameed"
                                        placeholder="Name"
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup>
                                    <label>Start date</label>
                                    <Input
                                        defaultValue="6/09/2022"
                                        placeholder="Start date"
                                        type="date"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup>
                                    <label>End date</label>
                                    <Input
                                        placeholder="End date"
                                        type="date"
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
                    <Button className="btn-fill" color="primary" type="submit">
                        Save
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default EditRole
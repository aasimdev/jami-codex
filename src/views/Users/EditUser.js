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

const EditUser = () => {
    return (
        <div className="content">
            <Card className='cardHeightFix'>
                <CardHeader>
                    <h5 className="title">Edit Role</h5>
                </CardHeader>
                <CardBody>
                    <Form>
                        <Row>
                            <Col md="6">
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
                                    <label htmlFor="role">
                                        Role
                                    </label>
                                    <Input
                                        id="role"
                                        name="select"
                                        type="select"
                                    >
                                        <option>
                                            Admin
                                        </option>
                                        <option>
                                            Editor
                                        </option>
                                        <option>
                                            Maintenance
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

export default EditUser
import React from 'react'
import { Container, FormGroup, Row, Col, Input, Card, CardHeader, CardBody, Form, CardFooter, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

// Logo
import Logo from '../assets/img/Logo.svg'

const Signup = () => {
    return (
        <div className='loginWrap'>
            <Container>
                <Row className='justify-content-center'>
                    <Col md={5}>

                        <div className='accountMain'>
                            <div className='accountMain__header'>
                                <img src={Logo} alt="logo" />
                            </div>
                            <Card>
                                <CardHeader>
                                    <h5 className="title">Sign up</h5>
                                </CardHeader>
                                <CardBody className='pb-0'>
                                    <Form>
                                        <FormGroup>
                                            <label>First Name</label>
                                            <Input
                                                placeholder="First Name"
                                                type="text"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <label>Last Name</label>
                                            <Input
                                                placeholder="Last Name"
                                                type="text"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <label>Email</label>
                                            <Input
                                                placeholder="email@gmail.com"
                                                type="email"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <label>Phone No.</label>
                                            <Input
                                                placeholder="123456789"
                                                type="tel"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <label>Password</label>
                                            <Input
                                                placeholder="password"
                                                type="password"
                                            />
                                        </FormGroup>
                                    </Form>
                                </CardBody>
                                <CardFooter className='pt-0'>
                                    <Button className="btn-fill" color="primary" type="submit">
                                        Sign Up
                                    </Button>
                                    <div className='accTitle'>
                                        <Link to="/login">Already has account? Sign In</Link>
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Signup
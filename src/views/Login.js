import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE_URL, ACCESS_TOKEN_NAME } from 'const/apiConst'
import { useHistory } from 'react-router-dom'
import { Container, FormGroup, Row, Col, Input, Card, CardHeader, CardBody, Form, CardFooter, Button } from 'reactstrap'

// Logo
import Logo from '../assets/img/Logo.svg'

const Login = () => {

    const [state, setState] = useState({
        email: "",
        password: ""
    });

    let history = useHistory();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value
        }))
    }


    const handleSubmitClick = (e) => {
        e.preventDefault();

        const payload = {
            "email": state.email,
            "password": state.password
        }

        axios.post(API_BASE_URL + 'api/user/signin', payload)
            .then(function (res) {
                if (res.status === 200) {
                    localStorage.setItem("name", res.data.data.firstname);
                    localStorage.setItem("email", res.data.data.email);
                    localStorage.setItem("id", res.data.data.id);
                    localStorage.setItem(ACCESS_TOKEN_NAME, res.data.data.token);
                    localStorage.setItem("is_admin", res.data.data.is_admin);
                    history.push('/admin/dashboard');
                    window.location.reload();
                }
                else {
                    history.push('/');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


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
                                    <h5 className="title">Sign in</h5>
                                </CardHeader>
                                <CardBody className='pb-0'>
                                    <Form>
                                        <FormGroup>
                                            <label>Username</label>
                                            <Input
                                                placeholder="email@gmail.com"
                                                type="email"
                                                value={state.email}
                                                id="email"
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <label>Password</label>
                                            <Input
                                                placeholder="password"
                                                type="password"
                                                id="password"
                                                value={state.password}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Form>
                                </CardBody>
                                <CardFooter className='pt-0'>
                                    <Button className="btn-fill" onClick={handleSubmitClick} color="primary" type="submit">
                                        Sign In
                                    </Button>
                                    {/* <div className='accTitle'>
                                        <Link to="/signup">Create a new account</Link>
                                    </div> */}
                                </CardFooter>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login
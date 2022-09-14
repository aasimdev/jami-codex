import axios from 'axios';
import { API_BASE_URL } from 'const/apiConst';
import { func } from 'prop-types';
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
    Col,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    CardTitle
} from "reactstrap";

const NewUser = () => {
    const [activeTab, setActiveTab] = useState('1');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [designation, setDesignation] = useState('');
    const [phone, setPhone] = useState('');
    const [countrycode, setCountrycode] = useState('');
    const [country, setCountry] = useState('');
    const [newId, setNewId] = useState('');

    let history = useHistory();


    const emailnusernameHandle = (e) => {
        setEmail(e.target.value);
        var getUsername = email.split("@")[0];
        setUsername(getUsername);
    }



    const signupPayload = {
        "firstname": firstname,
        "lastname": lastname,
        "username": username,
        "email": email,
        "country": country,
        "country_code": countrycode,
        "password": password,
        "phone": phone
    }

    const manageRolePayload = {
        "user_id": newId,
        "role_id": designation
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        axios.post(API_BASE_URL + "api/user/signup", signupPayload)
            .then(function (res) {
                setNewId(res.data.data.id);
            }).catch(function (error) {
                console.log(error);
            });

        axios.post(API_BASE_URL + "api/role/manage-role", manageRolePayload)
            .then(function (res) {
                if (res.status === 200) {
                    toast.success("New user has been created");
                    history.push('/admin/users');

                }
            }).catch(function (error) {
                console.log(error);
                toast.error("Something is wrong");
            })

    }



    return (
        <div className="content">
            <div className='theme-tabs'>
                <Nav pills>
                    <NavItem>
                        <NavLink className={activeTab == '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                            New User
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={activeTab == '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                            Invite User
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Card className='cardHeightFix'>
                            <CardHeader>
                                <h5 className="title">New User</h5>
                            </CardHeader>
                            <CardBody>
                                <Form autoComplete='off'>
                                    <Row>
                                        <Col md="6">
                                            <FormGroup>
                                                <label>First Name</label>
                                                <Input
                                                    type="text"
                                                    id="firstname"
                                                    value={firstname}
                                                    onChange={(e) => setFirstname(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <label>Last Name</label>
                                                <Input
                                                    type="text"
                                                    id="lastname"
                                                    value={lastname}
                                                    onChange={(e) => setLastname(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <label>Email</label>
                                                <Input
                                                    type="email"
                                                    id="email"
                                                    value={email}
                                                    onChange={emailnusernameHandle}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <label>Username</label>
                                                <Input
                                                    type="text"
                                                    id="username"
                                                    value={username}
                                                    readOnly
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <label>Password</label>
                                                <Input
                                                    type="password"
                                                    id="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <label htmlFor="designation">
                                                    Designation
                                                </label>
                                                <Input
                                                    id="designation"
                                                    type="select"
                                                    value={designation}
                                                    onChange={(e) => setDesignation(e.target.value)}
                                                >
                                                    <option>
                                                        Please select
                                                    </option>
                                                    <option value="1">
                                                        QA
                                                    </option>
                                                    <option value="2">
                                                        Editor
                                                    </option>
                                                    <option value="3">
                                                        Maintenance
                                                    </option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <label>Phone</label>
                                                <Input
                                                    type="tel"
                                                    id="phone"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <label>Country Code</label>
                                                <Input
                                                    type="text"
                                                    id="country_code"
                                                    value={countrycode}
                                                    onChange={(e) => setCountrycode(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <label>Country</label>
                                                <Input
                                                    type="text"
                                                    id="country"
                                                    value={country}
                                                    onChange={(e) => setCountry(e.target.value)}
                                                />
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
                    </TabPane>
                    <TabPane tabId="2">
                        <Card className='cardHeightFix'>
                            <CardHeader>
                                <h5 className="title">Invite User</h5>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col md="6">
                                            <FormGroup>
                                                <label>First Name</label>
                                                <Input
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <label>Last Name</label>
                                                <Input
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <label>Email</label>
                                                <Input
                                                    type="email"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <label>Username</label>
                                                <Input
                                                    type="username"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <label htmlFor="designation">
                                                    Designation
                                                </label>
                                                <Input
                                                    id="designation"
                                                    name="select"
                                                    type="select"
                                                >
                                                    <option>
                                                        Editor
                                                    </option>
                                                    <option>
                                                        Maintenance
                                                    </option>
                                                    <option>
                                                        QA
                                                    </option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <label>Phone</label>
                                                <Input
                                                    type="tel"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <label>Country</label>
                                                <Input
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md="6">
                                            <FormGroup>
                                                <label>Country Code</label>
                                                <Input
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <label>Password</label>
                                                <Input
                                                    type="password"
                                                />
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
                    </TabPane>
                </TabContent>
            </div>

        </div>
    )
}

export default NewUser
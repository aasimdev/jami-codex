import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { API_BASE_URL } from 'const/apiConst';
import { toast } from 'react-toastify';
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
    Modal, Button,
    ModalBody,
    ModalFooter,
    ModalHeader,
    FormGroup,
    Input
} from "reactstrap";
import axios from 'axios';

const Projects = () => {


    const [projects, setProjects] = useState([]);
    const [user, setUser] = useState('');
    const [projectID, setProjectID] = useState('');
    const [userLists, setUserLists] = useState([]);

    // Modal
    const [modal, setModal] = useState(false);
    const toggle = (id) => {
        setProjectID(id);
        setModal(!modal);
    }

    // Fetch Data
    const fetchData = () => {
        axios({
            method: 'GET',
            url: API_BASE_URL + 'api/project/list',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status === 200) {
                setProjects(res.data.data)
            } else {
                console.log('Some error ocurred');
            }
        }).catch(e => {
            console.log('Error');
        })
    }

    useEffect(() => {
        let unmounted = false;

        if (!unmounted) {
            fetchData();
        }

        return () => { unmounted = true };
    }, []);

    // End Fetch Data







    // Delete Data
    const handleDelete = (id) => {
        const payload = {
            'id': id
        }
        axios.post(API_BASE_URL + 'api/project/delete', payload)
            .then(function (res) {
                if (res.status === 200) {
                    fetchData();
                    toast.success("Record has been deleted");
                }
            })
            .catch(function (error) {
                toast.error("Something is wrong");
                console.log(error);
            });
    }

    // End Delete Data






    // Fetch Users
    const fetchUserData = () => {
        axios({
            method: 'GET',
            url: API_BASE_URL + "/api/user/list",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setUserLists(res.data.data);

        }).catch(function (error) {
            console.log(error);
        })
    }

    useEffect(() => {
        let unmounted = false;

        if (!unmounted) {
            fetchUserData();
        }

        return () => { unmounted = true };
    }, [modal]);


    // Assign User for project
    const newUserPayload = {
        "project_id": projectID,
        "user_id": user
    }
    const submitAssignUserHandle = () => {
        axios.post(API_BASE_URL + 'api/project-member/create', newUserPayload)
            .then(res => {
                if (res.status === 200) {
                    toast.success("User is assigned");
                    setModal(!modal);
                }
            }).catch(function (error) {
                console.log(error);
            })
    }

    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">Projects List</CardTitle>
                            <Link to="new-project" className='btn btn-primary'>Add New Project</Link>
                        </CardHeader>
                        <CardBody>
                            <Table className="tablesorter" responsive>
                                <thead className="text-primary">
                                    <tr>
                                        <th>Name</th>
                                        <th>Start date</th>
                                        <th>End date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects && projects.map((project) => {
                                        return (
                                            <tr>
                                                <td>{project.name}</td>
                                                <td>{project.start_date}</td>
                                                <td>{project.end_date}</td>
                                                <td>{project.status}</td>
                                                <td>
                                                    <div className='tableActions'>
                                                        <a href="javascript:void(0)" onClick={() => toggle(project.id)}><i class="fa-solid fa-user-plus"></i></a>
                                                        <Link to="edit-project"><i class="fa-solid fa-pencil"></i></Link>
                                                        <a href="javascript:void(0)" onClick={() => handleDelete(project.id)}><i class="fa-solid fa-trash-can"></i></a>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Modal isOpen={modal} toggle={toggle} className="modal-black">
                <ModalHeader toggle={toggle}>Add Project Manager</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>User</label>
                        <Input
                            type="select"
                            id="user"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        >
                            <option>
                                Please select
                            </option>
                            {userLists ?
                                userLists.map((item) => {
                                    return (
                                        <option value={item.id} key={item.id}>
                                            {item.firstname + " " + item.lastname}
                                        </option>
                                    )
                                })
                                : "Not record found"}

                        </Input>
                        <Input type="hidden" value={projectID} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type='submit' className='mr-3' onClick={submitAssignUserHandle}>
                        Save
                    </Button> {' '}
                    <Button color="seconary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Projects
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
    Input,
    Label
} from "reactstrap";
import axios from 'axios';

const Projects = () => {


    const [projects, setProjects] = useState([]);
    const [user, setUser] = useState('');
    const [projectID, setProjectID] = useState('');
    const [userLists, setUserLists] = useState([]);
    const [projectDetailToggle, setProjectDetailToggle] = useState(false);
    const [projectDetail, setProjectDetail] = useState([]);
    const [checked, setChecked] = useState([]);

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
            console.log(res);
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



    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    // Generate string of checked items
    const checkedItems = checked.length
        ? checked.reduce((total, item) => {
            return total + ", " + item;
        })
        : "";

    // Assign User for project
    const newUserPayload = {
        "project_id": projectID,
        "user_id": checkedItems,
        "created_by": 1
    }
    const submitAssignUserHandle = () => {
        axios.post(API_BASE_URL + 'api/project-member/create', newUserPayload)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    toast.success("User is assigned");
                    setModal(!modal);
                }
            }).catch(function (error) {
                console.log(error);
            })
    }



    // Get Project Detail
    const handleProjectDetail = (id) => {
        const pLoad = {
            "project_id": id
        }
        axios.post(API_BASE_URL + 'api/project-detail/project', pLoad)
            .then(function (res) {
                console.log(res);
                if (res.status === 200) {
                    setProjectDetailToggle(true);
                    setProjectDetail(res.data.data);
                }
            })
            .catch(function (error) {
                toast.error("Something is wrong");
                console.log(error);
            });
    }



    return (
        <div className="content">
            <Row>
                <Col md="12">
                    {projectDetailToggle ?
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4"><a href="/admin/projects"><i class="fa-solid fa-arrow-left"></i></a> <span>Projects Detail</span></CardTitle>
                                {/* <Link to="new-project" className='btn btn-primary'>Add New Project</Link> */}
                            </CardHeader>
                            <CardBody>
                                <Table className="tablesorter" responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>Name</th>
                                            <th>Goal</th>
                                            <th>Task Detail</th>
                                            <th>Task Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projectDetail && projectDetail.map((item) => {
                                            return (
                                                <tr>
                                                    <td>{item.firstname + ' ' + item.lastname}</td>
                                                    <td>{item.goal}</td>
                                                    <td>{item.task_detail}</td>
                                                    <td>{item.task_status}</td>
                                                </tr>
                                            )
                                        })
                                        }
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                        :
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
                                                            <a href="javascript:void(0)" title="Project detail" onClick={() => handleProjectDetail(project.id)}><i class="fa-solid fa-eye"></i></a>
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
                    }



                </Col>
            </Row>


            <Modal isOpen={modal} toggle={toggle} className="modal-black">
                <ModalHeader toggle={toggle}>Add Project Manager</ModalHeader>
                <ModalBody>
                    <h6>User</h6>

                    <div className='userCheckList'>
                        {userLists && userLists.map((user) => {
                            return (
                                <FormGroup check key={user.id}>
                                    <Label check>
                                        <Input defaultValue={user.id} name={user.id} type="checkbox" onChange={handleCheck} />
                                        <span className="form-check-sign">
                                            <span className="check" />
                                            {user.firstname + " " + user.lastname}
                                        </span>
                                    </Label>
                                </FormGroup>
                            )
                        })}

                    </div>
                    <FormGroup>
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
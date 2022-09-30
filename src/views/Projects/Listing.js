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
    Label,
    Form,
    UncontrolledTooltip
} from "reactstrap";
import axios from 'axios';
import UserProjects from './User/Listing';

const Projects = () => {


    const [projects, setProjects] = useState([]);
    const [user, setUser] = useState('');
    const [projectID, setProjectID] = useState('');
    const [userLists, setUserLists] = useState([]);
    const [projectDetailToggle, setProjectDetailToggle] = useState(false);
    const [projectDetail, setProjectDetail] = useState([]);
    const [userProjectList, setUserProjectList] = useState([]);
    const [userProjectDetailToggle, setUserProjectDetailToggle] = useState(false);
    const [userData, setUserData] = useState([]);
    const [checked, setChecked] = useState([]);
    const [modal, setModal] = useState(false);
    const [addProjectDetailModal, setAddProjectDetailModal] = useState(false);
    const [userProjectID, setUserProjectID] = useState(null);


    // const [handleChange]


    const isAdmin = localStorage.getItem('is_admin');
    const userID = localStorage.getItem('id');


    // Modal
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






    // User Project List Fetch Data
    const userProjectFetchData = () => {
        const userProjectLoad = {
            "user_id": userID
        }
        axios.post(API_BASE_URL + 'api/project-member/user-projects', userProjectLoad)
            .then(function (res) {
                if (res.status === 200) {
                    setUserProjectList(res.data.data);
                }
            })
            .catch(function (error) {
                toast.error("Something is wrong");
                console.log(error);
            });
    }

    useEffect(() => {
        let unmounted = false;

        if (!unmounted) {
            userProjectFetchData();
        }

        return () => { unmounted = true };
    }, []);



    // User Project Detail Show
    const handleuserProjectDetail = (id) => {
        setUserProjectID(id);
        const payload = {
            "project_id": id,
            "user_id": parseInt(userID)
        }
        axios.post(API_BASE_URL + 'api/project-detail/user-project-details', payload)
            .then(function (res) {
                console.log(res);
                if (res.status === 200) {
                    setUserProjectDetailToggle(true);
                    setUserData(res.data.data);
                }
            })
            .catch(function (error) {
                toast.error("Something is wrong");
                console.log(error);
            });
    }


    const handleWorkDetail = (projectID) => {
        console.log(projectID);
        setAddProjectDetailModal(!addProjectDetailModal);
    }





    // Add Project Detail
    const handleAddProjectDetail = () => {

    }


    return (
        <div className="content">
            <Row>
                <Col md="12">
                    {
                        isAdmin == 1 ?
                            projectDetailToggle ?
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
                            // User Porject List
                            :
                            <UserProjects />
                    }
                </Col>
            </Row>


            <Modal isOpen={modal} toggle={toggle} className="modal-black">
                <ModalHeader toggle={toggle}>Add Project Manager</ModalHeader>
                <ModalBody>
                    <h6>User</h6>

                    <div className='userCheckList card-tasks h-auto'>
                        <div className="table-full-width table-responsive">
                            <Table>
                                <tbody>
                                    {userLists && userLists.map((user) => {
                                        return (


                                            <tr>
                                                <td>
                                                    <FormGroup check key={user.id}>
                                                        <Label check>
                                                            <Input defaultValue={user.id} name={user.id} type="checkbox" onChange={handleCheck} />
                                                            <span className="form-check-sign">
                                                                <span className="check" />

                                                            </span>
                                                        </Label>
                                                    </FormGroup>
                                                </td>
                                                <td>
                                                    <p className="title">{user.firstname + " " + user.lastname}</p>
                                                </td>
                                                <td>
                                                    <p className="title">{user.email}</p>
                                                </td>
                                            </tr>


                                        )
                                    })}

                                </tbody>
                            </Table>
                        </div>
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


            <Modal isOpen={addProjectDetailModal} toggle={handleWorkDetail} size="lg" className="modal-black">
                <ModalHeader toggle={handleWorkDetail}>Add Project Detail</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <label>Available</label>
                                <Input
                                    type="select"
                                >
                                    <option>Leave</option>
                                    <option>Available</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <label>Goal</label>
                                <Input
                                    type="text"
                                />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <label>Task Status</label>
                                <Input
                                    type="select"
                                >
                                    <option>To do</option>
                                    <option>In progress</option>
                                    <option>Complete</option>
                                </Input>
                            </FormGroup>
                        </Col>

                    </Row>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <label>Task Detail</label>
                                <Input type="text" />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <label>Start Time</label>
                                <Input type="time" />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <label>End Time</label>
                                <Input type="time" />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <label>Total Time</label>
                                <Input type="time" />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <label>Task Date</label>
                                <Input type="date" min="2022-09-16" />
                            </FormGroup>
                        </Col>
                        <Col md="12">
                            <FormGroup>
                                <label>Comment </label>
                                <Input
                                    type="textarea"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    {/* <FormGroup check>
                        <Label check>
                            <Input defaultValue="1" name="is_publish" type="checkbox" />
                            <span className="form-check-sign">
                                <span className="check" />
                                Publish
                            </span>
                        </Label>
                    </FormGroup> */}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type='submit' className='mr-3' onClick={handleAddProjectDetail}>
                        Save
                    </Button> {' '}
                    <Button color="seconary" onClick={addProjectDetailModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Projects
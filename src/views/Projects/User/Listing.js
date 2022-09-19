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
    Form
} from "reactstrap";
import axios from 'axios';
import { data } from 'jquery';

const UserProjects = () => {

    const [userProjectList, setUserProjectList] = useState([]);
    const [userProjectDetailToggle, setUserProjectDetailToggle] = useState(false);
    const [userData, setUserData] = useState([]);
    const [addProjectDetailModal, setAddProjectDetailModal] = useState(false);
    const [userProjectID, setUserProjectID] = useState(null);
    const [state, setState] = useState('');
    const [projectDate, setProjectDate] = useState('');

    // const [handleChange]

    const userID = localStorage.getItem('id');


    var today = new Date();
    today.setDate(today.getDate() - 1);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;






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


    const taskDate = () => {
        userData.map((items, index) => {
            var taskD = new Date(items.task_date);
            var gettaskD = taskD.getDate() + '-' + (taskD.getMonth() + 1) + '-' + taskD.getFullYear();
            setProjectDate(gettaskD)
        })
    }

    useEffect(() => {
        taskDate();
    }, [handleuserProjectDetail])





    const handleWorkDetail = (projectID) => {
        setAddProjectDetailModal(!addProjectDetailModal);
    }



    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value
        }))
    }



    const payload = {
        "goal": state.goal,
        "task_detail": state.task_detail,
        "task_status": state.task_status,
        "comment": state.comment,
        "is_publish": 1,
        "project_id": userProjectID,
        "user_id": userID,
        "start_time": state.start_time,
        "end_time": state.end_time,
        "total_time": state.total_time,
        "task_date": state.task_date,
        "is_available": state.is_available
    }

    // Add Project Detail
    const handleAddProjectDetail = (e) => {
        e.preventDefault();
        axios.post(API_BASE_URL + 'api/project-detail/create', payload)
            .then(function (res) {
                if (res.status === 200) {
                    toast.success("New project Detail has been added");
                    setAddProjectDetailModal(!addProjectDetailModal);
                    userProjectFetchData();
                    window.location.reload();
                }
            })
            .catch(function (error) {
                toast.error("Something is wrong");
                console.log(error);
            })
    }



    return (
        <div className="content">
            <Row>
                <Col md="12">
                    {
                        userProjectDetailToggle ?
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4"><a href="/admin/projects"><i class="fa-solid fa-arrow-left"></i></a> <span>User Projects Detail</span></CardTitle>
                                    <a href="#" onClick={() => handleWorkDetail(userProjectID)} className='btn btn-primary'>Add working detail</a>
                                </CardHeader>
                                <CardBody>
                                    <Table className="tablesorter" responsive>
                                        <thead className="text-primary">
                                            <tr>
                                                <th>Date</th>
                                                <th>Goal</th>
                                                <th>Task Detail</th>
                                                <th>Task Status</th>
                                                <th>Comment</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userData && userData
                                                .map((uitem) => {
                                                    return (
                                                        <>
                                                            <tr key={uitem.id}>
                                                                <td>{projectDate ? projectDate : "N/A"}</td>
                                                                {uitem.is_available == 1 ?
                                                                    <>
                                                                        <td>{uitem.goal}</td>
                                                                        <td>{uitem.task_detail}</td>
                                                                        <td>{uitem.task_status}</td>
                                                                        <td>{uitem.comment}</td>
                                                                    </>
                                                                    :
                                                                    <td colSpan={4} className="text-center">On Leave</td>
                                                                }
                                                            </tr>
                                                        </>

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
                                    <CardTitle tag="h4">User Projects List</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Table className="tablesorter" responsive>
                                        <thead className="text-primary">
                                            <tr>
                                                <th>Projects Name</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userProjectList && userProjectList.map((item) => {
                                                return (
                                                    <tr>
                                                        <td>{item.name}</td>
                                                        <td>
                                                            <div className='tableActions'>
                                                                <a href="javascript:void(0)" title="Project detail" onClick={() => handleuserProjectDetail(item.project_id)}><i class="fa-solid fa-eye"></i></a>
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




            <Modal isOpen={addProjectDetailModal} toggle={handleWorkDetail} size="lg" className="modal-black">
                <ModalHeader toggle={handleWorkDetail}>Add Project Detail</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>Available</label>
                        <Input
                            type="select"
                            id="is_available"
                            value={state.is_available}
                            onChange={handleChange}
                        >
                            <option>Please select</option>
                            <option value="0">Leave</option>
                            <option value="1">Available</option>
                        </Input>
                    </FormGroup>
                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <label>Goal</label>
                                <Input
                                    type="text"
                                    id='goal'
                                    value={state.goal}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <label>Task Status</label>
                                <Input
                                    type="select"
                                    id="task_status"
                                    value={state.task_status}
                                    onChange={handleChange}
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
                                <Input type="text" id="task_detail" value={state.task_detail} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <label>Start Time</label>
                                <Input type="time" id="start_time" value={state.start_time} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <label>End Time</label>
                                <Input type="time" id="end_time" value={state.end_time} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <label>Total Time</label>
                                <Input type="time" id="total_time" value={state.total_time} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <label>Task Date</label>
                                <Input type="date" min={today} id="task_date" value={state.task_date} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md="12">
                            <FormGroup>
                                <label>Comment </label>
                                <Input
                                    type="textarea"
                                    id="comment"
                                    value={state.comment} onChange={handleChange}
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
                    <Button color="seconary" onClick={handleWorkDetail}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default UserProjects
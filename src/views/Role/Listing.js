import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { API_BASE_URL } from 'const/apiConst';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Modal, Button,
    ModalBody,
    ModalFooter,
    ModalHeader,
    FormGroup,
    Input,
    Col
} from "reactstrap";
import axios from 'axios';



const Role = () => {

    const [roles, setRoles] = useState([]);
    const [modal, setModal] = useState(false);
    const [state, setState] = useState('');
    let history = useHistory();
    const toggle = () => {
        setModal(!modal);
    }

    // Fetch Data
    const fetchData = () => {
        axios({
            method: 'GET',
            url: API_BASE_URL + 'api/role/list',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status === 200) {
                console.log(res.data.data);
                setRoles(res.data.data)
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
    }, [])


    // Delete Data
    const handleDelete = (id) => {
        const payload = {
            'id': id
        }
        axios.post(API_BASE_URL + 'api/role/delete-role', payload)
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



    // Create new role
    const loggedID = localStorage.getItem('id');
    const options = [
        {
            label: "Admin",
            value: "Admin",
        },
        {
            label: "Editor",
            value: "Editor",
        },
        {
            label: "Maintenance",
            value: "Maintenance",
        },
    ];
    const handleChange = (newValue) => {
        setState(newValue)
    };

    const payload = {
        'name': state.value,
        'user_id': loggedID
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        axios.post(API_BASE_URL + 'api/role/create-role', payload)
            .then(function (res) {
                if (res.status === 200) {
                    toast.success("New role has been created");
                    setModal(!modal);
                    fetchData();
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
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">Role List</CardTitle>
                            <a href="javascript:void(0)" className='btn btn-primary' onClick={toggle}>Add New Role</a>
                        </CardHeader>
                        <CardBody>
                            <Table className="tablesorter" responsive>
                                <thead className="text-primary">
                                    <tr>
                                        <th>Name</th>
                                        <th>Created by</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roles && roles.map((role) => {
                                        return (
                                            <tr>
                                                <td> {role.name}</td>
                                                <td>{role.created_by ? role.created_by : "N/A"}</td>
                                                <td>
                                                    <div className='tableActions'>
                                                        <Link to="edit-role"><i class="fa-solid fa-pencil"></i></Link>
                                                        <a href="javascript:void(0)" onClick={() => handleDelete(role.id)}><i class="fa-solid fa-trash-can"></i></a>
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
                <ModalHeader toggle={toggle}>Add New Role</ModalHeader>
                <ModalBody>
                    <div className='roleCheckNew'>
                        <FormGroup>
                            <label htmlFor="role">
                                Role
                            </label>
                            <CreatableSelect

                                onChange={handleChange}
                                options={options}
                                placeholder="Please enter role"
                                className='selectThemeTwo'
                                classNamePrefix="select"
                            />
                        </FormGroup>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type='submit' className='mr-3' onClick={handleSubmitClick}>
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

export default Role
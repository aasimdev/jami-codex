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
    Col
} from "reactstrap";
import axios from 'axios';
import { func } from 'prop-types';



const Role = () => {

    const [roles, setRoles] = useState([]);


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


    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">Role List</CardTitle>
                            <Link to="new-role" className='btn btn-primary'>Add New Role</Link>
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
                                                <td>{role.name}</td>
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
        </div>
    )
}

export default Role
import axios from 'axios';
import { API_BASE_URL } from 'const/apiConst';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
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

const Users = () => {

    const [users, setUsers] = useState([]);

    const fetchData = () => {
        axios({
            method: 'GET',
            url: API_BASE_URL + "/api/user/list",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setUsers(res.data.data);

        }).catch(function (error) {
            console.log(error);
        })
    }

    useEffect(() => {
        let unmounted = false;

        if (!unmounted) {
            fetchData();
        }

        return () => { unmounted = true };
    }, [])


    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">Users List</CardTitle>
                            <Link to="new-user" className='btn btn-primary'>Add new user</Link>
                        </CardHeader>
                        <CardBody>
                            <Table className="tablesorter" responsive>
                                <thead className="text-primary">
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Designation</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users ? 
                                    users.map((user, index) => {
                                        return(
                                            <tr key={index}>
                                            <td>{user.firstname + '' + user.lastname}</td>
                                            <td>{user.email}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <div className='tableActions'>
                                                    <Link to="edit-role"><i class="fa-solid fa-pencil"></i></Link>
                                                    <a href="#"><i class="fa-solid fa-trash-can"></i></a>
                                                </div>
                                            </td>
                                        </tr>
                                        )
                                    })
                                    : "Record not found"}
                                 
                               

                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Users
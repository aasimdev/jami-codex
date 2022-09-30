import axios from 'axios';
import { API_BASE_URL } from 'const/apiConst';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
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
            console.log(res);
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
    }, []);




    // const handleDelete = (id) => {
    //     const payload = {
    //         'user_id': id
    //     }
    //     axios.post(API_BASE_URL + 'api/user/delete', payload)
    //         .then(function (res) {
    //             if (res.status === 200) {
    //                 // fetchData();
    //                 toast.success("Record has been deleted");
    //             }
    //         })
    //         .catch(function (error) {
    //             toast.error("Something is wrong");
    //             console.log(error);
    //         });
    // }





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
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <Link to={`/admin/user-detail/${user.id}`} className="detailLink">
                                                            {user.firstname + ' ' + user.lastname}
                                                        </Link>
                                                    </td>
                                                    <td>{user.email}</td>
                                                    <td>{user.role ? user.role : "N/A"}</td>
                                                    <td>
                                                        <div className='tableActions'>
                                                            <a href="#"><i class="fa-solid fa-user-plus"></i></a>
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
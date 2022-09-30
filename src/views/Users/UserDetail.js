import React, { useState, useEffect } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Button
} from "reactstrap";
import { Link, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { API_BASE_URL } from 'const/apiConst';




const UserDetail = () => {

    const [dateRange, setDateRange] = useState([null, null]);
    const [fdate, setFdate] = useState(null);
    const [startDate, endDate] = dateRange;

    const [detail, setDetail] = useState('');
    const [checkField, setCheckField] = useState(false);
    const [selectDateFD, setSelectDateFD] = useState(false);
    const { id } = useParams();

    const payload = {
        "user_id": id
    }

    const loadDetail = (data) => {
        console.log(data);
        axios.post(API_BASE_URL + "api/project-detail/search", data)
            .then(function (res) {
                console.log(res);
                setDetail(res.data.data);

            }).catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        loadDetail(payload);
    }, []);


    // Filter
    const handleFilter = () => {
        if (fdate && (!startDate && !endDate)) {
            var MyDateString;
            MyDateString = fdate.getFullYear() + '-' + ('0' + (fdate.getMonth() + 1)).slice(-2) + '-' + ('0' + fdate.getDate()).slice(-2);
            const data = {
                "search_date": MyDateString
            }
            loadDetail(data);
        } else if (startDate && endDate && !fdate) {
            var startDateValue = startDate.getFullYear() + '-' + ('0' + (startDate.getMonth() + 1)).slice(-2) + '-' + ('0' + startDate.getDate()).slice(-2);
            var endDateValue = endDate.getFullYear() + '-' + ('0' + (endDate.getMonth() + 1)).slice(-2) + '-' + ('0' + endDate.getDate()).slice(-2);
            const data = {
                "start_date": startDateValue,
                "end_date": endDateValue
            }
            loadDetail(data);
        } else if (startDate && endDate && fdate) {
            setSelectDateFD(false);
            setCheckField(true);

        } else {
            setCheckField(false);
            setSelectDateFD(true);
        }
    }


    // Reset Filter
    const handleReset = () => {
        setFdate('');
        setDateRange('');
        setCheckField(false);
        setSelectDateFD(false);
    }


    return (
        <div className="content">
            <div className='theme-tabs'>


                <Card className='cardHeightFix'>
                    <CardHeader>
                        <CardTitle tag="h4"><Link to="/admin/users"><i class="fa-solid fa-arrow-left"></i></Link> <span>User Detail</span></CardTitle>
                    </CardHeader>

                    <div className='filter'>
                        <div className='filter__wrap'>
                            <Form autoComplete='off'>
                                <Row className='justify-content-center'>
                                    <Col lg={7}>
                                        <Row className='align-items-center'>
                                            <Col md={4}>
                                                <FormGroup className='mb-0'>
                                                    <DatePicker
                                                        selected={fdate}
                                                        onChange={(date) => setFdate(date)}
                                                        className="form-control"
                                                        placeholderText='Search by date'
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={4}>
                                                <FormGroup className='mb-0'>
                                                    <DatePicker
                                                        selectsRange={true}
                                                        startDate={startDate}
                                                        endDate={endDate}
                                                        className="form-control"
                                                        placeholderText='Search by date range'
                                                        onChange={(update) => {
                                                            setDateRange(update);
                                                        }}

                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={2} className="text-right">
                                                <Button className='btn btn-primary' onClick={handleFilter}>Filter</Button>
                                            </Col>
                                            <Col md={2}>
                                                <a className="title" href='javascript:void(0)' onClick={handleReset}> Reset </a>
                                            </Col>
                                        </Row>
                                        {checkField &&
                                            <p className='mt-3 text-center'>You can search by only one date.</p>
                                        }
                                        {selectDateFD &&
                                            <p className='mt-3 text-center'>Please select a date one of them</p>
                                        }
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>

                    <CardBody>
                        <div className="table-full-width table-responsive noborder-First mt-5">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Task name and detail</th>
                                        <th>Task status</th>
                                        <th>Task total time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detail && detail.map((detail) => {
                                        return (
                                            <tr key={detail.project_id}>
                                                <td>
                                                    <p>{detail.name}</p>
                                                    <p className="text-muted">
                                                        {detail.task_detail}
                                                    </p>
                                                </td>
                                                <td>
                                                    {detail.task_status}
                                                </td>
                                                <td>
                                                    {detail.total_time}
                                                </td>
                                            </tr>
                                        )

                                    })}

                                </tbody>
                            </Table>
                        </div>
                    </CardBody>
                </Card>
            </div>

        </div>
    )
}

export default UserDetail
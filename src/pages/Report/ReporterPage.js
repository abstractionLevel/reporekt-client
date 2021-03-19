import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Col, Container, Row } from 'react-bootstrap';
import ReportService from '../../service/report.service';
import { reportsType } from '../../utility/reportsTypeConstant';

const ReporterPage = (props) => {

    const { register, errors, handleSubmit } = useForm({});
    const [isMessage, setMessage] = useState(false)



    const onSubmit = data => {
        ReportService.doReport(data.nickname, data.reportType, data.description).then(
            (response) => {
                if (response === 200) {
                    props.history.push(encodeURI("/player/" + data.nickname));
                }
                if (response === 401) {
                    setMessage(true)
                }
            }
        );

    };

    useEffect(() => {
    }, [isMessage])

    return (
        <Container flui>

            <Row className="justify-content-md-center">
                <Col className="col-lg-8 form-login">
                    {isMessage}
                     {isMessage ==true && <div className="alert alert-danger"><h3>PLEASE DO LOGOUT</h3></div>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            name="nickname"
                            placeholder="nickname"
                            className="form-control mb-2"
                            type="text"
                            ref={register({
                                pattern: {
                                    value: /^[a-zA-Z0-9_]+$/,
                                    message: "No Special Characters"
                                },
                                required: "You must specify an nickname"
                            })}
                        />
                        {errors.nickname && <p>{errors.nickname.message}</p>}

                        <select name="reportType"
                            className="form-control mb-2"
                            ref={register({
                                required: "select one option"
                            })}>
                            <option value="">Select a Report Type</option>
                            {reportsType.map((repType, index) =>
                                <option value={repType}>{repType}</option>
                            )}
                        </select>

                        {errors.reportType && <p>{errors.reportType.message}</p>}

                        <textarea
                            rows="12"
                            name="description"
                            className="form-control mb-2"
                            ref={register({
                                required: "write an description's report",
                                minLength: {
                                    value: 10,
                                    message: "min 10 letter"
                                },
                                maxLength: {
                                    value: 2000,
                                    message: "max 2000"
                                }
                            })}
                        />
                        {errors.description && <p>{errors.description.message}</p>}

                        <input type="submit" className="form-control " />
                    </form>
                </Col>
            </Row>
        </Container>
    );
};

export default ReporterPage;
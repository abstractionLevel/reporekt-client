import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import './CardReportsOfPlayer.scss'
import ReactPaginate from 'react-paginate';
import { Container } from 'react-bootstrap';
import ReportService from '../service/report.service';
import Moment from 'react-moment';
import 'moment-timezone';

const CardReportsOfPlayer = (props) => {


    
    const token = localStorage.getItem("userToken");

    const username = props.username;

    const [offset, setOffset] = useState(0);
    const [perPage] = useState(4);
    const [pageCount, setPageCount] = useState(0)
    const [reports,setReports] = useState([])




    const getData = async() => {
        const res = await ReportService.fetchReportByPlayerUsername(username)
        const data = res.data;
        const slice = data.slice(offset, offset + perPage)
        const postData  = slice.map((report, index) => <Card key={index}>
            <Card.Body>
                <Card.Title>
                    <Card.Link href="#"></Card.Link>
                </Card.Title>
                <div className='info-rep '>
                    <div className='d-inline report-type mr-1'>{report.reportType}</div>
                    <div className='d-inline float-right date'><Moment format="YYYY/MM/DD">{report.date}</Moment></div>
                    <div className='d-inline report-by '>Reported By </div>
                    <div className='d-inline user'>{report.user}</div>
                </div>
                <div className='line mb-3'>
                </div>
                <div className='report-text'>
                    <p>{report.description}</p>
                </div>
                <div className='br mb-3'>
                </div>
            </Card.Body>
        </Card>)
        setReports(postData)
        setPageCount(Math.ceil(data.length / perPage))
    };

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage *perPage)
    };

     useEffect(() => {
        getData()
        var name = document.getElementsByClassName('porcodio')[0];

    }, [offset])

    return (
        <Container >
            {reports}
            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
                disabledClassName={"disabledNexOrPrev"}
                />
        </Container>
    )
}
export default CardReportsOfPlayer
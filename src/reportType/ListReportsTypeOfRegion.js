import React, { useEffect,useState } from 'react';
import ReportTypeService from '../service/reportType.service';
import {ListGroup}  from 'react-bootstrap';



const ListReportsTypeOfRegion = () => {

    const [reportsType,setReportType] = useState([])

	useEffect(() => {
        ReportTypeService.fetchAllReportsType().then(
            (response) => {
                setReportType(response)
            });
	},[]);


    return (
        < div className='list-latest-players' >
            <ListGroup>
                {reportsType.map((repType, index) =>
                    <div key={index} className='mb-2 list'>
                            <ListGroup.Item key='index'>
                                {repType.reportType} - {repType.count}
                            </ListGroup.Item>
                    </div>
                )}
            </ListGroup>
        </div >
    );
};

export default ListReportsTypeOfRegion;
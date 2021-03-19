import React, {useEffect,useState} from 'react'
import ReportsTypeService from '../service/reportType.service';
import {ListGroup}  from 'react-bootstrap';

//css
import './ListReportTypeOfPlayer.scss';

const ListReportTypeOfPlayer = (props) => {

  
    const username = props.username;
    const [reportsType,setReportsType] = useState([]);

    
    useEffect(() => {
        ReportsTypeService.fetchReportsTypeByPlayerNickname(username).then(
        (response) => {
                setReportsType(response)
            });
    },[])

    return (
        <div className='report-type'>
            <ListGroup>
            {reportsType.map((reportType,index) =>
                <ListGroup.Item key={index} className='mb-2'>
                   <p> {reportType.reportType}</p>
                </ListGroup.Item>
            )}
            </ListGroup>
        </div>
    );
};

export default ListReportTypeOfPlayer;
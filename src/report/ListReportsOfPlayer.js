import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchReportByPlayerId} from '../redux/report/actions';

//css
import './ListReportsOfPlayer.scss';

const ListReportsOfPlayer = (props) => {

    const dispatch = useDispatch();
    const reports = useSelector(state => state.reports.reportsOfPlayer)
    const id = props.id;
    
    useEffect(() => {
        dispatch(fetchReportByPlayerId(id))
    },[dispatch,id])

    return (
        <ul>
            {reports.map((report,index) => 
                <li key={index}>{report.description}</li>
            )}
        </ul>
    );
};

export default ListReportsOfPlayer;
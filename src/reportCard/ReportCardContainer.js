import React , {Component} from 'react';
import ReportCard from './ReportCard';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchReports } from '../../redux/report/reportAction';

class ReportCardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: []
        }
    }
    


    componentDidMount() {
        this.props.fetchReports();
        axios.get('http://localhost:3002/summoners')
            .then(res => {
                this.setState({
                    reports: res.data
                });
            });
    }

    render() {
        return <ReportCard />
    }


}

export default connect(null,{fetchReports})(ReportCardContainer);

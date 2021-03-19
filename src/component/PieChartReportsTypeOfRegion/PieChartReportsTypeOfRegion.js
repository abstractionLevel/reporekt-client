import { Chart } from "react-google-charts";
import React, { useEffect, useState } from 'react';
import ReportTypeService from '../../service/reportType.service';
import "./PieChartReportsTypeOfRegion.scss"; 


const PieChartReportsTypeOfRegion = () => {

    const [reportsType, setReportsType] = useState([]);


    useEffect(() => {
        ReportTypeService.fetchAllReportsType().then(
            (response) => {
                setReportsType(response)
            });
    }, [])

    const data = [['Task', 'Hours per Day']]

    reportsType.map(repType => {
        return data.push([repType.reportType,repType.count])
    })

    return (
        <div className="pie-chart">
            <Chart
                width={'100%'}
                height={'400px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={
                    data
                }
                options={{
                    alignment: "center",
                    legend: {
                        position: 'left',
                        alignment: 'center',
                        orientation: 'vertical',
                    },
                    chartArea: {
                        left: 0,
                        top: 0,
                        width: "90%",
                        height: "80%"
                    },
                    // Just add this option
                    pieHole: 0.7,
                    backgroundColor: 'transparent',
                    colors: ['#40ff00', '#ff0000', '#ffffff', '#FFA500', '#DFFF00', '#6495ED']
                }}

                rootProps={{ 'data-testid': '3' }}
            />
        </div>
    );
};

export default PieChartReportsTypeOfRegion;
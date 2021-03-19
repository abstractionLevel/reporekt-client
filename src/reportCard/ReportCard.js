import React from 'react';
import Card from 'react-bootstrap/Card';

//css
import './reportCard.scss';

const ReportCard = ({reports = []}) => (
    <div>
        <Card key={report.id}>
            <Card.Body>
                <Card.Title>
                        <Card.Link href="#"></Card.Link>
                </Card.Title>
                <div className='line mb-0'>
                </div>
                <div className='info-rep '>
                    <div className='d-inline auth mr-1'>Auth:</div>
                    <div className='d-inline user'><Card.Link className='mr-1' href="#">{report.auth}</Card.Link></div>|
                    <div className='d-inline rep-type ml-1'>Report type: inting</div>
                    <div className='d-inline float-right date'>2/8/2020</div>
                </div>
                <div className='line mb-3'>
                </div>
                <Card.Text>
                </Card.Text>
                <div className='img'>
                    <img src="https://dotesports-media.nyc3.cdn.digitaloceanspaces.com/wp-content/uploads/2019/10/15202826/b8fbf5b3ce1fca11a1a741ddc49016d7.jpg" className="img-thumbnail mb-3" width="80" height="80" alt="Responsive"/>
                    <img src="https://img.utdstc.com/screen/1/league-legends-002.jpg:l" className="img-thumbnail mb-3" width="80" height="80" alt="Responsive"/>

                    <img src="https://upload.wikimedia.org/wikipedia/it/thumb/a/a6/LeagueOfLegends-SummonersRift.jpg/303px-LeagueOfLegends-SummonersRift.jpg" className="img-thumbnail mb-3" width="80" height="80" alt="Responsive"/>
                </div>
                <div className='br mb-3'>
                </div>
                <div>
                    <a href='#link'>Comment</a>
                </div>
            </Card.Body>
        </Card>
    </div>
);

export default ReportCard;

import React from 'react';
import './courses.css';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import { useSelector } from 'react-redux';

function Courses(props) {
    let history = (useSelector(({ auth }) => auth.user.data.history));
    
    return (
      <div style={{backgroundColor: 'rgb(0, 116, 224)', height: '2000%'}}>
        <div className="" style={{backgroundColor: 'white', width: '100%', height: '200px', borderRadius: '0px 0px 110px 110px', textAlign: 'center', color: 'rgb(0, 116, 224)'}}>
            <h1 style={{fontSize: '40px', paddingTop: '50px', fontWeight: '900'}}>TRANSACTIONS</h1>
        </div>
        <div id="demo">
        <div className="table-responsive-vertical shadow-z-1">
          <table id="table" className="table table-hover table-mc-light-blue">
            <thead>
              <tr>
                <th>ID</th>
                <th>Transaction Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
            {Object.entries(history).map(([element, index]) => {
                    return(
                        <tr>
                            <td data-title="ID">{index.response.data.reference}</td>
                            <td data-title="Name">NGN {index.response.data.amount / 100}</td>
                            <td data-title="Link">
                            {index.response.data.paidAt}
                            </td>
                            <td data-title="Status">{index.response.data.status}</td>
                        </tr>
                    )
                })}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    );
}

export default withReducer('academyApp', reducer)(Courses);

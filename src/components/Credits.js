import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import services from '../services/apiServices';
import './DebitsCredits.css';

class Credits extends Component {

    constructor() {
        super();
        this.state = {
            apiData: null,
            apiDataReceived: false
        }
    }

    componentDidMount() {
        services.getCredits()
        .then(result => {
            console.log(result.data);
            this.setState({apiData: result.data, apiDataReceived: true});
        }) 
        .catch(err => console.log(err));
    }

    renderData = () => {
        console.log('Hello');
        return (<tbody>
             {this.state.apiData.map((credit, index) => {
                 console.log('Hello World');
                    return (
                        <Fragment key={index}>
                            <tr >
                                <td>{credit.description}  </td>
                                
                                <td>
                                    {new Intl.NumberFormat('en-GB', { 
                                        style: 'currency', 
                                        currency: 'USD' 
                                    }).format(credit.amount)}
                                 </td>
                                
                                <td>
                                    {new Intl.DateTimeFormat('en-GB', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: '2-digit' 
                                        }).format(Date.parse(credit.date))}
                                </td>
                            </tr>
                        </Fragment>
                    );
                })}
    </tbody>)
    };

    render() {
        return (<div>
            <h1>Credits</h1>
            {this.state.apiDataReceived ? this.renderData() : ''}
        </div>);
    }
}

export default Credits;
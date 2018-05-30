import React, { Component , Fragment }from 'react';
import { Link } from 'react-router-dom';
import services from '../services/apiServices';
import './DebitsCredits.css';


class Debits extends Component {

    constructor() {
        super();
        this.state = {
            apiData: null,
            apiDataReseived: false
        }
    }

    componentDidMount() {
        services.getDebits()
        .then(result => {
            console.log(result.data);
            this.setState({apiData: result.data, apiDataReseived: true});
        }) 
        .catch(err => console.log(err));
    }

    renderData = () => {
        return (<tbody>
             {this.state.apiData.map((debit, index) => {
                    return (
                        <Fragment key={index}>
                            <tr >
                                <td>{debit.description}  </td>
                                
                                <td>
                                    {new Intl.NumberFormat('en-GB', { 
                                        style: 'currency', 
                                        currency: 'USD' 
                                    }).format(debit.amount)}
                                 </td>
                                
                                <td>
                                    {new Intl.DateTimeFormat('en-GB', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: '2-digit' 
                                        }).format(Date.parse(debit.date))}
                                </td>
                            </tr>
                          
                        </Fragment>
                    );
                })}
    </tbody>)
    };


    render() {
        return (<div>
            <h1>Debits</h1>
            {this.state.apiDataReseived ? this.renderData() : ''}
        </div>);
    }
}

export default Debits;
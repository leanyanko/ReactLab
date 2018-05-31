import React, { Component , Fragment }from 'react';
import { Link } from 'react-router-dom';
import services from '../services/apiServices';
import './DebitsCredits.css';


class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            apiData: this.props.data,
            apiDataReseived: true,
            balance: this.props.balance,
            amount : 0,
            description: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    renderData = () => {
        if (!this.state.apiData) return;
        return (<table>
            <tbody>
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
        </tbody>
    </table>)
    };

    handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const sign = this.props.type === 'credits' ? 1 : -1;
        const amount = parseInt(this.state.amount, 10);
        let data = {
            balance: this.props.balance + amount * sign,
            amount: amount,
            description: this.state.description,
            date: new Date(),
            type: this.props.type,
            id: Math.random(10^8)
        }
        this.props.updateAccount(data);
    }

    render() {
        return (<div>
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Amount</label>
                    <input type="number" name="amount" min="1" onChange={this.handleChange}/>
                    <br/>
                    <label>Description</label>
                    <input type="text" name="description" onChange={this.handleChange}/>
                    <input type="submit" value="Submit" />
                </form>

                <div></div>

            </div>
            <div>{this.state.balance}</div>
            <br/>
            <br/>
            <br/>
                        <div>
               <h1> Past year: </h1> {this.state.type == "/credits" ? <h1>Credits</h1> : <h1>Debits</h1>}
                {this.state.apiDataReseived ? this.renderData() : ''}
            </div>
        </div>);
    }
}

export default Account;
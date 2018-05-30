import React, { Component , Fragment }from 'react';
import { Link } from 'react-router-dom';
import services from '../services/apiServices';
import './DebitsCredits.css';


class Debits extends Component {

    constructor( props ) {
        super(props);
        this.state = {
            apiData: this.props.data,
            apiDataReseived: true,
            balance: this.props.balance,
            type: '',
            amount : 0,
            description: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({type: window.location.pathname});
        let path = this.state.type;
        console.log(window.location);
        if (!this.state.apiData ) {
            services.getData(path)
            .then(result => {
                console.log(result.data);
                this.setState({apiData: result.data, apiDataReceived: true});
            }) 
            .catch(err => console.log(err));
        };
     }

    renderData = () => {
        if (!this.state.apiData) return;
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

    handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
     //   console.log('AMOUNT INITIAL',value);
        this.setState({
            [name]: value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        let sign = this.state.type === '/credits' ? 1 : -1;
        let date = new Date();
        let amount = parseInt(this.state.amount, 10);
        let id = Math.random(100000)*9999;
        let data = {
            balance: this.props.balance + amount * sign,
            amount: amount,
            description: this.state.description,
            date: date,
            type: this.state.type,
            id: id
        }
        console.log(data);
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

export default Debits;
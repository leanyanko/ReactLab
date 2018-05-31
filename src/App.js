import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  Home  from './components/Home';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import services from './services/apiServices';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';

import Account from './components/Account';


class App extends Component {

  constructor() {
    super();
    this.state = {
      creditsData: null,
      debitsData: null,
      accountBalance: null,
      currentUser: {
        userName: "bob_loblaw",
        memberSince: '08/03/2009'
      }
    }

    this.updateAccount = this.updateAccount.bind(this);
    this.getAmounts = this.getAmounts.bind(this);
  }

  componentDidMount() {
    services.getData('/credits')
      .then(credits => {
        this.setState({ creditsData: credits.data });
        return services.getData('/debits')          
      })
      .then(debits => {
        this.setState({ debitsData: debits.data }, this.getAmounts);
      })
      .catch(err => {
        console.log(err)
      });
  }

  getAmounts() {
    let debitSum = 0;
    let debitAmount = this.state.debitsData.map((el, idx) => {
      return debitSum+=el.amount;
    })
    let creditSum = 0;
    let creditAmount = this.state.creditsData.map((el, idx) => {
      return creditSum+=el.amount;
    })

    this.setState({
      sumRecieved: true,
      fullSum: parseInt(creditAmount, 10) - parseInt(debitAmount, 10)
    }, () => {
      this.setState({
        accountBalance: this.state.fullSum
      })
    })
  }

  updateAccount(data) {
    const entry = {
      id: data.id.toString(),
      amount: parseInt(data.amount, 10),
      description: data.description,
      date: data.date
    };

    const newState = {
      accountBalance: data.balance
    };

    if (data.type === 'credit') {
      const newCredits = Array.prototype.slice.apply(this.state.creditsData);
      newCredits.push(entry);
      newState.creditsData = newCredits;
    } else if (data.type === 'debit') {
      const newDebits = Array.prototype.slice.apply(this.state.debitsData);
      newDebits.push(entry);
      newState.debitsData = newDebits;
    }

    this.setState(newState);
  }

  mockLogin = (logInInfo) => {
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser});
  }

  render() {

    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>)

    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} 
                    memberScince={this.state.currentUser.memberScince}/>
    );

    const LoginComponent = () => (
      <LogIn user={this.state.currentUser} 
              mockLogin={this.mockLogin} {...this.props} />
    );

    const CreditsComponent = () => (
      <Account type="credit" data={this.state.creditsData} balance={this.state.accountBalance} updateAccount={this.updateAccount}/>
    );

    const DebitsComponent = () => (
      <Account type="debit" data={this.state.debitsData} balance={this.state.accountBalance} updateAccount={this.updateAccount}/>
    );

    return (
     <Router>
        <Switch>
          <Route exact path="/" component={HomeComponent}/>
          <Route exact path="/userProfile" component={UserProfileComponent} />

          <Route exact path="/debits" component={DebitsComponent}/>
          <Route exact path="/credits" component={CreditsComponent}/>

          {this.state.sumRecieved ? console.log('Full Amount => ', this.state.fullSum) : ''}
        </Switch>
     </Router>
    );
  }
}

export default App;

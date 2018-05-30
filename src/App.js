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
  }

  componentDidMount() {
    if (!this.state.accountBalance)
    services.getData('/credits')
      .then(credits => {
        this.setState({
          creditsData: credits.data
        })
        services.getData('/debits')
          .then(debits => {
            this.setState({
              debitsData: debits.data
            }, () => {
              this.getAmounts();
            })
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log(err)
      })
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
    
    data.amount = parseInt(data.amount, 10);
    let entry = {};
    entry.id = data.id;
    entry.amount = data.amount;
    entry.description = data.description;
    entry.date = data.date;
    console.log("ENTRY ", entry);
    let newCredits = {...this.state.creditsData};
    
    this.setState({
      accountBalance: data.balence,
    //  creditsData: newCredits
    }, () => {
 //     console.log('Updated account balance => ', this.state.accountBalance)
    })
 //   console.log("I GOT CALLED")
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
      <Account data={this.state.creditsData} balance={this.state.accountBalance} updateAccount={this.updateAccount}/>
    );

    const DebitsComponent = () => (
      <Account data={this.state.debitsData} balance={this.state.accountBalance} updateAccount={this.updateAccount}/>
    );


    return (
     <Router>
        <Switch> 
          <Route exact path="/" component={HomeComponent}/>
          <Route exact path="/userProfile" component={UserProfileComponent} />

          <Route exact path="/debits" component={DebitsComponent}/>
          <Route exact path="/credits" component={CreditsComponent}/>

          {this.state.sumRecieved ? console.log('Full Anount => ', this.state.fullSum) : ''}
        </Switch>
     </Router>
    );
  }
}

export default App;

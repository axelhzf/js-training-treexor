import React, {PropTypes} from "react";
import ReactDOM from "react-dom";
import {Router, Route, Link, browserHistory} from 'react-router'
import _ from "lodash";

import "./main.css";

const users = [
  {id: "1", name: "Kylo Ren", poster: "/" + require("./img/kylo.jpg")},
  {id: "2", name: "Rey", poster: "/" + require("./img/rey.jpg")},
  {id: "3", name: "Finn", poster: "/" + require("./img/finn.jpg")}
];

class Users extends React.Component {
  render() {
    return (
      <div>
        <h1>Users</h1>
        <div className="master">
          <ul>
            {users.map(user => <li key={user.id}><Link to={`/user/${user.id}`}>{user.name}</Link></li>)}
          </ul>
        </div>
        <div className="detail">
          {this.props.children}
        </div>
      </div>
    )
  }
}

class User extends React.Component {

  render() {
    const user = _.find(users, {id: this.props.params.userId});
    return (
      <div>
        <h2>{user.name}</h2>
        <img src={user.poster}/>
      </div>
    )
  }
}

class About extends React.Component {

  render() {
    return <h1>About</h1>
  }

}

class App extends React.Component {

  render() {
    return (
      <div>
        <ul>
          <li><Link to="about">About</Link></li>
          <li><Link to="users">Users</Link></li>
        </ul>
        <div>{this.props.children}</div>
      </div>
    )
  }

}

class NoMatch extends React.Component {
  render() {
    return <h1>404</h1>
  }
}

class Routes extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <Route path="about" component={About}/>
          <Route path="users" component={Users}>
            <Route path="/user/:userId" component={User}/>
          </Route>
          <Route path="*" component={NoMatch}/>
        </Route>
      </Router>
    )
  }
}

ReactDOM.render(<Routes/>, document.getElementById("container"));
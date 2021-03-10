import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import User from './user';
import Home from './home'
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={User} />
        </Switch>
      </div>

    </Router>
  );
}

export default App;

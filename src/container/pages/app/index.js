import './App.css';
import { BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Login from '../login/login';
import Register from '../register/register';
import Dashboard from '../dashboard/dashboard';
import { Provider } from 'react-redux';
import { store } from '../../../config/redux/redux'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

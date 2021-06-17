import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/nav/Nav';
import Home from './components/home/Home';
import Breeds from './components/breeds/Breeds';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/breeds" component={Breeds}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/nav/Nav';
import Home from './components/home/Home';
import Breeds from './components/breeds/Breeds';
import NewBreed from './components/newBreed/NewBreed';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
        <Switch>
          <Route path="/breeds" component={Breeds} />
          <Route path="/new-breed" component={NewBreed} />
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

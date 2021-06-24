import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/nav/Nav';
import Home from './components/home/Home';
import Breeds from './components/breeds/Breeds';
import Breed from './components/breed/Breed';
import NewBreed from './components/newBreed/NewBreed';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
        <Switch>
          <Route exact path="/breeds" component={Breeds} />
          <Route path="/new-breed" component={NewBreed} />
          <Route exact path="/" component={Home} />
          <Route
            exact path='/breeds/:id'
            render={({match}) => <Breed id={match.params.id} />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

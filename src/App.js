import React from 'react';
import {BrowserRouter as Router, Route, Switch}  from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import MovieDetail from './components/MovieDetail/MovieDetail';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Footer from './components/Footer/Footer';
import './App.scss'
import {Provider} from 'react-redux'
import store from './redux/store';
import Login from './components/Login/Login'
import Protected from './components/Protected';

function App() {
  return (
    <Provider store={store}>
    <div>
      <Router>
        <Header></Header>
        <Switch>
          <div className='movieContainer'>
        <Route path='/login' component={Login} exact></Route>
        <Route path='/' exact><Protected cmp = {Home}/></Route>
        <Route path='/movie/:imdbID' exact><Protected cmp = {MovieDetail}/></Route>
        <Route><Protected cmp = {PageNotFound}/></Route>
        </div>
        </Switch>
        <Footer></Footer>
      </Router>
    </div>
    </Provider>
  );
}

export default App;

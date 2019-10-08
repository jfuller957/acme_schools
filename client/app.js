import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from  'react-redux';
import { HashRouter, Route, Link } from 'react-router-dom';

import Students from './Students';
import Nav from './Nav';
import Schools from './Schools';
import Home from './Home';

import store, { fetchStudents, fetchSchools, addNewStudent } from './store';

class App extends React.Component{
    async componentDidMount(){
        fetchStudents();
        fetchSchools();
    }
    render(){
        return(
            <Provider store={ store }>
                <HashRouter>
                    <Route component={ Nav } />
                    <Route path='/' component={ Home } exact />
                    <Route path='/students' component={ Students } />
                    <Route path='/students/:id' component={ Students } />
                    <Route path='/schools' component={ Schools } />
                    <Route path='/schools/:id' component={ Schools } />
                </HashRouter>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));
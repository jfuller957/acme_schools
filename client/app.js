import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from  'react-redux';
import { HashRouter, Route } from 'react-router-dom';

import Students from './Students';
import Nav from './Nav';
import Schools from './Schools';
import Home from './Home';
import School from './School';
import Form from './Form';

import store, { fetchStudents, fetchSchools } from './store';

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
                    <Route component={ Form } />
                    <Route path='/' component={ Home } exact />
                    {/* <Route path='/' component={ Home } exact /> */}
                    <Route path='/students' component={ Students } />
                    <Route path='/schools' component={ Schools } />
                    <Route path='/school/' component={ School } />
                    <Route path='/schools/:id' component={ School } />
                    {/* <Route path='/school/popular' component={ School } /> */}
                </HashRouter>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));
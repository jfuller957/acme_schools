import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Students from './Students';


const Title  = ()=> <h1>Acme Students and Schools</h1>;




class App extends React.Component{
    constructor(){
        super();
        this.state = {
            students: [],
            schools: [],
        };
    }
    async componentDidMount(){
        const response = await Promise.all([
            axios.get('/api/students'),
            axios.get('/api/schools')
        ]);
        this.setState({ students: response[0].data, schools: response[1].data })
    }
    render(){
        const { students } = this.state;
        return(
            <div>
                <Title />
                <Students students={ students } />    
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));
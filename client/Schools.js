import React from 'react';
import { connect } from 'react-redux';
import { addNewSchool } from './store';

class _Schools extends React.Component{
    constructor(){
        super();
        this.state = {
            name: ''
        }
    }
    render(){
        const { schools } = this.props || [];

        return (
            <div>
                The following school types are available to attend in California: 
                <form>
                    <input name='name' value={ schools.name } onChange={(ev) => this.setState({ name: ev.target.value })} />
                </form>
                <ul>
                    {
                        schools.map( school => <li key={ school.id }>{ school.name } ({ school.students.length })</li>)   
                    }
                </ul>
            </div>
        ) 
    }
};

const mapStateToProps = ({ schools })=> ({ schools });

const mapDispatchToProps = (dispatch) => {
    return {
        addSchool: (school)=> {
            dispatch(addNewSchool(school));
        }
    };
};

const Schools = connect(mapStateToProps,mapDispatchToProps)(_Schools);

export default Schools;
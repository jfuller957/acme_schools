import React from 'react';
import { connect } from 'react-redux';

class _Schools extends React.Component{
    constructor(){
        super();
        this.state = {
            name: ''
        }
    }

    render(){
        const { schools } = this.props || {};

        return (
            <div>
                The following school types are available to attend in California: 
                <ul>
                    {
                        schools.map(school => (
                            <li key={ school.id }>
                                <div><img src={school.image} /></div>
                                <div>{ school.name } ({ school.students.length })</div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        ) 
    }
};

const mapStateToProps = ({ schools }) => ({ schools });

const Schools = connect(mapStateToProps)(_Schools);

export default Schools;
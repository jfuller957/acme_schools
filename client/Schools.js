import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
            <div className="content">
                <div className="cards">
                    {
                        schools.map(school => (
                            <div key={ school.id }>
                                <div><img src={school.image} /></div>
                                <div> 
                                    <Link to={`/schools/${school.id}`} >{ school.name } </Link> ({ school.students.length })                                   
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        ) 
    }
};

const mapStateToProps = ({ schools, students }) => ({ schools, students });

const mapDispatchToProps = (dispatch) => {
    return {
        updateSchool: (school) => {
            dispatch(updateSchool(school));
        }
    };
};

const Schools = connect(mapStateToProps, mapDispatchToProps)(_Schools);

export default Schools;
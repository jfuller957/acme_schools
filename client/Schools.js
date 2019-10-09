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
        const { schools, students } = this.props || {};

        return (
            <div className="content">
                {/* <select onChange={(evt) => {
                    const updatedSchools = {
                        ...schools,
                        studentId: evt.target.value
                    };
                        this.props.updateSchool(updatedSchools); 
                    }}>
                    {
                        students.map( student => (<option key={ student.id } value={ student.id }>{ student.name }</option>))
                    }
                </select> */}
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
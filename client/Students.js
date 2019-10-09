import React from 'react';
import { connect } from 'react-redux';
import { destroyStudent, updateStudent } from './store';


class _Students extends React.Component{
    constructor () {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            gpa: '',
            schoolId: ''
        }
    }
    render () {
        const { students, schools } = this.props || {};

        return (
            <div id="content">
                <p>Students -  there are { students.length } students.</p>

                <div className="cards">
                    {
                        students.map(student => (
                            <div key={ student.id }>
                                <h4>{ student.firstName } { student.lastName }</h4><br />
                                <img src={ student.school && student.school.image } />

                                GPA: { student.gpa }<br />
                                School: { student.school && student.school.name } 
                                
                                <select onChange={(evt) => {
                                    const updatedStudent = {
                                        ...student,
                                        schoolId: evt.target.value
                                    };

                                    this.props.updateStudent(updatedStudent); 
                                }}>
                                    {
                                        schools.map( school => (<option key={ school.id } value={ school.id }>{ school.name }</option>))
                                    }
                                </select>

                                <button className="delete" onClick={ ()=> this.props.deleteStudent(student.id)}>
                                    Delete Student
                                </button>
                            </div>
                        ))
                    }
                </div>

            </div>
        );
    }
}

const mapStateToProps = ({ students, schools })=> ({ students, schools });

const mapDispatchToProps = (dispatch) => {
    return {
        addStudent: (student)=> {
            dispatch(addNewStudent(student));
        },
        deleteStudent: (id)=> {
            dispatch(destroyStudent(id));
        },
        updateStudent: (student) => {
            dispatch(updateStudent(student));
        }
    };
};

const Students = connect(mapStateToProps, mapDispatchToProps)(_Students);

export default Students;
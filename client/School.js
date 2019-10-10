import React from 'react';
import { connect } from 'react-redux';
import { updateStudent } from './store';

class _School extends React.Component {
    render () {
        const { id } = this.props.match.params;
        const school = this.props.schools.find(school => school.id === id);

        if (!school) {
            return <div>Loading...</div>;
        }

        const numberOfStudents = school.students.length;
        const schoolName = school.name;
        const schoolImage = school.image;
        
        const studentsNotInSchool = this.props.students.filter(student => {
            if (school.students.find(schoolStudent => schoolStudent.id === student.id)) {
                return false;
            }

            return true;
        });

        const studentsInSchool = this.props.students.filter(student => {
            if (school.students.find(schoolStudent => schoolStudent.id === student.id)) {
                return true;
            }

            return false;
        });

        return (
            <div>
                <h1>{ schoolName }({ numberOfStudents } student(s) enrolled.)</h1>
                

                <select onChange={(evt) => this.props.addStudentToSchool(evt.target.value, school.id)}>
                    {studentsNotInSchool.map(student => <option key={ student.id } value={ student.id }>{ student.firstName } { student.lastName }</option>)}
                </select>
                <div className="cards">
                    {
                        studentsInSchool.map(student => (
                            <div key={ student.id }>
                                <h4>{ student.firstName } { student.lastName }</h4>
                                <div>
                                    <img src={ school.image } />
                                </div>

                                {/* <select onChange={(evt) => {
                                    const updatedStudent = {
                                        ...student,
                                        schoolId: evt.target.value
                                    };

                                    this.props.updateStudent(updatedStudent); 
                                }}>
                                    {
                                        schools.map( school => (<option key={ school.id } value={ school.id }>{ school.name }</option>))
                                    }
                                </select> */}
                                <button className="delete" onClick={() => this.props.deleteStudentFromSchool(student)}>Delete Student</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

// const mapStateToProps = (({ school }) => ({ school })); 

const mapDispatchToProps = (dispatch) => {
    return {
        // updateSchool: (school) => {
        //     dispatch(updateSchool(school));
        // },
        addStudentToSchool: (student, schoolId) => {
            const updatedStudent = {
                ...student,
                schoolId
            };

            console.log('updatedStudent', updatedStudent)
            dispatch(updateStudent(updatedStudent));
        },
        deleteStudentFromSchool: (student) => {
            const updatedStudent = {
                ...student
            };

            delete updatedStudent.studentId;

            console.log('updatedStudent', updatedStudent)
            dispatch(updateStudent(updatedStudent));
        }
    };
};

const mapStateToProps = state => {
    return {
        schools: state.schools,
        students: state.students
    };
};

const School = connect(mapStateToProps, mapDispatchToProps)(_School);

export default School;
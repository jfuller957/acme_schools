import React from 'react';
import { connect } from 'react-redux';
import { addNewStudent, destroyStudent } from './store';


class _Students extends React.Component{
    constructor(){
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            gpa: '',
            school: ''
        }
    }
    render(){
        const { students } = this.props || [];

        return (
        <div>
            Students -  there are { students.length } students.
            <form>
                <input name="firstName" placeholder="First Name" value={ students.firstName } onChange=
                    {(ev) => this.setState({ firstName: ev.target.value })} />
                <input name="lastName" placeholder="Last Name" value={ students.lastName } onChange=
                    {(ev) => this.setState({ lastName: ev.target.value })} />
                <input name="email" placeholder="Email Address" value={ students.email } onChange=
                    {(ev) => this.setState({ email: ev.target.value })} />
                <input name="gpa" placeholder="GPA" value={ students.gpa } onChange=
                    {(ev) => this.setState({ gpa: ev.target.value })} />
                <button onClick={ ()=> this.props.addStudent(this.state) }>Add Student</button>
            </form>
            <ul>
                {
                    students.map( student => 
                        <li key={ student.id }>
                            Name:  { student.lastName }, { student.firstName } 
                            - Email: { student.email } 
                            - GPA: { student.gpa } 
                            - School: { student.school && student.school.name } 
                        {/* <select>
                            {
                                Schools.map( school => <option key={ school.id }>{ school }</option>)
                            }
                        </select> */}

                            <button onClick={ ()=> this.props.deleteStudent(this.state) }>Delete Student</button>
                        </li>)   
                }
            </ul>

        </div>
        )
    }
}

const mapStateToProps = ({ students })=> ({ students });

const mapDispatchToProps = (dispatch) => {
    return {
        addStudent: (student)=> {
            dispatch(addNewStudent(student));
        },
        deleteStudent: (student)=> {
            dispatch(destroyStudent(student));
        }
    };
};

const Students = connect(mapStateToProps, mapDispatchToProps)(_Students);

export default Students;
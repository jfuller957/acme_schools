import React from 'react';
import { connect } from 'react-redux';
import { addNewStudent, destroyStudent, fetchSchools } from './store';


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
        console.log(this.props);
        const { students, schools } = this.props || [];

        return (
        <div id="content">
            <p>Students -  there are { students.length } students.</p>
                <form>
                    <label>First Name</label>
                    <input name="firstName" placeholder="James" value={ students.firstName } onChange=
                        {(ev) => this.setState({ firstName: ev.target.value })} />
                    
                    <label>Last Name</label>
                    <input name="lastName" placeholder="Fuller" value={ students.lastName } onChange=
                        {(ev) => this.setState({ lastName: ev.target.value })} />
                    
                    <label>Email Address</label>
                    <input name="email" placeholder="jfuller957@gmail.com" value={ students.email } onChange=
                        {(ev) => this.setState({ email: ev.target.value })} />

                    <label>GPA</label>
                    <input name="gpa" placeholder="4.0" value={ students.gpa } onChange=
                        {(ev) => this.setState({ gpa: ev.target.value })} />
                    <button onClick={ ()=> this.props.addStudent(this.state) }>Add Student</button>
                </form>

            <div className="cards">
                {
                    students.map( student => 
                        <div key={ student.id }>
                            <h4>{ student.firstName } { student.lastName }</h4><br />
                            
                            GPA: { student.gpa }<br />
                            - School: { student.school && student.school.name } 
                            <select>
                                {
                                    schools.map( school => <option key={ school.id }>{ school.name }</option>)
                                }
                            </select>
                            <button className="delete" onClick={ ()=> this.props.deleteStudent(student.id)}>Delete Student</button>
                        </div>)   
                }
            </div>

        </div>
        )
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
        }
    };
};

const Students = connect(mapStateToProps, mapDispatchToProps)(_Students);

export default Students;
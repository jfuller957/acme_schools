import React from 'react';
import { connect } from 'react-redux';
import { addNewStudent } from './store';

// () => addStudent(data)

class _Students extends React.Component{
    constructor(){
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: ''
        }
    }
    render(){
        const { students } = this.props || [];

        return (
        <div>
            Students -  there are { students.length } students.
            <form>
                <input name="firstName" value={ students.firstName } onChange=
                    {(ev) => this.setState({ firstName: ev.target.value })} />
                <input name="lastName" value={ students.lastName } onChange=
                    {(ev) => this.setState({ lastName: ev.target.value })} />
                <input name="email" value={ students.email } onChange=
                    {(ev) => this.setState({ email: ev.target.value })} />
                <button onClick={ ()=> this.props.addStudent(this.state) }>Add Student</button>
            </form>
            <ul>
                {
                    students.map( student => <li key={ student.id }>Name: { student.lastName }, { student.firstName } - Email: { student.email }</li>)   
                }
            </ul>

        </div>
        )
    }
}

// const _Students = ({ students, addStudent })=> <div>
//     Students -  there are { students.length } students.

//     <input value={ students.firstName }/>
//     <input value={ students.lastName } />
//     <button onClick={ addStudent }>Add Student</button>

//     <ul>
//         {
//             students.map( student => <li key={ student.id }>Name: { student.lastName }, { student.firstName } - Email: { student.email }</li>)   
//         }
//     </ul>

// </div>
// ;

const mapStateToProps = ({ students })=> ({ students });

const mapDispatchToProps = (dispatch) => {
    return {
        addStudent: (student)=> {
            dispatch(addNewStudent(student));
        }
    };
};

const Students = connect(mapStateToProps, mapDispatchToProps)(_Students);

export default Students;
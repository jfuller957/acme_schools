import React from 'react';
import { connect } from 'react-redux';
import { addNewStudent } from './store'


class _Form extends React.Component{
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
            <div>
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

                    <label>Choose a School</label>
                    <select onChange={ev => this.setState({ schoolId: ev.target.value })}>
                        {
                            schools.map(school => (<option key={ school.id } value={ school.id }>{ school.name }</option>))
                        }
                    </select>

                    <button onClick={() => this.props.addStudent(this.state)}>Add Student</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({ students, schools })=> ({ students, schools });

const mapDispatchToProps = (dispatch) => {
    return {
        addStudent: (student)=> {
            dispatch(addNewStudent(student));
        }
    };
};

const Form = connect(mapStateToProps, mapDispatchToProps)(_Form);

export default Form;
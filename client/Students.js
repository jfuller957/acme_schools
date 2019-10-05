import React from 'react';
import { connect } from 'react-redux';
import { addNewStudent } from './store';

const _Students = ({ students })=> <div>
    Students -  there are { students.length } students.

    <input value={ students.firstName }/>
    <input value={ students.lastName } />
    <button onClick={ addNewStudent }>Add Student</button>

    <ul>
        {
            students.map( student => <li key={ student.id }>Name: { student.lastName }, { student.firstName } - Email: { student.email }</li>)   
        }
    </ul>

</div>
;

const mapStateToProps = ({ students })=> ({ students });

const mapDispatchToProps = (dispatch) => {
    return {
        addStudent: ()=> {
            dispatch(addNewStudent());
        }
    };
};

const Students = connect(mapStateToProps, mapDispatchToProps)(_Students);

export default Students;
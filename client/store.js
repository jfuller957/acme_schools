import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

// Actions

const ADD_STUDENT = 'ADD_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENTS = 'UPDATE_STUDENTS';
const SET_STUDENTS = 'SET_STUDENTS';

const SET_SCHOOLS = 'SET_SCHOOLS';

// Reducer

const reducer = combineReducers({
    students: ( state = [], action)=> {
        let newState = [...state]; 

        if(action.type === ADD_STUDENT){      
            return [...state, action.student];
        }

        else if(action.type === DELETE_STUDENT){

            return newState.filter(student => action.student !== student.id);
        }

        else if(action.type === SET_STUDENTS){
            return action.students;
        }

        else if(action.type === UPDATE_STUDENTS){
            return action.students;
        }
        
        return newState;
    },

    schools: ( state = [], action)=> {
        if(action.type === SET_SCHOOLS){
            return action.schools;
        }
        return state;
    }
});

const store = createStore(reducer, applyMiddleware(thunk));

// Thunks

const addStudent = (student) => {
    return { type: ADD_STUDENT, student };
};

const addNewStudent = (newStudent)=> {
    return async (dispatch) => {
        const student = (await axios.post('/api/students', newStudent)).data;
        dispatch(addStudent(student));
    }
};

const deleteStudent = (student) => {
    return { type: DELETE_STUDENT, student };
};

const destroyStudent = (studentId) => {
    return async (dispatch) => {
        const student = (await axios.delete('/api/students/', {data : { id : studentId}})).data;
        dispatch(deleteStudent(studentId));
    }
}; 

const changeStudent = (students) => {
    return { type: UPDATE_STUDENTS, students };
};

const updateStudent = (changedStudent)=> {
    return async (dispatch) => {
        const student = (await axios.put('/api/students', changedStudent)).data;
        dispatch(changeStudent(student));
    }
};

const fetchStudents = async () => {
    store.dispatch({ type: SET_STUDENTS, students: (await axios.get('/api/students')).data });
};

const fetchSchools = async () => {
    store.dispatch({ type: SET_SCHOOLS, schools: (await axios.get('/api/schools')).data});
};

export { fetchStudents, fetchSchools, addNewStudent, destroyStudent, updateStudent };

export default store;

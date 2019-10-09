import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

// Actions

const ADD_STUDENT = 'ADD_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENTS = 'UPDATE_STUDENTS';
const SET_STUDENTS = 'SET_STUDENTS';

const SET_SCHOOL = 'SET_SCHOOL';
const SET_SCHOOLS = 'SET_SCHOOLS';
const UPDATE_SCHOOLS = 'UPDATE_SCHOOLS'

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

    schools: (state = [], action)=> {
        if(action.type === SET_SCHOOLS){
            return action.schools;
        }
        return state;
    },

    school: (state = [], action)=>{
        if(action.type === SET_SCHOOL){
            return action.school;
        }
        else if(action.type === UPDATE_SCHOOLS){
            return action.schools;
        }
        return state;
    }
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
    ));

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

const getSchool = async (school) => {
    return {type: SET_SCHOOL, school};
};

const fetchSchools = async () => {
    store.dispatch({ type: SET_SCHOOLS, schools: (await axios.get('/api/schools')).data});
};

const fetchSchool = async (school) => {
    if (!school) {
        console.log('No school passed into fetchSchool()');
        return;
    }

    store.dispatch({ type: SET_SCHOOL, school: (await axios.get(`/api/schools/${school.id}`)).data });
};

const changeSchools = (schools) => {
    return { type: UPDATE_SCHOOLS, schools };
};

const updateSchools = (changedSchools)=> {
    return async (dispatch) => {
        const school = (await axios.put('/api/schools', changedSchools)).data;
        dispatch(changeSchools(school));
    }
};

export { fetchStudents, fetchSchools, addNewStudent, destroyStudent, updateStudent, fetchSchool, getSchool, changeSchools, updateSchools };

export default store;

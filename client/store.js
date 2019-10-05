import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

const ADD_STUDENT = 'ADD_STUDENT';
const SET_STUDENTS = 'SET_STUDENTS';

const ADD_SCHOOL = 'ADD_SCHOOL';
const SET_SCHOOLS = 'SET_SCHOOLS';

const reducer = combineReducers({
    students: ( state = [], action)=> {
        if(action.type === ADD_STUDENT){
            state = [...state, action.student];
        }
        else if(action.type === SET_STUDENTS){
            state = action.students;
        }
        return state;
    },
    schools: ( state = [], action)=> {
        if(action.type === ADD_SCHOOL){
            state = [...state, action.school];
        }
        else if(action.type === SET_SCHOOLS){
            state = action.schools;
        }
        return state;
    }
});

const fetchStudents = async()=> {
    store.dispatch({ type: SET_STUDENTS, students: (await axios.get('/api/students')).data});
}

const fetchSchools = async()=> {
    store.dispatch({ type: SET_SCHOOLS, schools: (await axios.get('/api/schools')).data});
}

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

export { fetchStudents, fetchSchools };
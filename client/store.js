import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

const ADD_STUDENT = 'ADD_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const SET_STUDENTS = 'SET_STUDENTS';

const ADD_SCHOOL = 'ADD_SCHOOL';
const SET_SCHOOLS = 'SET_SCHOOLS';

const reducer = combineReducers({
    students: ( state = [], action)=> {
        let newState = [...state]; 
        if(action.type === ADD_STUDENT){          
            return [...state, action.student];
        }
        else if(action.type === DELETE_STUDENT){          
            return [...state, action.student];
        }
        else if(action.type === SET_STUDENTS){
            return action.students;
        }
        return newState;
    },

    schools: ( state = [], action)=> {
        if(action.type === ADD_SCHOOL){
            return [...state, action.school];
        }
        else if(action.type === SET_SCHOOLS){
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
    return async(dispatch)=> {
        const student = (await axios.post('/api/students', newStudent)).data;
        dispatch(addStudent(student));
    }
};

const deleteStudent = (student) => {
    return { type: DELETE_STUDENT, student };
};

const destroyStudent = (destroyedStudent) => {
    return async(dispatch)=> {
        const student = (await axios.delete('/api/students/:id', destroyedStudent)).data;
        dispatch(deleteStudent(student));
    }
} 

const addSchool = (school) => {
    return { type: ADD_SCHOOL, school };
};

const addNewSchool = (newSchool)=> {
    return async(dispatch)=> {
        const school = (await axios.post('/api/schools', newSchool)).data;
        dispatch(addSchool(school));
    }
}

const fetchStudents = async()=> {
    store.dispatch({ type: SET_STUDENTS, students: (await axios.get('/api/students')).data});
};

const fetchSchools = async()=> {
    store.dispatch({ type: SET_SCHOOLS, schools: (await axios.get('/api/schools')).data});
};



export default store;

export { fetchStudents, fetchSchools, addNewStudent, destroyStudent, addNewSchool };
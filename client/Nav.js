import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const _Nav = ({ studentCount, schoolCount, location})=> {
    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/students'>Students ({ studentCount })</Link>
            <Link to='/schools'>Schools ({ schoolCount })</Link>
        </nav>
    );
};


const Nav = connect(({ students, schools, location }) => {
    return {
        studentCount: students.length,
        schoolCount: schools.length
    }
})(_Nav); 



export default Nav;
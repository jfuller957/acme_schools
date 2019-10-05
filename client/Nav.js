import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Schools from './Schools';

const _Nav = ({ studentCount, schoolCount, popSchool, topSchool, location})=> {
    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/students'>Students ({ studentCount })</Link>
            <Link to='/schools'>Schools ({ schoolCount })</Link>
            <Link to='/schools'>Most Popular School ({ popSchool })({ studentCount })</Link>
            <Link to='/schools'>Top School ({ topSchool })</Link>
        </nav>
    );
};


const Nav = connect(({ students, schools, location }) => {
    return {
        studentCount: students.length,
        schoolCount: schools.length,
        popSchool: 'UCSD',
        topSchool: 'Cal-Poly'
    }
})(_Nav); 



export default Nav;
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const _Nav = ({ studentCount, schoolCount, popSchool, topSchool, location})=> {
    return (
        <nav>
            <Link id="lefty" to='/'>Acme Schools</Link>
            <Link to='/students'>Students ({ studentCount })</Link>
            <Link to='/schools'>Schools ({ schoolCount })</Link>
            <Link to='/school/popular'>Most Popular School ({ popSchool.name })({ popSchool.numberOfStudents })</Link>
            <Link to='/schools'>Top School ({ topSchool.name })</Link>
        </nav>
    );
};

const Nav = connect(({ students, schools, location }) => {
    let popSchool = {
        name: "",
        numberOfStudents: 0
    };

    let topSchool = {
        name: "",
        avgGpa: 0
    }

    schools.forEach(school => {

        // see if school is more popular
        if (popSchool.numberOfStudents < school.students.length) {
            popSchool.name = school.name;
            popSchool.numberOfStudents = school.students.length;
        }


        // see if school has higher gpa
        let gpaTotal = 0;
        school.students.forEach(student => gpaTotal += parseFloat(student.gpa));

        let avgGpa = gpaTotal / school.students.length;

        if (avgGpa > topSchool.avgGpa) {
            topSchool.name = school.name;
            topSchool.avgGpa = avgGpa;
        }
    });

    return {
        studentCount: students.length,
        schoolCount: schools.length,
        popSchool,
        topSchool
    }
})(_Nav); 

export default Nav;
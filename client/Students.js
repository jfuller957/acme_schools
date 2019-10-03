import React from 'react';

const Students = ({ students }) => {
    return (
        <ul>
            {
                students.map( student => <li key={ student.id }>{student.name}</li>)
            }
        </ul>
    );
};

export default Students;
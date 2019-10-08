import React from 'react';
import { connect } from 'react-redux';

const _Home = ({ students, schools })=> <div>
    <br /><br />
    Home -  there are { students.length } students and { schools.length } schools.

    Our most popular school is XXXXXX with XXXXXX students.<br /><br />
    Our top performing school is XXXXX with and average GPA of ###.<br /><br />

    

</div>
;

const mapStateToProps = ({ students, schools })=> ({ students, schools });


const Home = connect(mapStateToProps)(_Home);

export default Home;
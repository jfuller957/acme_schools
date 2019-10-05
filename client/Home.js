import React from 'react';
import { connect } from 'react-redux';

const _Home = ({ students, schools })=> <div>
    Home -  there are { students.length } students and { schools.length } schools.


</div>
;

const mapStateToProps = ({ students, schools })=> ({ students, schools });


const Home = connect(mapStateToProps)(_Home);

export default Home;
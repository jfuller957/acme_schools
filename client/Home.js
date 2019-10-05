import React from 'react';
import { connect } from 'react-redux';

const _Home = ({ students })=> <div>
    Home -  there are { students.length } students.
</div>
;

const mapStateToProps = ({ students })=> ({ students });
// const mapDispatchToProps = (dispatch)=> {
//     return {

//     }
// }

const Home = connect(mapStateToProps)(_Home);

export default Home;
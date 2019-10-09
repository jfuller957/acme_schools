import React from 'react';
import { connect } from 'react-redux';
import { fetchSchool } from './store';

class _School extends React.Component{
    // constructor(){
    //     super();
    // }
    // async componentDidMount(){
    //     fetchSchool(this.props.match.params.id);
    // }

    render () {
        const { school } = this.props || {};
        console.log('School page.');

        /**
         * - Students drop down (added by selecting name)
         * - School Name
         * - Students in School
         */

        console.log(this.props, '<<');

        return (
            <div>
                <p>Hey! { school.name } has XXX students.</p>
                <div><img src={school.image} /></div>
            </div>
        )
    }
}

const mapStateToProps = (({ school }) => ({ school })); 

// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateSchool: (school) => {
//             dispatch(updateSchool(school));
//         }
//     };
// };

const School = connect(mapStateToProps)(_School);

export default School;
import React from 'react';
import { connect } from 'react-redux';
import { fetchSchool } from './store';

class _School extends React.Component{
    constructor(){
        super();
        console.log('loaded');
    }


    componentDidMount(){
        this.props.fetchSchool(this.props.location.search.split('=')[1])
    }

    render(){
        const {school} = this.props || {};

        return(
            <div>
                {console.log(school)}
                <p></p>
                <img />
            </div>
        )
    }
}

const mapStateToProps = (({school}) => ({school})); 
const mapDispatchToProps = (dispatch) => {
    return {
        fetchSchool: (school) => {
            dispatch(fetchSchool(school));
        }
    };
};
const School = connect(mapStateToProps, mapDispatchToProps)(_School);

export default School;
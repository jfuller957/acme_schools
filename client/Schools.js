import React from 'react';
import { connect } from 'react-redux';

const _Schools = ({ schools })=> <div>
    The following school types are available to attend in California: 

    <ul>
        {
            schools.map( school => <li key={ school.id }>{ school.name }</li>)   
        }
    </ul>
</div>
;

const mapStateToProps = ({ schools })=> ({ schools });

const Schools = connect(mapStateToProps)(_Schools);

export default Schools;
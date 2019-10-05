import React from 'react';
import { connect } from 'react-redux';

const _Schools = ({ schools })=> <div>
    Schools -  there are { schools.length } schools.
</div>
;

const mapStateToProps = ({ schools })=> ({ schools });

const Schools = connect(mapStateToProps)(_Schools);

export default Schools;
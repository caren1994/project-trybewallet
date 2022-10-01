import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{total}</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}
Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.user.total,
});
export default connect(mapStateToProps, null)(Header);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  calculaTotal = () => {
    const { expenses } = this.props;
    const valorTotal = expenses.reduce((acc, curr) => { // TIVE QUE LEMBRAR DE COMO FAZER REDUCE, NA 9 O OUTRO JEITO NAO ESTAVA DANDO CERTO!
      const moeda = curr.currency; // curr valor atual do elemento currency

      const mult = Number(curr.exchangeRates[moeda].ask) * Number(curr.value); // curr valor atual do elemento value
      return acc + Number(mult);
    }, 0); // começa com o valor 0 acc
    return Number(valorTotal).toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">
          Valor Total: $
          {this.calculaTotal()}
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}
Header.propTypes = {

  email: PropTypes.string,
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});
export default connect(mapStateToProps, null)(Header);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  // handleClick = (id,currency) => {
  //   const{expenses}=this.props;

  // };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>

            <th>Tag</th>

            <th>Método de pagamento</th>

            <th>Valor</th>

            <th>Moeda</th>

            <th>Câmbio utilizado</th>

            <th>Valor convertido</th>

            <th>Moeda de conversão</th>

            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((element) => {
            const Converted = Number(element.exchangeRates[element.currency].ask)
              * Number(element.value);
            const currency = Number(
              element.exchangeRates[element.currency].ask,
            );
            return (
              <tr key={ element.id }>
                <td>{element.description}</td>
                <td>{element.tag}</td>
                <td>{element.method}</td>
                <td>{Number(element.value).toFixed(2)}</td>
                <td>{element.exchangeRates[element.currency].name}</td>
                <td>{currency.toFixed(2)}</td>
                <td>{Converted.toFixed(2)}</td>
                <td>Real</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
Table.propTypes = {

  expenses: PropTypes.array,

}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);

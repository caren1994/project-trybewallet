import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getExclui, alteraStateEditor } from '../redux/actions';

class Table extends Component {
  handleClick = (id) => {
    const { dispatch, expenses } = this.props;
    const exclui = expenses.filter((element) => element.id !== id);
    dispatch(getExclui(exclui)); // altera o obj do expenses
  };

  AlteraEditor = (id) => {
    const { dispatch } = this.props;
    dispatch(alteraStateEditor(id)); // altera o state do editor
  };

  render() {
    const { expenses } = this.props;
    return (
      <table className="tabela">
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
            const fixed = Converted.toFixed(2);
            const currency = Number(
              element.exchangeRates[element.currency].ask, // esta  acessando o objeto pela key dele (element.currency) e pegando o valor de ask dentro desse objeto,Seria um exchance.(key do objeto, no caso sigla da moeda).ask
            );
            return (
              <tr key={ element.id }>
                <td>{element.description}</td>
                <td>{element.tag}</td>
                <td>{element.method}</td>
                <td>{Number(element.value).toFixed(2)}</td>
                <td>{element.exchangeRates[element.currency].name}</td>
                <td>{currency.toFixed(2)}</td>
                <td>{fixed}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.AlteraEditor(element.id) }
                  >
                    Editar despesa
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleClick(element.id) }
                  >
                    Excluir
                  </button>

                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.array,

}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);

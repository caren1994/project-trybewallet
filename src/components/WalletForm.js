import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApi());
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="valorDespesa">
            <input
              type="number"
              data-testid="value-input"
              name="valorDespesa"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="descricaoDespesa">
            <input
              type="text"
              data-testid="description-input"
              name="descricaoDespesa"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="moeda">
            Moeda:
            <select
              name="moeda"
              data-testid="currency-input"
              onChange={ this.handleChange }
            >
              {currencies.map((currencie, index) => (
                <option key={ index }>{currencie}</option>
              ))}
            </select>
          </label>
          <label htmlFor="metodoPagemento">
            Método de pagamento:
            <select
              name="metodoPagamento"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option> Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categoriaDespesa">
            Tipo de Despesas:
            <select
              name="categoriaDespesa"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  isLoading: PropTypes.string,
  currencies: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, null)(WalletForm);

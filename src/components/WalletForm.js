import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi, fetchApiCotacao } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: 0,
    id: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApi());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { dispatch } = this.props;
    const { id } = this.state;
    dispatch(fetchApiCotacao(this.state));
    this.setState({
      id: id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value,
      description,
      currency,
      method,
      tag } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor da Despesa:
            <input
              type="number"
              data-testid="value-input"
              name="value"
              value={ value }
              id="value"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição da Despesa:
            <input
              type="text"
              data-testid="description-input"
              name="description"
              id="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              value={ currency }
              data-testid="currency-input"
              onChange={ this.handleChange }
            >
              {currencies.map((currencie, index) => (
                <option key={ index } value={ currencie }>{currencie}</option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              name="method"
              id="method"
              value={ method }
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito"> Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tipo de Despesas:
            <select
              name="tag"
              id="tag"
              value={ tag }
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.string,
  currencies: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  // expenses: state.wallet.expenses,
});
// const mapDispatchToProps = (dispatch) => ({
//   requisicao: (state) => dispatch(fetchApiCotacao(state)),
//   requisicaoMoeda: () => dispatch(fetchApi()),

// });

export default connect(mapStateToProps)(WalletForm);

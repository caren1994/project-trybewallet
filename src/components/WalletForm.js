import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi, fetchApiCotacao, newExpense } from '../redux/actions';

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
    dispatch(fetchApi()); // dispara a action que faz a requisicao a api
  }

  handleChange = ({ target }) => { // função generica que salva no state os inputs
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(fetchApiCotacao(this.state)); // dispara a action para salvar no store as informações
    this.resetState(); // limpo os campos
  };

  handleEditor = () => {
    const { id, expenses, dispatch } = this.props; // recebo o id , e o expenses do state
    const findObj = expenses.find((element) => element.id === id); // encontr o obj do expenses igual ao id guardado
    const expensesObj = expenses.filter((element) => element.id !== id); // retorna um filter de elementos diferentes do id selecionado
    const { exchangeRates } = findObj;// recupera do obj igual ao is o exchange daquele momento(readme pede)
    const { value, description, currency, method, tag } = this.state; // recupero oq foi digitado no input
    const editObj = { id, value, description, currency, method, tag, exchangeRates }; // coloco oq vai sr alterado no obj
    const newObj = [...expensesObj, editObj].sort((a, b) => a.id - b.id); // sort para colocar em ordem numerica
    dispatch(newExpense(newObj)); // envio para a action que vai alterar o reduce
    this.resetState();
  };

  resetState = () => {
    const { id } = this.state;
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
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
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
                <option key={ index } value={ currencie }>
                  {currencie}
                </option>
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
          {editor ? ( // se tiver true mostra um botao se for false mostra o outro
            <button type="button" onClick={ this.handleEditor }>
              Editar despesa
            </button>
          ) : (
            <button type="button" onClick={ this.handleClick }>
              Adicionar despesa
            </button>
          )}
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

const mapStateToProps = (state) => ({ // recupero do store as info
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  id: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
});
// const mapDispatchToProps = (dispatch) => ({
//   requisicao: (state) => dispatch(fetchApiCotacao(state)),
//   requisicaoMoeda: () => dispatch(fetchApi()),

// });

export default connect(mapStateToProps)(WalletForm);

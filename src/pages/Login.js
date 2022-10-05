import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.verifyBtn()); // chamo a função aqui para nao ter "delay"
  };

  verifyBtn = () => { // validação do campo de email e password e troca para false o botao
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const numberMin = 6;
    const verifyEmail = regex.test(email);
    const verifypassword = password.length >= numberMin;
    this.setState({ isDisabled: !(verifyEmail && verifypassword) });
  };

  handleClick = (e) => { // dispara a action q salva o email no store e muda para outra pagina
    e.preventDefault();
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(getEmail(email));
    history.push('/carteira');
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <form className="form">
        <p>Email:</p>
        <label htmlFor="email">

          <input
            id="email"
            className="email"
            type="email"
            data-testid="email-input"
            name="email"
            onChange={ this.handleChange }
          />

        </label>
        <p>Senha:</p>
        <label htmlFor="password">

          <input
            id="password"
            className="password"
            type="password"
            data-testid="password-input"
            name="password"
            onChange={ this.handleChange }
          />

        </label>
        <button
          className="buttonEntrar"
          type="submit"
          disabled={ isDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </form>
    );
  }
}
Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('60% dos testes', () => {
  it('componente login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const password = screen.getByTestId('password-input');
    const email = screen.getByTestId('email-input');
    const button = screen.getByRole('button', { name: /entrar/i });
    const testeemail = 'caren@oliveira.com';
    const testesenha = '123456';
    expect(password).toBeInTheDocument();
    expect(email).toBeInTheDocument();

    userEvent.type(email, testeemail);
    userEvent.type(password, testesenha);
    userEvent.click(button);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });
  it('rota /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const { location: { pathname } } = history;
    const value1 = screen.getByText(/Valor da Despesa:/i);
    const description1 = screen.getByText(/Descrição da Despesa:/i);
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    expect(pathname).toBe('/carteira');
    expect(value1).toBeInTheDocument();
    expect(description1).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
  });
  it('botao adc despesa', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const { location: { pathname } } = history;
    const buttonAdc = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    expect(pathname).toBe('/carteira');
    expect(buttonAdc).toBeInTheDocument();
  });
  it('adc despesa', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const { location: { pathname } } = history;
    const value1 = screen.getByTestId('value-input');
    const description1 = screen.getByTestId('description-input');
    const buttonAdc = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    expect(pathname).toBe('/carteira');
    expect(buttonAdc).toBeInTheDocument();
    userEvent.type(value1, '5');
    userEvent.type(description1, 'salgado');
    userEvent.click(buttonAdc);

    const btnExcluir = await screen.findByTestId('delete-btn');
    const tipoGasto = await screen.findByRole('cell', {
      name: /alimentação/i,
    });
    expect(btnExcluir).toBeInTheDocument();
    expect(tipoGasto).toBeInTheDocument();
    userEvent.click(btnExcluir);
  });
});
describe('90% dos testes', () => {
  it('data-testid no header', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
    expect(screen.getByTestId('header-currency-field')).toBeInTheDocument();
  });
  it('botao de editar', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const value1 = screen.getByPlaceholderText(/value/i);
    const description1 = screen.getByPlaceholderText(/description/i);
    const buttonAdc = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    userEvent.type(value1, '5');
    userEvent.type(description1, 'salgado');
    userEvent.click(buttonAdc);
    const edit = await screen.findByRole('button', {
      name: /editar/i,
    });

    userEvent.click(edit);

    const buttonEditar = await screen.findByRole('button', {
      name: /editar despesas/i });
    const valorTotal = await screen.findByText(/valor total:/i);
    expect(buttonEditar).toBeInTheDocument();
    expect(valorTotal).toBeInTheDocument();
  });
  it('editadando despesa', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const { location: { pathname } } = history;

    const buttonAdc = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    const value1 = screen.getByTestId('value-input');
    const description1 = screen.getByTestId('description-input');

    userEvent.type(value1, '5');
    userEvent.type(description1, 'salgado');
    userEvent.click(buttonAdc);
    const edit = await screen.findByRole('button', {
      name: /editar/i,
    });

    userEvent.click(edit);

    const buttonEditar = await screen.findByRole('button', {
      name: /editar despesas/i });

    userEvent.type(value1, '96');
    userEvent.type(description1, 'PIZZA');

    userEvent.click(buttonEditar);

    const EDITADO = await screen.findByText('PIZZA');

    expect(pathname).toBe('/carteira');
    expect(edit).toBeInTheDocument();
    expect(buttonAdc).toBeInTheDocument();
    expect(EDITADO).toBeInTheDocument();
  });
  it('total value', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const valueT = screen.getByTestId('total-field');

    expect(valueT).toBeInTheDocument();
    expect(valueT).toHaveTextContent('0.00');
  });
  it('text brl', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const text = screen.getByText(/brl/i);
    expect(text).toBeInTheDocument();
  });
});

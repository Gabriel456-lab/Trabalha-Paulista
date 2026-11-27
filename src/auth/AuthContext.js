import React, { createContext, useContext, useState } from 'react';

const ACCOUNTS_KEY = 'trabalhaPaulista:accounts';
const LOCAL_SESSION_KEY = 'trabalhaPaulista:session';
const TAB_SESSION_KEY = 'trabalhaPaulista:tabSession';

const AuthContext = createContext(null);

function readAccounts() {
  const savedAccounts = localStorage.getItem(ACCOUNTS_KEY);
  if (!savedAccounts) return [];

  let accounts;
  try {
    accounts = JSON.parse(savedAccounts);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Os cadastros salvos neste navegador estão inválidos. Apague os dados do site para continuar.');
    }
    throw error;
  }

  if (!Array.isArray(accounts) || accounts.some((account) => (
    !account
    || typeof account !== 'object'
    || typeof account.id !== 'string'
    || typeof account.email !== 'string'
    || typeof account.senha !== 'string'
  ))) {
    throw new Error('Os cadastros salvos neste navegador estão inválidos. Apague os dados do site para continuar.');
  }
  return accounts;
}

function publicAccount(account) {
  const { senha, cpf, cnpj, celular, bairro, ...safeAccount } = account;
  return safeAccount;
}

function restoreSession() {
  try {
    const savedId = localStorage.getItem(LOCAL_SESSION_KEY) || sessionStorage.getItem(TAB_SESSION_KEY);
    if (!savedId) return { user: null, error: '' };

    const account = readAccounts().find((item) => item.id === savedId);
    if (!account) {
      localStorage.removeItem(LOCAL_SESSION_KEY);
      sessionStorage.removeItem(TAB_SESSION_KEY);
      return { user: null, error: '' };
    }
    return { user: publicAccount(account), error: '' };
  } catch (error) {
    return {
      user: null,
      error: error instanceof Error ? error.message : 'Não foi possível acessar os dados salvos neste navegador.',
    };
  }
}

function saveAccounts(accounts) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(restoreSession);

  const register = (accountData) => {
    const email = accountData.email.trim().toLowerCase();
    if (!['candidato', 'empresa'].includes(accountData.tipoCadastro)) {
      throw new Error('Selecione se o cadastro é de candidato ou empresa.');
    }
    const accounts = readAccounts();
    if (accounts.some((account) => account.email === email)) {
      throw new Error('Já existe uma conta cadastrada com este e-mail.');
    }

    const account = {
      ...accountData,
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      email,
    };
    saveAccounts([...accounts, account]);
    return publicAccount(account);
  };

  const login = (emailInput, senha, tipoCadastro, lembrar) => {
    const email = emailInput.trim().toLowerCase();
    const account = readAccounts().find((item) => item.email === email);
    if (!account || account.senha !== senha || account.tipoCadastro !== tipoCadastro) {
      throw new Error('E-mail, senha ou tipo de conta incorretos.');
    }

    const storage = lembrar ? localStorage : sessionStorage;
    const sessionKey = lembrar ? LOCAL_SESSION_KEY : TAB_SESSION_KEY;
    const otherStorage = lembrar ? sessionStorage : localStorage;
    const otherSessionKey = lembrar ? TAB_SESSION_KEY : LOCAL_SESSION_KEY;
    storage.setItem(sessionKey, account.id);
    otherStorage.removeItem(otherSessionKey);
    setSession({ user: publicAccount(account), error: '' });
    return publicAccount(account);
  };

  const hasAccount = (emailInput) => {
    const email = emailInput.trim().toLowerCase();
    return readAccounts().some((account) => account.email === email);
  };

  const updatePassword = (emailInput, senha) => {
    const email = emailInput.trim().toLowerCase();
    const accounts = readAccounts();
    const accountIndex = accounts.findIndex((account) => account.email === email);
    if (accountIndex === -1) throw new Error('Não encontramos uma conta com este e-mail.');

    const updatedAccounts = accounts.slice();
    updatedAccounts[accountIndex] = { ...updatedAccounts[accountIndex], senha };
    saveAccounts(updatedAccounts);
    if (session.user && session.user.email === email) {
      setSession({ ...session, user: publicAccount(updatedAccounts[accountIndex]) });
    }
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_SESSION_KEY);
    sessionStorage.removeItem(TAB_SESSION_KEY);
    setSession({ user: null, error: '' });
  };

  const deleteAccount = () => {
    if (!session.user) throw new Error('Entre na sua conta para poder excluí-la.');
    const accounts = readAccounts().filter((account) => account.email !== session.user.email);
    saveAccounts(accounts);
    logout();
  };

  return (
    <AuthContext.Provider
      value={{
        user: session.user,
        storageError: session.error,
        register,
        login,
        hasAccount,
        updatePassword,
        logout,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  return context;
}

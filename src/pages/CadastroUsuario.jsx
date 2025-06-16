import React, { useState } from 'react';
import './CadastrarUsuario.css';

function CadastroUsuario() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    tipo: 'profissional',
    skills: '',
    cnpj: ''
  });
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTipoChange = e => {
    setForm({ ...form, tipo: e.target.value, cnpj: '', skills: '' });
  };

  const validarEmail = email => /\S+@\S+\.\S+/.test(email);
  const validarCNPJ = cnpj => /^\d{14}$/.test(cnpj.replace(/\D/g, ''));

  const handleSubmit = async e => {
    e.preventDefault();
    setMensagem('');
    setErro('');

    if (!validarEmail(form.email)) {
      setErro('E-mail inválido');
      return;
    }
    if (form.tipo === 'empresa' && !validarCNPJ(form.cnpj)) {
      setErro('CNPJ inválido (apenas números, 14 dígitos)');
      return;
    }

    setLoading(true);
    const payload = {
      ...form,
      skills: form.tipo === 'profissional' ? form.skills.split(',').map(s => s.trim()) : undefined,
      cnpj: form.tipo === 'empresa' ? form.cnpj : undefined
    };
    try {
      const res = await fetch('http://127.0.0.1:5000/api/usuarios/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        setMensagem('Usuário cadastrado com sucesso!');
        setForm({
          nome: '',
          email: '',
          senha: '',
          tipo: 'profissional',
          skills: '',
          cnpj: ''
        });
      } else {
        setErro(data.erro || 'Erro ao cadastrar');
      }
    } catch {
      setErro('Erro de conexão');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="cadastro-form">
      <h2>Cadastro de Usuário</h2>
      <label>
        Nome
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
      </label>
      <label>
        Email
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      </label>
      <label>
        Senha
        <input name="senha" type="password" placeholder="Senha" value={form.senha} onChange={handleChange} required />
      </label>
      <label>
        Tipo
        <select name="tipo" value={form.tipo} onChange={handleTipoChange}>
          <option value="profissional">Profissional</option>
          <option value="empresa">Empresa</option>
        </select>
      </label>
      {form.tipo === 'profissional' && (
        <label>
          Skills (separadas por vírgula)
          <input name="skills" placeholder="Skills" value={form.skills} onChange={handleChange} />
        </label>
      )}
      {form.tipo === 'empresa' && (
        <label>
          CNPJ
          <input name="cnpj" placeholder="CNPJ" value={form.cnpj} onChange={handleChange} required />
        </label>
      )}
      <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Cadastrar'}</button>
      {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </form>
  );
}

export default CadastroUsuario;
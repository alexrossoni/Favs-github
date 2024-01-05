import { useState, useCallback, useEffect } from "react";
import { Container, Form, SubmitButton, List, DeleteButton, ActionButtonsContainer } from "./styles";
import { FaGithub, FaPlus, FaSpinner, FaSignInAlt, FaTrash } from 'react-icons/fa'
import api from '../../services/api'
import { Link } from "react-router-dom";

function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Carregar repositórios salvos
  useEffect(() => {
    const localStorageRepos = localStorage.getItem('repos');

    if (localStorageRepos) {
      setRepositorios(JSON.parse(localStorageRepos));
    }
  }, []);

  // Salvar repositórios
  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repositorios));
  }, [repositorios]);

  function handleInputChange(e) {
    setNewRepo(e.target.value);
    setAlert(null);
  }

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    async function submit() {
      setLoading(true);
      setAlert(null);
      try {
        if (newRepo === '') {
          throw new Error('É necessário inserir o nome de um repositório!');
        }

        const response = await api.get(`repos/${newRepo}`);

        const hasRepo = repositorios.find(repo => repo.name === newRepo);

        if (hasRepo) {
          throw new Error('Repositório já está presente na listagem!');
        }
    
        const data = {
          name: response.data.full_name
        };

        setRepositorios([...repositorios, data]);
        setNewRepo('');
      } catch (error) {
        setAlert(true);
        console.error('Erro ao carregar o repositório:', error);
      } finally {
        setLoading(false);
      }
    }

    submit();
  }, [newRepo, repositorios])

  const handleDelete = useCallback((repo) => {
    const find = repositorios.filter(r => r.name !== repo);
    setRepositorios(find);
  }, [repositorios])

  return(
    <Container>
      <h1>
        <FaGithub size={25} />
        Repositórios favoritos
      </h1>

      <Form onSubmit={handleSubmit} error={alert ? 1 : 0}>
        <input type="text" placeholder="Adicionar repositório" value={newRepo} onChange={handleInputChange} />

        <SubmitButton loading={loading ? 1 : 0}>
          { loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#FFF" size={14} />
          ) }
        </SubmitButton>
      </Form>

      <List>
        { repositorios.map(repo => (
          <li key={repo.name}>
            <span>
              { repo.name }
            </span>
            <ActionButtonsContainer>
              <DeleteButton onClick={() => handleDelete(repo.name)}>
                  <FaTrash size={20} color="ED4337" />
              </DeleteButton>
              <Link to={`repositorio/${encodeURIComponent(repo.name)}`}>
                <FaSignInAlt size={20} />
              </Link>
            </ActionButtonsContainer>
          </li>
        )) }
      </List>
    </Container>
  )
}

export default Main;
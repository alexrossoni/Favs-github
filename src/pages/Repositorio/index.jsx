import { useParams } from "react-router";
import { Container, Owner, Loading, BackButton, IssuesList, PageActions, FilterList } from './styles';
import { useState, useEffect } from "react";
import api from '../../services/api'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function Repositorio() {
  const { repositorio } = useParams();
  const [ repo, setRepo ] = useState({});
  const [ issues, setIssues ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState([
    {state: 'all', label: 'Todas', active: true},
    {state: 'open', label: 'Abertas', active: false},
    {state: 'closed', label: 'Fechadas', active: false},
  ]);
  const [filterIndex, setFilterIndex] = useState(0);

  useEffect(() => {
    async function load() {
      const nomeRepo = repositorio;

      const [repositorioData, issuesData] = await Promise.all([
        api.get(`repos/${nomeRepo}`),
        api.get(`repos/${nomeRepo}/issues`, {
          params: {
            state: filters.find(f => f.active).state,
            per_page: 5
          }
        })
      ])

      setRepo(repositorioData.data);
      setIssues(issuesData.data);
      setLoading(false);
    }

    load();
  }, [filters, repositorio])

  function handlePage(action){
    setPage(action === 'back' ? page - 1 : page + 1 )
  }

  function handleFilter(index){
    setFilterIndex(index);
  }

  useEffect(()=> {
    async function loadIssue(){
      const nomeRepo = repositorio;

      const response = await api.get(`/repos/${nomeRepo}/issues`, {
        params:{
          state: filters[filterIndex].state,
          page,
          per_page: 5,
        },
      });

      setIssues(response.data);
    }

    loadIssue();
  }, [filterIndex, filters, repositorio, page]);

  if(loading){
    return(
      <Loading>
        <h1>Carregando...</h1>
      </Loading>
    )
  }

  return(
    <Container>
      <BackButton to="/">
        <FaArrowLeft color="#000" size={30} />
      </BackButton>

      <Owner>
        <img
          src={repo.owner.avatar_url}
          alt={repo.owner.login}
        />
        <h1>{repo.name}</h1>
        <p>{repo.description}</p>
      </Owner>

      <FilterList active={filterIndex}>
        <h3>Issues</h3>
        <div>
          {filters.map((filter, index) => (
            <button
              type="button"
              key={filter.label}
              onClick={() => handleFilter(index)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </FilterList>

      <IssuesList>
        {issues.map(issue => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />

            <div className="content">
              <strong>
                <a href={issue.html_url}>{issue.title}</a>
              </strong>
              
              <div className="markers">
                {issue.labels.map(label => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </div>

              <p>{issue.user.login}</p>

            </div>

          </li>
        ))}
      </IssuesList>

      <PageActions>
        <button type="button" onClick={()=> handlePage('back') } disabled={page < 2}>
          <FaArrowLeft />
        </button>

        <h3>{ page }</h3>

        <button type="button" onClick={()=> handlePage('next') }>
          <FaArrowRight />
        </button>
      </PageActions>
    </Container>
  )
}

export default Repositorio;
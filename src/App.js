import React,{ useEffect,useState }  from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories,setRepositories] = useState([])
  useEffect(()=>{
    api.get('/repositories').then(response=>setRepositories(response.data))
  },[])
  async function handleAddRepository() {
    const {data} = await api.get('/repositories')
    const {data:{title,url,techs,likes}} = await api.post(`/repositories`,{
      title,url,techs,likes
    })
    setRepositories(data)
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    const {data} = await api.get('/repositories')
    setRepositories(data)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository=>   
         (
        <li key={repository.id}>{`${repository.title}`}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)
      )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

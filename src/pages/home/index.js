import React, {useState} from 'react';
import axios from 'axios';
import * as S from './styled';
import {useHistory} from 'react-router-dom';

function App(props) {
  const history = useHistory();
  const [user, setUser] = useState("");
  const [error, setError] = useState(false);

  function handleSearch() {
    const url = `https://api.github.com/users/${user}/repos`;
    axios
      .get(url)
      .then(response => {
        const repositories = response.data;
        const repositoriesName = [];

        repositories.forEach(repository => {
          repositoriesName.push(repository.name);
        });

        localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
        history.push("/repositories");
      })
      .catch(err => {
        setError(true);
      })
  }

  return (
    <S.HomeContainer>
    <S.Content>
    <S.Input className="form" placeholder="username" value={user} onChange={e => setUser(e.target.value)}/>
    <S.Button type="button" onClick={handleSearch}>Pesquisar</S.Button>
    </S.Content>
    {
      error ? <S.ErrorMessage>Usuário não encontrado, tente novamente!</S.ErrorMessage> : ""
    }
    </S.HomeContainer>
  );
}

export default App;
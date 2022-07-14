/* eslint-disable no-console */
import React , {useState} from 'react';
import Mainpage from './Mainpage';

function Home() {
  const [input, setInput] = useState('');
  const [result , setResult] = useState(null);
  const onInputChange = (ev) => {
    setInput(ev.target.value);
  }
  const onSearch = () => {
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`).then(r => r.json()).then(res => setResult(res));
  }
  const onEnter = (ev) => {
    if(ev.keyCode === 13){
        onSearch();
    }
  }
  const searchResult = () => {
    if(result && result.length === 0){
        return <div>No Results</div>;
    }
    if(result && result.length > 0){
        return <div>{result.map(el => <div key={el.show.id}>{el.show.name}</div>)}</div>
    }
    return null;
  }
  return (
    <Mainpage>
          <input type="text" onChange={onInputChange} onKeyDown={onEnter} value={input} />
          <button type="submit" onClick={onSearch}>Search</button>
          {searchResult()}
      </Mainpage>
  );
}

export default Home;

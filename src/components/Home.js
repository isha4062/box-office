/* eslint-disable no-console */
import React , {useState} from 'react';
import ActorGrid from './actor/ActorGrid';
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from './Home.styled';
import Mainpage from './Mainpage';
import { LastQuery } from './misc/custom-hooks';
import ShowGrid from './show/ShowGrid';

function Home() {
  const [input, setInput] = LastQuery();
  const [result , setResult] = useState(null);
  const [search , setSearch] = useState('shows');

  const isChecked = search === 'shows';
  const onInputChange = (ev) => {
    setInput(ev.target.value);
  }
  const onSearch = () => {
    fetch(`https://api.tvmaze.com/search/${search}?q=${input}`).then(r => r.json()).then(res => setResult(res));
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
        return result[0].show? <ShowGrid result={result} /> : <ActorGrid result={result} />
    }
    return null;
  }
  const setSearchOption = (ev) => {
    setSearch(ev.target.value);
  }
  return (
    <Mainpage>
          <SearchInput type="text" onChange={onInputChange} onKeyDown={onEnter} value={input} placeholder='Type here to search'/>
          <RadioInputsWrapper>
            <div>
            <label htmlFor="shows">
              Shows
              <input type="radio" id='shows' value='shows' onChange={setSearchOption} checked={isChecked}/>
            </label>
            </div>
            <div>
            <label htmlFor="shows">
              Actors
              <input type="radio" id='actors' value='people' onChange={setSearchOption} checked={!isChecked}/>
            </label>
            </div>
          </RadioInputsWrapper>
          <SearchButtonWrapper>
            <button type="submit" onClick={onSearch}>Search</button>            
          </SearchButtonWrapper>
          {searchResult()}
      </Mainpage>
  );
}

export default Home;

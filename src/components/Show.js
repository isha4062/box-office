/* eslint-disable no-underscore-dangle */
import React , { useEffect , useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Cast from './show/Cast';
import Details from './show/Details';
import Seasons from './show/Seasons';
import ShowMainData from './show/ShowMainData';
import { InfoBlock, ShowPageWrapper } from './Show.styled';

const reducer = (prevState , action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':{
            return{loading: false , error: null , show: action.show};            
        }
        case 'FETCH_FAILED':{
            return{...prevState , loading: false , error: action.message};                
        }        
        default: return prevState;
    }
}

const initialState = {
    show : null,
    loading : true,
    error : null
}

function Show() {
    const { id } = useParams();

    const [{loading , error , show}, dispatch] = useReducer(reducer , initialState);;

    useEffect( () => {
        let isMounted = true;
        fetch(`https://api.tvmaze.com/shows/${id}?embed[]=seasons&embed[]=cast`)
        .then(r => r.json())
        .then(results => {
            if(isMounted){
                dispatch({ type: 'FETCH_SUCCESS' , show: results});
            }
        })
        .catch(err => {
            dispatch({type: 'FETCH_FAILED' , error: err.message});
        });
        return () => {
            isMounted = false;
        }
    } , [id]);

    if(loading){
        return <div>Data is loading</div>
    }
    if(error){
        return <div>`Error : ${error}`</div>
    }

    // eslint-disable-next-line no-console
    console.log(show);
  return (
    <ShowPageWrapper>
        <ShowMainData image={show.image} rating={show.rating} name={show.name} summary={show.summary} tags={show.genres}/>
        <InfoBlock>
            <h2>Details</h2>
            <Details status={show.status} premiered={show.premiered} network={show.network} />
        </InfoBlock>
        <InfoBlock>
            <h2>Seasons</h2>
            <Seasons seasons={show._embedded.seasons}/>
        </InfoBlock>
        <InfoBlock>
            <h2>Cast</h2>
            <Cast cast={show._embedded.cast} />
        </InfoBlock>
    </ShowPageWrapper>
  )
}

export default Show

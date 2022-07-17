import React from 'react'
import ShowCard from './ShowCard'
import IMAGE_NOT_FOUND from '../../images/not-found.png';
import { FlexGrid } from "../styled";
import { usePersistedHook } from '../misc/custom-hooks';

function ShowGrid({ result }) {
  const [isStarred , dispatchStarred] = usePersistedHook();
  return (
    <FlexGrid>
      {
        result.map(({ show }) => {

          const starred = isStarred.includes(show.id);
          
          const onClick = () => {
            if(starred){
              dispatchStarred({type: 'REMOVE' , showId: show.id});
            }
            else{
              dispatchStarred({type: 'ADD' , showId: show.id});
            }
          }

          return (
            <ShowCard key={show.id} 
            id={show.id} 
            name={show.name}
            summary={show.summary} 
            image={show.image ? show.image.medium : IMAGE_NOT_FOUND}
            onStarred={onClick}
            isStarred={starred}/>
          )

        })
      }
    </FlexGrid>
  )
}

export default ShowGrid


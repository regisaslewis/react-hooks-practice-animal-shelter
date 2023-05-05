import React from "react";
import Pet from "./Pet";

function PetBrowser({ pets, onAdoptPet }) {

  const petList = pets.map(e => <Pet 
      onAdoptPet={onAdoptPet} 
      key={e.id}
      pet={e} 
    />)

  return <div className="ui cards">{petList}</div>;
}

export default PetBrowser;

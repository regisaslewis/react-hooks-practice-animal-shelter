import React, { useState, useEffect } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState("all");

  useEffect(() => {
    findPetsClick();
  }, []);

  function adoptPet(id) {
    fetch(`http://localhost:3001/pets/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isAdopted: true
      })
    })
      .then(resp => resp.json())
      .then(data => {
        const adoptedList = pets.map(e => { 
          if (e.id === id) {
            return data;
          } else {
            return e;
          }
        })
        setPets(adoptedList);
      })
  }

  function changeType(type) {
    setFilters(type);
  }

  function checkType(type) {
    if (type === "all") {
      return "pets";
    } else {
      return `pets?type=${type}`
    }
  }
  
  function findPetsClick() {
    fetch(`http://localhost:3001/${checkType(filters)}`)
      .then(resp => resp.json())
      .then(data => setPets(data));
  }
  
  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters
              filters={filters}
              onChangeType={changeType}
              onFindPetsClick={findPetsClick}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser onAdoptPet={adoptPet} pets={pets} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";

const PLANTS_URL = "http://localhost:6001/plants";

function NewPlantForm({ onAddPlant }) {
  const [Plantname, setPlantName] = useState("");
  const [Image, setImage] = useState("");
  const [Price, setPrice] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!Plantname || !Image || !(parseFloat(Price) > 0)) {
      alert("Please fill in all fields and ensure the price is greater than 0.");
      return;
    }

    const newPlant = {
      name: Plantname,
      image: Image,
      price: Price
    };

    fetch(PLANTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPlant)
    })
      .then((res) => res.json())
      .then((createdPlant) => {
        onAddPlant(createdPlant);
        setPlantName("");
        setImage("");
        setPrice("");
      });
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" value={Plantname} onChange={(e) => setPlantName(e.target.value)} />
        <input type="text" name="image" placeholder="Image URL" value={Image} onChange={(e) => setImage(e.target.value)} />
        <input type="number" name="price" step="0.01" placeholder="Price" value={Price} onChange={(e) => setPrice(e.target.value)} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;

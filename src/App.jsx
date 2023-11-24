// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import "./App.css";
// const App = () => {
//   const [products, setProducts] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios("https://api.escuelajs.co/api/v1/products");
//       setProducts(response.data);
//     };
//     fetchData();
//   }, []);
//   console.log(products);
//   return (
//     <div className="card2">
//       {products.map((product) => (
//         <div className="card" key={product.id}>
//           {/* <p>{product.userId}</p> */}
//           {/* <h5>{product.title}</h5> */}
//           <p>{product.title}</p>
//           <img src={product.images} alt="png" />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default App;
import "./App.css";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { instance } from "./api";

import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Page2 from "./components/Page2";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await instance(
          `/products/?categoryId=${selectedCategory}`
        );
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance("/categories");
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <Header />

      <div className="c">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option value={category.id} key={uuidv4()}>
              {category.name}
            </option>
          ))}
        </select>

        {loading ? (
          <p>Loading...</p>
        ) : (
          products.map((product) => (
            <div key={uuidv4()}>
              <img width={100} height={100} src={product.images[0]} alt="" />
              <h2>{product.title}</h2>
              <strong>${product.price}</strong>
              <p>{product.category.name}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { instance } from "./api";
import Header from "./components/Header";

export function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  // const [loading, setLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const response = await instance.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
      setLoading(false);
    };

    loadPosts();
  }, []);
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

      <input
        className="ss"
        style={{ width: "30%", height: "25px" }}
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchTitle(e.target.value)}
      />
      {loading ? (
        <h4>Loading ...</h4>
      ) : (
        posts
          .filter((value) => {
            if (searchTitle === "") {
              return value;
            } else if (
              value.title.toLowerCase().includes(searchTitle.toLowerCase())
            ) {
              return value;
            }
          })
          .map((item) => (
            <div key={item.id}>
              <img width={100} height={100} src={item.images[0]} alt="" />
              <h2>{item.title}</h2>
              <strong>${item.price}</strong>
              <p>{item.category.name}</p>
            </div>
          ))
      )}

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

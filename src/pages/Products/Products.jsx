import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import List from "../../components/List/List";
import useFetch from "../../hooks/useFetch";
import "./Products.scss";


const Products = () => {

  
  //parse category name from url
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryName = searchParams.get('category');

  const [maxPrice, setMaxPrice] = useState(1000);
  const [tempPrice, setTempPrice] = useState(0)
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const [catImg, setCatImg] = useState('')

  const { data, loading, error } = useFetch(
    `/products/filter?category=${categoryName}`
  );
  const subcategories = categoryName !=="men" ? ["top","bottom","jacket","dress","bag","formal wear","active wear","shoes"] : ["top","bottom","jacket","bag","formal wear","active wear","shoes"]
  
  const { data: categoryData, loading: categoryLoading, error: categoryError} = useFetch(`/categories`)

  useEffect(() => {
    categoryData?.map((category) => {
      if(category.name == categoryName) {
        setCatImg(category.imgUrl[0])
      }
    })
  }, [categoryData])
  
  
  
    
  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value)
    );
  };
   
  return (
    loading ? "Loading..." :
    (<div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>Product Categories</h2>
          {subcategories.map((subcategory) => (
            <div className="inputItem" key={subcategory}>
              <input
                type="checkbox"
                id={subcategory}
                value={subcategory}
                onChange={handleChange}
              />
              <label htmlFor={subcategory}>{subcategory}</label>
            </div>
          ))}
        </div>
        <div className="filterItem">
          <h2>Filter by price</h2>
          <div className="inputItem">
            <span>0</span>
            <input
              type="range"
              min={0}
              max={1000}  
              onChange={(e) => setTempPrice(e.target.value)}          
            />            
            <span>{tempPrice}</span>            
          </div>
          <button onClick={(e) => setMaxPrice(tempPrice)}>Apply</button>
        </div>
        <div className="filterItem">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={(e) => setSortOrder("asc")}
            />
            <label htmlFor="asc">Price (Lowest first)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={(e) => setSortOrder("desc")}
            />
            <label htmlFor="desc">Price (Highest first)</label>
          </div>
        </div>
      </div>
      <div className="right">
        <img
          className="catImg"
          src={catImg}
          alt=""
        />
        <List fetchAll={false} maxPrice={maxPrice} sortOrder={sortOrder} subCats={selectedSubCats} category={categoryName}/>
      </div>
    </div>)
  );

  
};


export default Products;
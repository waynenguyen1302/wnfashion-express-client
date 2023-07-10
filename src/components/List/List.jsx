import React, { useEffect, useState } from 'react'
import './List.scss'
import Card from '../Card/Card'
import useFetch from '../../hooks/useFetch'

const List = ({subCats, maxPrice, sortOrder, fetchAll, category }) => {
  const url = fetchAll ? `/products` : `/products/filter?category=${category}`
   
  const { data: productsData, loading: productsLoading, error: productsError } = useFetch(url);
  
  const [filteredProducts, setFilteredProducts] = useState([]);

  const filterBySubcategory = (products, subCats) => {
    if (subCats.length === 0) return products;
    return products.filter((product) =>
      subCats.some((subcat) => product.subcategories.includes(subcat))
    );
  };
  
  const filterByPrice = (products, maxPrice) => {
    if (!maxPrice) return products;
    return products.filter((product) => product.price < maxPrice);
  };

  const sortByPrice = (products, sortOrder) => {
    if (!sortOrder) return products;
    const sortedProducts = [...products];
    sortedProducts.sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      if (sortOrder === 'asc') {
        return priceA - priceB;
      } else if (sortOrder === 'desc') {
        return priceB - priceA;
      }
    });
    return sortedProducts;
  };
  
  
  useEffect(() => {
    if (!fetchAll) {
      if (productsData && (subCats.length > 0 || maxPrice)) {
        let filtered = productsData;
        filtered = filterBySubcategory(filtered, subCats);
        filtered = filterByPrice(filtered, maxPrice);
        filtered = sortByPrice(filtered, sortOrder);
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(productsData);
      }
    }
  }, [productsData, subCats, maxPrice, sortOrder]);
  

  const displayProducts = !fetchAll ? filteredProducts : productsData;

  return (
    <div className='list'>        
        {productsLoading ? "loading" :
        displayProducts?.map(item => (
            <Card item = {item} key={item._id} />
        ))}
    </div>
  )
}

export default List
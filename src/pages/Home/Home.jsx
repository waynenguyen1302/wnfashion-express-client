import React from 'react'
import './Home.scss'
import Slider from '../../components/Slider/Slider'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import Categories from '../../components/Categories/Categories'
import Contact from '../../components/Contact/Contact'

const Home = () => {
  return (
    <div className='home'>
      <Slider />
      <FeaturedProducts key="featured" type="featured"/>
      <Categories />
      <FeaturedProducts key="trending" type="trending"/>
      <Contact />
    </div>
  )
}

export default Home
import React from 'react'
import { FaSpinner } from 'react-icons/fa';
import '../Search /SearchResultsList.css'

const LoadingSearch = () => {
  return (
    <div className='results-list'>
      <FaSpinner /> Laoding ...
    </div>
  );
}

export default LoadingSearch

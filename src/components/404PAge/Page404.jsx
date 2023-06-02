import React, { Component } from 'react'
import {Link} from "react-router-dom"
import "./Page404.css"
export class Page404 extends Component {
  render() {
    return (
      <div className='notfound_container'>
        <h1 className='notfound_404'>404</h1>
        <br></br>
        <br></br>
        <p className='notfound_text'> The page you're looking for doesn't exists</p>
        <br></br>
        <br></br>

      <Link to="/">
        <button className='notfound_button'>
          Go Home
        </button>
      </Link>
      </div>
    )
  }
}

export default Page404

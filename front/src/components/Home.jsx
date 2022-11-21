import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return(
    <Fragment>
      Homeページです。
      <Link to="/signin">サインインへ</Link>
    </Fragment>
  )
}

export default Home;

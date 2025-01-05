import React from 'react';
import Header from '../../Layout/Header';
import Slider from './Slider';
import NewIn from './NewIn';
import Stack from 'react-bootstrap/Stack';
import Footer from '../../Layout/Footer';
import Banners from './Banners';
import Features from './Features';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Home.css";

function Home() {
  return (
    <Stack gap={6} className="stack">
      <div className="p-2 header"><Header /></div>
      <div className="p-2 slider"><Slider /></div>
      <div className="p-2 newin"><NewIn /></div>
      <div className="p-2 banners "><Banners /></div>
      <div className="p-2 features"><Features /></div>
      <div className="p-2 footer d-flex align-items-center justify-content-center"><Footer/></div>
    </Stack>
  );
}

export default Home;

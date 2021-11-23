import React, { useEffect, useRef, useState } from 'react';
import BottomNavbar from '../themes/bottom-navbar';
import TopNavbar from '../themes/top-navbar';
import Advertisement from '../components/advertisement';
import Banner from '../components/banner';
import HorizontalList from '../components/horizontal-list';
import ItemCard from '../components/item-card';

const Home = () => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(contentRef.current.firstChild.clientHeight);
  }, []);

  return (
    <>
      <div ref={contentRef}>
        <TopNavbar />
      </div>
      <div style={{ marginTop: `${height}px` }}>
        <Banner />
        <HorizontalList
          height={height}
          children={Array(11).fill(<div className="btn btn-success px-4">Success</div>)}
        />
        <div className="item-column">{Array(6).fill(<ItemCard />)}</div>
        <Advertisement />
        <div className="item-column">{Array(14).fill(<ItemCard />)}</div>
      </div>
      <BottomNavbar />
    </>
  );
};

export default Home;

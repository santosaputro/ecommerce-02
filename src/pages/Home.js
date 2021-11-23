import React, { useEffect, useRef, useState } from 'react';
import BottomNavbar from '../themes/bottom-navbar';
import TopNavbar from '../themes/top-navbar';
// import Advertisement from '../components/advertisement';
// import Banner from '../components/banner';
// import Content from '../components/content';

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
        {/* <Banner />
        <Content height={height} />
        <Advertisement />
        <Content height={height} /> */}
      </div>
      <BottomNavbar />
    </>
  );
};

export default Home;

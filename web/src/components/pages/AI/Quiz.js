import React from 'react';
import HeroSection from '../../HeroSection';
import { homeObjOne, homeObjTwo  } from './Data';

function Quiz() {
  return (
    <>
      <HeroSection {...homeObjOne} />
      <HeroSection {...homeObjTwo} />
    </>
  );
}

export default Quiz;

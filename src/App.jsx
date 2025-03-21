import { useState } from 'react'
import './App.css'
import MainImage from "./components/MainImage.jsx";
import * as MainImageUtils from "./util/MainImageUtils.jsx";
import { selectCharacterPositionPut } from "./util/api.jsx";
import useAllData from "./util/useAllData.jsx";

function App() {
  return (
    <>
      <MainImage 
        useAllData={useAllData} 
        selectCharacterPositionPut={selectCharacterPositionPut} 
        submitScorePut={MainImageUtils.submitScorePut}
      />
    </>
  )
}

export default App;
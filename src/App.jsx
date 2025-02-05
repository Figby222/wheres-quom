import { useState } from 'react'
import './App.css'
import MainImage from "./components/MainImage.jsx";
import MainImageUtils from "./util/MainImageUtils.jsx";
import useAllData from "./util/useAllData.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MainImage useAllData={useAllData} selectCharacterPositionPost={MainImageUtils.selectCharacterPositionPost} submitScorePut={MainImageUtils.submitScorePut} />
    </>
  )
}

export default App

import { useState } from 'react'
import "./styles/app.css"
import Tour from './components/tour'
import ImageSection from './components/imageSection'
import BoxSection from "./components/boxesSection";
import Footer from "./components/footer"
import { activities } from './helpers/activities'

// RESOURCES
// https://visitsedona.com/sedona-secret-7/

function App() {

  const [tour, setTour] = useState(false)
  
  return (
    <div>
      <Tour 
        tour={tour}
        setTour={setTour}
      />
      <ImageSection
        url={'https://images.unsplash.com/photo-1465346546381-42a2479bb08b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'}
      />
      <div className="boxSection">
        { activities && activities.map((item, idx) => 
          <BoxSection 
            key={idx}
            activity={item}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;

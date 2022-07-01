

const BoxSection = ({ activity }) => {
  
  return (
    <div className="boxSection-item">
      <div className="boxSection-item-image">
        <img src={activity.image} alt={activity.item} />
      </div>
      <div className="boxSection-item-description">
        <h1>{activity.item}</h1>
        <button onClick={() => window.open(`${activity.link}`, '_blank')}>Learn more</button>
      </div>
    </div>
  )
}

export default BoxSection


const Nav = ({}) => {
  
  return (
    <>
      <div className="nav">
        <div className="nav-logo">7SS</div>
        <div className="nav-menu">
          <div className="nav-menu">
            <div className="nav-menu-item">Reserve</div>
          </div>
        </div>
      </div>
      <div className="nav-mobile wrapper">
        <div className="nav-mobile-logo">7SS</div>
        <div className="nav-mobile-menu">
          <input 
            type="checkbox" 
            name="nav-toggle" 
            id="nav-toggle" 
            className="nav-mobile-menu-checkbox"
          />
          <label 
            htmlFor="nav-toggle" 
            className="nav-mobile-menu-burger"
            onClick={() => null}
          >
            <span className="nav-mobile-menu-icon"></span>
          </label>
          <div className="nav-mobile-menu-background"></div>
        </div>
      </div>
    </>
  )
}

export default Nav


const ImageSection = ({ url }) => {
  
  return (
    <div className="imageSection clipPath--mtn2--T">
      <div className="imageSection-image">
        <img src={url} alt="mountains" />
      </div>
      <div className="imageSection-description">
        <h1>Some secrets are just too good to keep to yourself.</h1>
        <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu posuere odio. In magna risus, pharetra lobortis augue ac, mattis rhoncus lacus. Maecenas odio urna, ullamcorper ut gravida nec, finibus et enim. Integer eu eleifend odio. Curabitur eget molestie mi. Suspendisse faucibus sapien sit amet lorem mollis congue. Quisque eget cursus metus. Suspendisse potenti. Donec ullamcorper facilisis nulla, id efficitur orci tempor sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu posuere odio. In magna risus, pharetra lobortis augue ac, mattis rhoncus lacus. Maecenas odio urna, ullamcorper ut gravida nec, finibus et enim. Integer eu eleifend odio. Curabitur eget molestie mi. Suspendisse faucibus sapien sit amet lorem mollis congue. Quisque eget cursus metus. Suspendisse potenti. Donec ullamcorper facilisis nulla, id efficitur orci tempor sit amet.</h2>
      </div>
    </div>
  )
}

export default ImageSection

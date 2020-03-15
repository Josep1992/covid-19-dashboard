import * as React from 'react';

export function useLocation() {
  const [location, setLocation] = React.useState(undefined)
  if (process.browser &&  window.navigator.geolocation) {
    const { geolocation } = window.navigator;

   React.useEffect(() => {
    geolocation.getCurrentPosition(function(pos){
      if(pos && "coords" in pos){
        setLocation(pos.coords)
      }
    })
   },[])
  }

  return {
    location
  }
}
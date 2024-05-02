const Coordinates = async (setLatitude: React.Dispatch<React.SetStateAction<number | null>>, setLongitude: React.Dispatch<React.SetStateAction<number | null>>) => {
      const success = (position: GeolocationPosition) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    };

    const error = (err: GeolocationPositionError) => {
      console.error('Error getting geolocation:', err);
    };

    await navigator.geolocation.getCurrentPosition(success, error);
};

export default Coordinates;
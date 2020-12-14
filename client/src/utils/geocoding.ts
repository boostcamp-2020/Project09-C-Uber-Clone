export const reverseGeocoding = (position: {lat: number, lng: number}): Promise<string> => {
  const geocoder = new google.maps.Geocoder;
  return new Promise((resolve, reject) => {
    geocoder.geocode(
      { location: position },
      (
        results: google.maps.GeocoderResult[],
        status: google.maps.GeocoderStatus,
      ) => {
        if (status === 'OK' && results[0]) {
          resolve(results[0].formatted_address);
        }
        reject(new Error('cannot find address'));
      },
    );
  });
};

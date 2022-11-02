export const displayMap = locations => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibmFsanViYWlyIiwiYSI6ImNsOW44dGhucjA1bjMzcnFwbGtmcmZ4MmEifQ.vcwyomqrxGkhcLuXZkdvNA';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
    projection: 'globe' // display the map as a 3D globe
  });
  
    const bounds = new mapboxgl.LngLatBounds();
  
    locations.forEach(loc => {
      // Create marker
      const el = document.createElement('div');
      el.className = 'marker';
  
      // Add marker
      new mapboxgl.Marker({
        element: el,
        anchor: 'bottom'
      })
        .setLngLat(loc.coordinates)
        .addTo(map);
  
      // Add popup
      new mapboxgl.Popup({
        offset: 30
      })
        .setLngLat(loc.coordinates)
        .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
        .addTo(map);
  
      // Extend map bounds to include current location
      bounds.extend(loc.coordinates);
    });
  
    map.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100
      }
    });
  };
  
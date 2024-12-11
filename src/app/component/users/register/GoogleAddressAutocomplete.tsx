import { useEffect, useRef } from 'react';

const GoogleAddressAutocomplete = ({ onAddressChange }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
      autocomplete.setFields(['address_component']);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.address_components) {
          const address = {
            street: getAddressComponent(place, 'route'),
            city: getAddressComponent(place, 'locality'),
            zipCode: getAddressComponent(place, 'postal_code'),
            building: getAddressComponent(place, 'street_number'),
          };
          onAddressChange(address);
        }
      });
    };
  }, [onAddressChange]);

  const getAddressComponent = (place: { address_components: any[]; }, type: string) => {
    const component = place.address_components.find((c) => c.types.includes(type));
    return component ? component.long_name : '';
  };

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="הקלד כתובת"
      className="w-full px-3 py-2 border rounded-md"
    />
  );
};

export default GoogleAddressAutocomplete;

import google from "next-auth/providers/google";
import { useEffect, useRef, useState } from "react";

// מוסיף טיפוס מותאם אישית לחלון
declare global {
  interface Window {
    google: typeof google;
  }
}

const AddressForm = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    zipCode: "",
    building: "",
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current!, {
          types: ["address"], // מגביל לחיפוש כתובות בלבד
          componentRestrictions: { country: "il" }, // הגבלה למדינה ישראל
        });

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (place.address_components) {
            const address = extractAddressComponents(place);
            setFormData(address);
          }
        });
      }
    };

    return () => {
      // מנקה את ה-SDK במידת הצורך
      const scripts = document.querySelectorAll("script[src*='maps.googleapis.com']");
      scripts.forEach((s) => s.parentNode?.removeChild(s));
    };
  }, []);

  const extractAddressComponents = (place: google.maps.places.PlaceResult) => {
    const getComponent = (type: string) =>
      place.address_components?.find((comp) => comp.types.includes(type))?.long_name || "";

    return {
      street: getComponent("route"),
      city: getComponent("locality"),
      zipCode: getComponent("postal_code"),
      building: getComponent("street_number"),
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h5 className="text-lg font-bold mt-4">כתובת משלוח</h5>
      <div className="border p-4 rounded mt-4">
        <label htmlFor="autocomplete" className="block font-medium">
          חפש כתובת
        </label>
        <input
          id="autocomplete"
          ref={inputRef}
          type="text"
          placeholder="הקלד כתובת"
          className="w-full px-3 py-2 border rounded-md mt-2"
        />
      </div>

      <div className="border p-4 rounded mt-4">
        <label htmlFor="street" className="block font-medium">
          רחוב
        </label>
        <input
          id="street"
          name="street"
          value={formData.street}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md mt-2"
          placeholder="רחוב"
        />
      </div>

      <div className="border p-4 rounded mt-4">
        <label htmlFor="building" className="block font-medium">
          מספר בית
        </label>
        <input
          id="building"
          name="building"
          value={formData.building}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md mt-2"
          placeholder="מספר בית"
        />
      </div>

      <div className="border p-4 rounded mt-4">
        <label htmlFor="city" className="block font-medium">
          עיר
        </label>
        <input
          id="city"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md mt-2"
          placeholder="עיר"
        />
      </div>

      <div className="border p-4 rounded mt-4">
        <label htmlFor="zipCode" className="block font-medium">
          מיקוד
        </label>
        <input
          id="zipCode"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md mt-2"
          placeholder="מיקוד"
        />
      </div>
    </div>
  );
};

export default AddressForm;

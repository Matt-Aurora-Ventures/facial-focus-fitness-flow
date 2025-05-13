
/// <reference types="vite/client" />

// Add Google Maps type definitions
interface Window {
  google: any;
  initMap: () => void;
}

declare namespace google {
  namespace maps {
    class Map {
      constructor(element: HTMLElement, options: MapOptions);
      setCenter(latLng: LatLng): void;
      setZoom(zoom: number): void;
      fitBounds(bounds: LatLngBounds): void;
      panTo(latLng: LatLng | LatLngLiteral): void;
    }
    
    class Marker {
      constructor(options: MarkerOptions);
      setMap(map: Map | null): void;
      setPosition(latLng: LatLng): void;
      addListener(event: string, callback: Function): void;
    }
    
    class InfoWindow {
      constructor(options?: InfoWindowOptions);
      open(map: Map, marker?: Marker): void;
      setContent(content: string | Node): void;
      close(): void;
    }
    
    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
    }
    
    interface LatLngLiteral {
      lat: number;
      lng: number;
    }
    
    class LatLngBounds {
      constructor(sw?: LatLng, ne?: LatLng);
      extend(latLng: LatLng): LatLngBounds;
    }
    
    class Geocoder {
      constructor();
      geocode(request: GeocoderRequest, callback: (results: GeocoderResult[], status: GeocoderStatus) => void): void;
    }
    
    interface MapOptions {
      center: LatLng | LatLngLiteral;
      zoom: number;
      mapTypeId?: string;
      styles?: any[];
    }
    
    interface MarkerOptions {
      position: LatLng | LatLngLiteral;
      map?: Map;
      title?: string;
      icon?: string;
      animation?: any;
    }
    
    interface InfoWindowOptions {
      content?: string | Node;
      position?: LatLng | LatLngLiteral;
    }
    
    interface GeocoderRequest {
      address?: string;
      location?: LatLng;
      placeId?: string;
      bounds?: LatLngBounds;
      componentRestrictions?: GeocoderComponentRestrictions;
      region?: string;
    }
    
    interface GeocoderComponentRestrictions {
      country: string | string[];
    }
    
    interface GeocoderResult {
      address_components: GeocoderAddressComponent[];
      formatted_address: string;
      geometry: GeocoderGeometry;
      place_id: string;
      types: string[];
    }
    
    interface GeocoderAddressComponent {
      long_name: string;
      short_name: string;
      types: string[];
    }
    
    interface GeocoderGeometry {
      location: LatLng;
      location_type: string;
      viewport: LatLngBounds;
      bounds?: LatLngBounds;
    }
    
    interface MapMouseEvent {
      latLng: LatLng;
    }
    
    type GeocoderStatus = 'OK' | 'ZERO_RESULTS' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'INVALID_REQUEST' | 'UNKNOWN_ERROR';
  }
}

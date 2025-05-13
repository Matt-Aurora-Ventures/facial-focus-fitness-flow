
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from "lucide-react";

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

interface MapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{
    position: { lat: number; lng: number };
    title?: string;
  }>;
  height?: string;
  onMapClick?: (e: google.maps.MapMouseEvent) => void;
  className?: string;
}

const Map: React.FC<MapProps> = ({
  center = { lat: 34.0522, lng: -118.2437 }, // Default to Los Angeles
  zoom = 13,
  markers = [],
  height = "400px",
  onMapClick,
  className,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [mapMarkers, setMapMarkers] = useState<google.maps.Marker[]>([]);

  // Load Google Maps API
  useEffect(() => {
    if (!window.google) {
      setIsLoading(true);
      
      // Define the callback function
      window.initMap = () => {
        setIsLoading(false);
      };

      // Create and append the script tag
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBnlLOioz3gs8s2L1E_yXG22-GF76UYtLg&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      return () => {
        // Clean up if component unmounts before script loads
        window.initMap = () => {};
        document.head.removeChild(script);
      };
    } else {
      setIsLoading(false);
    }
  }, []);

  // Initialize map when Google Maps API is loaded
  useEffect(() => {
    if (!isLoading && mapRef.current && !mapInstance) {
      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        styles: [
          {
            featureType: 'poi.business',
            stylers: [{ visibility: 'on' }],
          },
          {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'on' }],
          }
        ],
      });
      
      setMapInstance(map);
      
      if (onMapClick) {
        map.addListener('click', onMapClick);
      }
    }
  }, [isLoading, center, zoom, onMapClick]);

  // Handle markers updates
  useEffect(() => {
    if (mapInstance) {
      // Clear existing markers
      mapMarkers.forEach(marker => marker.setMap(null));
      
      // Add new markers
      const newMarkers = markers.map(marker => {
        const newMarker = new window.google.maps.Marker({
          position: marker.position,
          map: mapInstance,
          title: marker.title,
          animation: window.google.maps.Animation.DROP,
        });
        
        return newMarker;
      });
      
      setMapMarkers(newMarkers);
    }
  }, [mapInstance, markers]);

  return (
    <div className={`relative ${className}`} style={{ height }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-accent/20">
          <Loader className="h-8 w-8 animate-spin text-facefit-purple" />
        </div>
      )}
      <div ref={mapRef} className="w-full h-full rounded-lg" />
    </div>
  );
};

export default Map;

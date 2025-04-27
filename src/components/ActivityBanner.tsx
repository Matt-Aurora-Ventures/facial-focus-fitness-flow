
import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const ActivityBanner: React.FC = () => {
  const activities = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?auto=format&fit=crop&w=1200&h=400&q=80",
      caption: "Outdoor Activities"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?auto=format&fit=crop&w=1200&h=400&q=80",
      caption: "Nature Exploration"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&h=400&q=80",
      caption: "Wildlife Adventures"
    }
  ];

  return (
    <div className="w-full mb-6">
      <Carousel className="w-full" autoplay={true} loop={true}>
        <CarouselContent>
          {activities.map((activity) => (
            <CarouselItem key={activity.id}>
              <div className="relative h-56 w-full overflow-hidden rounded-lg">
                <img 
                  src={activity.image} 
                  alt={activity.caption}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <h2 className="text-white text-2xl font-bold">{activity.caption}</h2>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ActivityBanner;

import React from "react";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Map } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";

export default function EventHeader({ event }) {
  return (
    <Card className="border-none shadow-xl overflow-hidden">
      <div className="h-48 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 relative">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-4xl font-bold mb-2">{event.name}</h1>
          {event.description && (
            <p className="text-white/90 text-lg">{event.description}</p>
          )}
        </div>
      </div>
      
      <div className="p-6 bg-white">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-xl">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Data</p>
              <p className="font-semibold text-gray-900">
                {format(new Date(event.date), "dd/MM/yyyy", { locale: ptBR })}
              </p>
            </div>
          </div>

          {event.time && (
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Horário</p>
                <p className="font-semibold text-gray-900">{event.time}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-xl">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Local</p>
              <p className="font-semibold text-gray-900">{event.location}</p>
            </div>
          </div>

          {event.mapsLink && (
            <a href={event.mapsLink} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full">
                <Map className="w-4 h-4 mr-2" />
                Ver no mapa
              </Button>
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}

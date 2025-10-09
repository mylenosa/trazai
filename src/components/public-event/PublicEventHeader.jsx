
import React from "react";
import { Calendar, MapPin, Clock, Map } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";

export default function PublicEventHeader({ event }) {
  return (
    <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.name}</h1>
        {event.description && (
          <p className="text-xl text-white/90 mb-8">{event.description}</p>
        )}
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <Calendar className="w-6 h-6" />
            <div>
              <p className="text-sm text-white/80">Data</p>
              <p className="font-semibold">
                {format(new Date(event.date), "dd/MM/yyyy", { locale: ptBR })}
              </p>
            </div>
          </div>

          {event.time && (
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Clock className="w-6 h-6" />
              <div>
                <p className="text-sm text-white/80">Horário</p>
                <p className="font-semibold">{event.time}</p>
              </div>
            </div>
          )}

          <div className="flex-grow flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <MapPin className="w-6 h-6" />
            <div>
              <p className="text-sm text-white/80">Local</p>
              <p className="font-semibold">{event.location}</p>
            </div>
          </div>

          {event.mapsLink && (
             <a href={event.mapsLink} target="_blank" rel="noopener noreferrer" className="md:col-span-2">
                <div className="flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm rounded-xl p-4 w-full h-full">
                  <Map className="w-6 h-6"/>
                  <span className="font-semibold">Ver no mapa</span>
                </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

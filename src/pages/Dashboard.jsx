
import React, { useState, useEffect } from "react";
import { Event } from "@/entities/Event";
import { Participant } from "@/entities/Participant";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Plus, Calendar, MapPin, Users, Share2, ExternalLink, Lock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

import EventCard from "@/components/events/EventCard";
import EmptyState from "@/components/events/EmptyState";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [participantCounts, setParticipantCounts] = useState({});

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setIsLoading(true);
    const fetchedEvents = await Event.list("-created_date");
    setEvents(fetchedEvents);
    
    // Carregar contagens de participantes
    const counts = {};
    for (const event of fetchedEvents) {
      const participants = await Participant.filter({ event_id: event.id });
      const confirmed = participants.filter(p => p.status === "confirmed").length;
      const total = participants.reduce((sum, p) => sum + 1 + (p.companions || 0), 0);
      counts[event.id] = { confirmed, total };
    }
    setParticipantCounts(counts);
    setIsLoading(false);
  };

  const activeEvents = events.filter(e => e.status === "active");
  const pastEvents = events.filter(e => e.status !== "active");
  
  const FREE_PLAN_LIMIT = 2;
  const hasReachedLimit = activeEvents.length >= FREE_PLAN_LIMIT;

  return (
    <div className="min-h-screen p-3 sm:p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 sm:gap-6 mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 lg:mb-2">
                Seus Eventos
              </h1>
              <p className="text-sm lg:text-base text-gray-600">
                {activeEvents.length} {activeEvents.length === 1 ? 'evento ativo' : 'eventos ativos'} no plano gratuito.
              </p>
            </div>
            <Link 
              to={createPageUrl("CreateEvent")} 
              className="w-full sm:w-auto sm:min-w-[200px]" 
              style={{ pointerEvents: hasReachedLimit ? 'none' : 'auto' }}
              onClick={(e) => hasReachedLimit && e.preventDefault()}
            >
              <Button 
                size="lg"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg" 
                disabled={hasReachedLimit}
              >
                {hasReachedLimit && <Lock className="w-4 h-4 mr-2" />}
                <Plus className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                <span className="text-sm lg:text-base">Criar Novo Evento</span>
              </Button>
            </Link>
          </div>
        </div>

        {hasReachedLimit && (
          <Alert className="mb-6 lg:mb-8 border-orange-500 text-orange-700 bg-orange-50 p-4">
            <Lock className="h-4 w-4" />
            <AlertTitle className="font-bold text-sm lg:text-base">Limite de eventos atingido!</AlertTitle>
            <AlertDescription className="text-sm lg:text-base leading-relaxed">
              Você alcançou o limite de {FREE_PLAN_LIMIT} eventos ativos do plano gratuito. Para criar eventos ilimitados, <Link to={createPageUrl("Upgrade")} className="font-semibold underline">faça o upgrade para o Premium.</Link>
            </AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-56 lg:h-64 bg-white rounded-xl lg:rounded-2xl animate-pulse border" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {activeEvents.length > 0 && (
              <div className="mb-8 lg:mb-12">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">Eventos Ativos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {activeEvents.map((event, index) => (
                    <EventCard 
                      key={event.id} 
                      event={event} 
                      participantCount={participantCounts[event.id]}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}

            {pastEvents.length > 0 && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">Eventos Anteriores</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {pastEvents.map((event, index) => (
                    <EventCard 
                      key={event.id} 
                      event={event} 
                      participantCount={participantCounts[event.id]}
                      index={index}
                      isPast
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}


import React, { useState, useEffect } from "react";
import { Event } from "@/entities/Event";
import { Participant } from "@/entities/Participant";
import { Calendar, MapPin, Clock, Users, CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import PublicEventHeader from "@/components/public-event/PublicEventHeader";
import ConfirmPresence from "@/components/public-event/ConfirmPresence";
import SelectContributions from "@/components/public-event/SelectContributions";
import EventSummary from "@/components/public-event/EventSummary";

export default function PublicEvent() {
  const urlParams = new URLSearchParams(window.location.search);
  const eventLink = urlParams.get("link");

  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState("presence");
  const [participantData, setParticipantData] = useState({
    name: "",
    phone: "",
    status: "",
    companions: 0,
    contributions: []
  });

  const loadEventData = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const events = await Event.list();
      const foundEvent = events.find(e => e.unique_link === eventLink);
      
      if (foundEvent) {
        setEvent(foundEvent);
        const participantsData = await Participant.filter({ event_id: foundEvent.id });
        setParticipants(participantsData);
      }
    } catch (error) {
      console.error("Erro ao carregar evento:", error);
    }
    setIsLoading(false);
  }, [eventLink]); // Added eventLink to useCallback dependencies

  useEffect(() => {
    if (eventLink) {
      loadEventData();
    }
  }, [eventLink, loadEventData]); // Added loadEventData to useEffect dependencies

  const handlePresenceConfirm = (data) => {
    setParticipantData(prev => ({ ...prev, ...data }));
    if (data.status === "confirmed") {
      setCurrentStep("contributions");
    } else {
      handleFinalSubmit({ ...participantData, ...data });
    }
  };

  const handleContributionsSelect = (contributions) => {
    setParticipantData(prev => ({ ...prev, contributions }));
    handleFinalSubmit({ ...participantData, contributions });
  };

  const handleFinalSubmit = async (finalData) => {
    try {
      await Participant.create({
        event_id: event.id,
        ...finalData
      });
      setCurrentStep("success");
      loadEventData();
    } catch (error) {
      console.error("Erro ao salvar participante:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-green-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Evento não encontrado</h1>
          <p className="text-gray-600">Verifique se o link está correto</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PublicEventHeader event={event} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {currentStep === "presence" && (
          <ConfirmPresence
            event={event}
            onConfirm={handlePresenceConfirm}
          />
        )}

        {currentStep === "contributions" && (
          <SelectContributions
            event={event}
            participants={participants}
            onSubmit={handleContributionsSelect}
            onBack={() => setCurrentStep("presence")}
          />
        )}

        {currentStep === "success" && (
          <EventSummary
            event={event}
            participants={participants}
          />
        )}
      </div>
    </div>
  );
}

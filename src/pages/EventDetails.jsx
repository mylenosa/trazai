
import React, { useState, useEffect } from "react";
import { Event } from "@/entities/Event";
import { Participant } from "@/entities/Participant";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, Users, CheckCircle2, Clock, XCircle, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import EventHeader from "@/components/event-details/EventHeader";
import StatsOverview from "@/components/event-details/StatsOverview";
import NeedsProgress from "@/components/event-details/NeedsProgress";
import ParticipantsList from "@/components/event-details/ParticipantsList";
import ShareDialog from "@/components/event-details/ShareDialog";

export default function EventDetails() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get("id");

  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showShareDialog, setShowShareDialog] = useState(false);

  const loadEventData = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const [eventData, participantsData] = await Promise.all([
        Event.list(),
        Participant.filter({ event_id: eventId })
      ]);
      
      const foundEvent = eventData.find(e => e.id === eventId);
      setEvent(foundEvent);
      setParticipants(participantsData);
    } catch (error) {
      console.error("Erro ao carregar evento:", error);
    }
    setIsLoading(false);
  }, [eventId]);

  useEffect(() => {
    if (eventId) {
      loadEventData();
    }
  }, [eventId, loadEventData]);

  const calculateStats = () => {
    const confirmed = participants.filter(p => p.status === "confirmed").length;
    const maybe = participants.filter(p => p.status === "maybe").length;
    const declined = participants.filter(p => p.status === "declined").length;
    const totalPeople = participants.reduce((sum, p) => 
      p.status === "confirmed" ? sum + 1 + (p.companions || 0) : sum, 0
    );

    return { confirmed, maybe, declined, totalPeople };
  };

  const calculateNeedsProgress = () => {
    if (!event?.needs) return [];

    return event.needs.map(need => {
      let covered = 0;
      participants.forEach(participant => {
        participant.contributions?.forEach(contrib => {
          if (contrib.need_id === need.id) {
            if (need.type === "item") {
              covered += contrib.quantity || 0;
            } else {
              covered += contrib.amount || 0;
            }
          }
        });
      });

      const total = need.type === "item" ? need.quantity : need.amount;
      const percentage = total > 0 ? (covered / total) * 100 : 0;

      return {
        ...need,
        covered,
        percentage: Math.min(percentage, 100)
      };
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Evento não encontrado</p>
          <Button onClick={() => navigate(createPageUrl("Dashboard"))}>
            Voltar para Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const stats = calculateStats();
  const needsProgress = calculateNeedsProgress();
  const publicUrl = `${window.location.origin}${createPageUrl(`PublicEvent?link=${event.unique_link}`)}`;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(createPageUrl("Dashboard"))}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => window.open(publicUrl, '_blank')}
              className="gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Ver Página Pública
            </Button>
            <Button
              onClick={() => setShowShareDialog(true)}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 gap-2"
            >
              <Share2 className="w-4 h-4" />
              Compartilhar
            </Button>
          </div>
        </div>

        <EventHeader event={event} />
        
        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <StatsOverview stats={stats} />
            <NeedsProgress needs={needsProgress} />
          </div>
          
          <div>
            <ParticipantsList participants={participants} onRefresh={loadEventData} />
          </div>
        </div>

        <ShareDialog
          open={showShareDialog}
          onClose={() => setShowShareDialog(false)}
          eventName={event.name}
          shareUrl={publicUrl}
        />
      </div>
    </div>
  );
}

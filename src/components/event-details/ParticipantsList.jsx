import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle2, HelpCircle, XCircle, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ParticipantsList({ participants, onRefresh }) {
  const statusConfig = {
    confirmed: { icon: CheckCircle2, color: "bg-green-100 text-green-800", label: "Confirmado" },
    maybe: { icon: HelpCircle, color: "bg-yellow-100 text-yellow-800", label: "Talvez" },
    declined: { icon: XCircle, color: "bg-red-100 text-red-800", label: "Não vai" }
  };

  return (
    <Card className="border-none shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Participantes ({participants.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
        {participants.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            Nenhum participante ainda
          </p>
        ) : (
          participants.map((participant) => {
            const config = statusConfig[participant.status];
            const StatusIcon = config.icon;
            
            return (
              <div key={participant.id} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                      {participant.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{participant.name}</p>
                      {participant.companions > 0 && (
                        <p className="text-xs text-gray-500">
                          + {participant.companions} {participant.companions === 1 ? 'acompanhante' : 'acompanhantes'}
                        </p>
                      )}
                    </div>
                  </div>
                  <Badge className={config.color}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {config.label}
                  </Badge>
                </div>
                
                {participant.contributions && participant.contributions.length > 0 && (
                  <div className="mt-3 pl-12 space-y-1">
                    <p className="text-xs font-medium text-gray-600 mb-1">Contribuições:</p>
                    {participant.contributions.map((contrib, idx) => (
                      <p key={idx} className="text-xs text-gray-700">
                        • {contrib.quantity || contrib.amount} {contrib.for_person && `para ${contrib.for_person}`}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
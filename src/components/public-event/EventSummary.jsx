import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Users, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EventSummary({ event, participants }) {
  const confirmed = participants.filter(p => p.status === "confirmed");
  const totalPeople = confirmed.reduce((sum, p) => sum + 1 + (p.companions || 0), 0);

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-2xl text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-3xl">Presença Confirmada!</CardTitle>
          <p className="text-white/90 mt-2">Obrigado por confirmar. Nos vemos lá!</p>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="text-center p-6 bg-orange-50 rounded-2xl">
              <Users className="w-10 h-10 mx-auto mb-3 text-orange-600" />
              <p className="text-sm text-gray-600 mb-1">Total Confirmados</p>
              <p className="text-4xl font-bold text-orange-600">{totalPeople}</p>
              <p className="text-xs text-gray-500 mt-1">pessoas</p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-2xl">
              <Package className="w-10 h-10 mx-auto mb-3 text-green-600" />
              <p className="text-sm text-gray-600 mb-1">Contribuições</p>
              <p className="text-4xl font-bold text-green-600">
                {participants.reduce((sum, p) => sum + (p.contributions?.length || 0), 0)}
              </p>
              <p className="text-xs text-gray-500 mt-1">itens</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl">
            <h3 className="font-semibold text-lg mb-4 text-center">Detalhes do Evento</h3>
            <div className="space-y-2 text-center text-gray-700">
              <p><span className="font-medium">Local:</span> {event.location}</p>
              <p><span className="font-medium">Data:</span> {new Date(event.date).toLocaleDateString('pt-BR')}</p>
              {event.time && <p><span className="font-medium">Horário:</span> {event.time}</p>}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-4">
              💬 Continue acompanhando no grupo do WhatsApp
            </p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
            >
              Voltar ao Início
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
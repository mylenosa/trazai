import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="text-center py-20">
      <div className="inline-block p-6 bg-gradient-to-br from-orange-100 to-orange-50 rounded-3xl mb-6">
        <Calendar className="w-20 h-20 text-orange-500" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-3">Nenhum evento ainda</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Crie seu primeiro evento e comece a organizar encontros incríveis com seus amigos e família!
      </p>
      <Link to={createPageUrl("CreateEvent")}>
        <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg">
          <Plus className="w-5 h-5 mr-2" />
          Criar Meu Primeiro Evento
        </Button>
      </Link>
    </div>
  );
}
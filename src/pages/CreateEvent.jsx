
import React, { useState } from "react";
import { Event } from "@/entities/Event";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, Clock, ArrowLeft, Plus, Trash2, Map } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CreateEvent() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    location: "",
    mapsLink: "", // Added mapsLink to state
    date: "",
    time: "",
    needs: []
  });

  const addNeed = (type) => {
    const newNeed = {
      id: Date.now().toString(),
      type,
      name: "",
      quantity: type === "item" ? 1 : 0,
      unit: type === "item" ? "unidade" : "",
      amount: type === "money" ? 0 : undefined,
      covered: 0
    };
    setEventData(prev => ({
      ...prev,
      needs: [...prev.needs, newNeed]
    }));
  };

  const updateNeed = (id, field, value) => {
    setEventData(prev => ({
      ...prev,
      needs: prev.needs.map(need => 
        need.id === id ? { ...need, [field]: value } : need
      )
    }));
  };

  const removeNeed = (id) => {
    setEventData(prev => ({
      ...prev,
      needs: prev.needs.filter(need => need.id !== id)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const uniqueLink = `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const newEvent = await Event.create({
        ...eventData,
        unique_link: uniqueLink,
        status: "active"
      });

      navigate(createPageUrl(`EventDetails?id=${newEvent.id}`));
    } catch (error) {
      console.error("Erro ao criar evento:", error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen p-3 sm:p-4 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 sm:gap-4 mb-6 lg:mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(createPageUrl("Dashboard"))}
            className="flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline ml-2">Voltar</span>
          </Button>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900">Criar Evento</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">Preencha os detalhes do seu evento</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
          <Card className="border shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl lg:text-2xl">Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <Label htmlFor="name" className="text-base font-medium">Nome do Evento *</Label>
                <Input
                  id="name"
                  value={eventData.name}
                  onChange={(e) => setEventData({...eventData, name: e.target.value})}
                  placeholder="Ex: Churrasco de Sábado"
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-base font-medium">Descrição</Label>
                <Textarea
                  id="description"
                  value={eventData.description}
                  onChange={(e) => setEventData({...eventData, description: e.target.value})}
                  placeholder="Conte mais sobre o evento..."
                  className="mt-2 h-24"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-base font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Data *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={eventData.date}
                    onChange={(e) => setEventData({...eventData, date: e.target.value})}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="text-base font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Horário
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={eventData.time}
                    onChange={(e) => setEventData({...eventData, time: e.target.value})}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location" className="text-base font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Local *
                </Label>
                <Input
                  id="location"
                  value={eventData.location}
                  onChange={(e) => setEventData({...eventData, location: e.target.value})}
                  placeholder="Ex: Casa do João, Rua das Flores 123"
                  required
                  className="mt-2"
                />
              </div>

              {/* New input field for Maps Link */}
              <div>
                <Label htmlFor="mapsLink" className="text-base font-medium flex items-center gap-2">
                  <Map className="w-4 h-4" />
                  Link do Google Maps (Opcional)
                </Label>
                <Input
                  id="mapsLink"
                  value={eventData.mapsLink}
                  onChange={(e) => setEventData({...eventData, mapsLink: e.target.value})}
                  placeholder="Cole aqui o link do local no mapa"
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl">
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-xl">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">O que precisamos?</CardTitle>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => addNeed("item")}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Item
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => addNeed("money")}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Valor
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {eventData.needs.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="mb-4">Nenhuma necessidade adicionada ainda</p>
                  <p className="text-sm">Clique em "Item" ou "Valor" acima para começar</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {eventData.needs.map((need) => (
                    <div key={need.id} className="p-4 border-2 border-gray-200 rounded-xl">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-medium text-white bg-gradient-to-r from-green-500 to-green-600 px-3 py-1 rounded-full">
                          {need.type === "item" ? "Item" : "Valor"}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeNeed(need.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>

                      <div className="grid md:grid-cols-3 gap-3">
                        <div className="md:col-span-2">
                          <Input
                            value={need.name}
                            onChange={(e) => updateNeed(need.id, "name", e.target.value)}
                            placeholder={need.type === "item" ? "Ex: Picanha" : "Ex: Gás, Carvão"}
                            required
                          />
                        </div>
                        {need.type === "item" ? (
                          <>
                            <Input
                              type="number"
                              value={need.quantity}
                              onChange={(e) => updateNeed(need.id, "quantity", parseFloat(e.target.value))}
                              placeholder="Qtd"
                              min="0"
                              step="0.1"
                              required
                            />
                            <Input
                              value={need.unit}
                              onChange={(e) => updateNeed(need.id, "unit", e.target.value)}
                              placeholder="Unidade (kg, litros, unidades)"
                              className="md:col-span-3"
                            />
                          </>
                        ) : (
                          <Input
                            type="number"
                            value={need.amount}
                            onChange={(e) => updateNeed(need.id, "amount", parseFloat(e.target.value))}
                            placeholder="R$ 0,00"
                            min="0"
                            step="0.01"
                            required
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(createPageUrl("Dashboard"))}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
            >
              {isSubmitting ? "Criando..." : "Criar Evento"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, DollarSign, Plus, Trash2, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SelectContributions({ event, participants, onSubmit, onBack }) {
  const [selectedContributions, setSelectedContributions] = useState([]);

  const calculateCovered = (needId) => {
    let covered = 0;
    participants.forEach(participant => {
      participant.contributions?.forEach(contrib => {
        if (contrib.need_id === needId) {
          covered += contrib.quantity || contrib.amount || 0;
        }
      });
    });
    return covered;
  };

  const addContribution = (need) => {
    setSelectedContributions([...selectedContributions, {
      need_id: need.id,
      need_name: need.name,
      need_type: need.type,
      quantity: need.type === "item" ? 1 : 0,
      amount: need.type === "money" ? 0 : undefined,
      for_person: ""
    }]);
  };

  const updateContribution = (index, field, value) => {
    const updated = [...selectedContributions];
    updated[index] = { ...updated[index], [field]: value };
    setSelectedContributions(updated);
  };

  const removeContribution = (index) => {
    setSelectedContributions(selectedContributions.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onSubmit(selectedContributions);
  };

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-2xl">
          <CardTitle className="text-xl md:text-2xl">O que você vai levar?</CardTitle>
          <p className="text-white/90 mt-2">Escolha como quer contribuir para o evento</p>
        </CardHeader>
        <CardContent className="p-6">
          {!event.needs || event.needs.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              O organizador ainda não definiu necessidades para este evento
            </p>
          ) : (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-3">Necessidades disponíveis:</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {event.needs.map((need) => {
                  const covered = calculateCovered(need.id);
                  const total = need.type === "item" ? need.quantity : need.amount;
                  const remaining = total - covered;
                  const percentage = (covered / total) * 100;

                  return (
                    <button
                      key={need.id}
                      onClick={() => addContribution(need)}
                      disabled={remaining <= 0}
                      className="p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {need.type === "item" ? (
                            <Package className="w-5 h-5 text-green-600" />
                          ) : (
                            <DollarSign className="w-5 h-5 text-green-600" />
                          )}
                          <span className="font-semibold">{need.name}</span>
                        </div>
                        {percentage >= 100 && (
                          <Badge className="bg-green-100 text-green-800">Completo</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {need.type === "item" 
                          ? `${covered} / ${need.quantity} ${need.unit}`
                          : `R$ ${covered.toFixed(2)} / R$ ${need.amount.toFixed(2)}`
                        }
                      </p>
                      {remaining > 0 && (
                        <p className="text-xs text-green-600 mt-1">
                          Faltam {need.type === "item" ? `${remaining} ${need.unit}` : `R$ ${remaining.toFixed(2)}`}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedContributions.length > 0 && (
        <Card className="border-none shadow-2xl">
          <CardHeader>
            <CardTitle>Suas Contribuições</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedContributions.map((contrib, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex justify-between items-start mb-3">
                  <p className="font-semibold text-gray-900">{contrib.need_name}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeContribution(index)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">
                      {contrib.need_type === "item" ? "Quantidade" : "Valor (R$)"}
                    </label>
                    <Input
                      type="number"
                      min="0"
                      step={contrib.need_type === "item" ? "0.1" : "0.01"}
                      value={contrib.need_type === "item" ? contrib.quantity : contrib.amount}
                      onChange={(e) => updateContribution(
                        index, 
                        contrib.need_type === "item" ? "quantity" : "amount",
                        parseFloat(e.target.value) || 0
                      )}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">
                      Para quem? (opcional)
                    </label>
                    <Input
                      value={contrib.for_person}
                      onChange={(e) => updateContribution(index, "for_person", e.target.value)}
                      placeholder="Ex: Maria, João..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <Button
          onClick={handleSubmit}
          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
        >
          Confirmar Presença
        </Button>
      </div>
    </div>
  );
}
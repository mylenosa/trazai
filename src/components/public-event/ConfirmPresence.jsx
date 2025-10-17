
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, HelpCircle, Users, Plus, Trash2 } from "lucide-react";

export default function ConfirmPresence({ event, onConfirm }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    status: "",
    companions: 0,
    companion_names: []
  });

  const statusOptions = [
    { value: "confirmed", label: "Vou!", icon: CheckCircle2, color: "from-green-500 to-green-600" },
    { value: "maybe", label: "Talvez", icon: HelpCircle, color: "from-yellow-500 to-yellow-600" },
    { value: "declined", label: "Não vou", icon: XCircle, color: "from-red-500 to-red-600" }
  ];

  const handleCompanionNameChange = (index, value) => {
    const newNames = [...formData.companion_names];
    newNames[index] = value;
    setFormData({ ...formData, companion_names: newNames });
  };
  
  const addCompanionField = () => {
    setFormData(prev => ({
        ...prev,
        companions: prev.companions + 1,
        companion_names: [...prev.companion_names, ""]
    }));
  };

  const removeCompanionField = (index) => {
      setFormData(prev => ({
          ...prev,
          companions: prev.companions - 1,
          companion_names: prev.companion_names.filter((_, i) => i !== index)
      }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(formData);
  };

  return (
    <Card className="border-none shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-2xl">
        <CardTitle className="text-xl md:text-2xl">Confirme sua Presença</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-base font-medium">Seu Nome *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Digite seu nome"
              required
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-base font-medium">Telefone (Opcional)</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="(00) 00000-0000"
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-base font-medium mb-3 block">Você vai ao evento? *</Label>
            <div className="grid md:grid-cols-3 gap-3">
              {statusOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({...formData, status: option.value})}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.status === option.value
                        ? `bg-gradient-to-br ${option.color} text-white border-transparent scale-105`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${
                      formData.status === option.value ? 'text-white' : 'text-gray-400'
                    }`} />
                    <p className={`font-semibold ${
                      formData.status === option.value ? 'text-white' : 'text-gray-700'
                    }`}>
                      {option.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {formData.status === "confirmed" && (
            <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
              <Label className="text-base font-medium flex items-center gap-2">
                <Users className="w-5 h-5" />
                Acompanhantes
              </Label>
              <p className="text-sm text-gray-500 -mt-2">
                Além de você, quem mais vai? Adicione os nomes (opcional).
              </p>

              {formData.companion_names.map((name, index) => (
                  <div key={index} className="flex items-center gap-2">
                      <Input
                          value={name}
                          onChange={(e) => handleCompanionNameChange(index, e.target.value)}
                          placeholder={`Nome do acompanhante ${index + 1}`}
                      />
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeCompanionField(index)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                  </div>
              ))}

              <Button type="button" variant="outline" onClick={addCompanionField} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Acompanhante
              </Button>
            </div>
          )}

          <Button
            type="submit"
            disabled={!formData.name || !formData.status}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-lg py-6"
          >
            {formData.status === "confirmed" ? "Confirmar e Escolher Contribuição" : "Confirmar"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

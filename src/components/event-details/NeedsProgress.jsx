import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Package, DollarSign, CheckCircle2 } from "lucide-react";

export default function NeedsProgress({ needs }) {
  if (!needs || needs.length === 0) {
    return (
      <Card className="border-none shadow-xl">
        <CardContent className="p-12 text-center text-gray-500">
          <Package className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>Nenhuma necessidade definida para este evento</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Package className="w-6 h-6 text-green-500" />
          Necessidades do Evento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {needs.map((need) => (
          <div key={need.id} className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {need.type === "item" ? (
                  <Package className="w-5 h-5 text-green-600" />
                ) : (
                  <DollarSign className="w-5 h-5 text-green-600" />
                )}
                <div>
                  <h4 className="font-semibold text-gray-900">{need.name}</h4>
                  <p className="text-sm text-gray-600">
                    {need.type === "item" 
                      ? `${need.covered} / ${need.quantity} ${need.unit}`
                      : `R$ ${need.covered.toFixed(2)} / R$ ${need.amount.toFixed(2)}`
                    }
                  </p>
                </div>
              </div>
              {need.percentage >= 100 && (
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              )}
            </div>
            <Progress value={need.percentage} className="h-3" />
            <p className="text-xs text-gray-500 mt-2 text-right">
              {need.percentage.toFixed(0)}% completo
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
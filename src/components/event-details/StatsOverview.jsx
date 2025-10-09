import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle2, HelpCircle, XCircle, User } from "lucide-react";

export default function StatsOverview({ stats }) {
  return (
    <Card className="border-none shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Users className="w-6 h-6 text-orange-500" />
          Resumo de Participantes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">Confirmados</span>
            </div>
            <p className="text-3xl font-bold text-green-600">{stats.confirmed}</p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="w-5 h-5 text-yellow-600" />
              <span className="text-sm text-gray-600">Talvez</span>
            </div>
            <p className="text-3xl font-bold text-yellow-600">{stats.maybe}</p>
          </div>

          <div className="bg-red-50 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <span className="text-sm text-gray-600">Não vão</span>
            </div>
            <p className="text-3xl font-bold text-red-600">{stats.declined}</p>
          </div>

          <div className="bg-orange-50 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-5 h-5 text-orange-600" />
              <span className="text-sm text-gray-600">Total Pessoas</span>
            </div>
            <p className="text-3xl font-bold text-orange-600">{stats.totalPeople}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
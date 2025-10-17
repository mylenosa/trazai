
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Users, ArrowRight, Clock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";

export default function EventCard({ event, participantCount, index, isPast }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={createPageUrl(`EventDetails?id=${event.id}`)}>
        <Card className={`group hover:shadow-2xl transition-all duration-300 border-none ${
          isPast ? 'opacity-60' : ''
        }`}>
          <div className="h-40 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-t-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-1">{event.name}</h3>
              <p className="text-white/90 text-sm">{event.description || "Sem descrição"}</p>
            </div>
          </div>
          
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <Calendar className="w-5 h-5 text-orange-500" />
              <span className="font-medium">
                {format(new Date(event.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </span>
            </div>

            {event.time && (
              <div className="flex items-center gap-3 text-gray-700">
                <Clock className="w-5 h-5 text-orange-500" />
                <span>{event.time}</span>
              </div>
            )}

            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="w-5 h-5 text-green-500" />
              <span className="truncate">{event.location}</span>
            </div>

            {participantCount && (
              <div className="flex items-center gap-3 text-gray-700">
                <Users className="w-5 h-5 text-green-500" />
                <span className="font-medium">
                  {participantCount.confirmed} confirmados · {participantCount.total} pessoas
                </span>
              </div>
            )}

            <div className="pt-4 flex items-center justify-between border-t border-gray-100">
              <span className="text-sm text-gray-500">Ver detalhes</span>
              <ArrowRight className="w-5 h-5 text-orange-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

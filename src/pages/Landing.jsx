import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Zap, Check, Calendar, Users, Share2, TrendingUp, Lock, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Landing() {
  const features = [
    {
      icon: Calendar,
      title: 'Criação Rápida',
      description: 'Monte seu evento em menos de 2 minutos com interface intuitiva'
    },
    {
      icon: Users,
      title: 'Gestão Simples',
      description: 'Acompanhe confirmações e contribuições em tempo real'
    },
    {
      icon: Share2,
      title: 'Compartilhamento Fácil',
      description: 'Link direto para seus convidados confirmarem presença'
    }
  ];

  const freePlanFeatures = [
    'Até 2 eventos ativos por mês',
    'Confirmação de presença ilimitada',
    'Lista de contribuições',
    'Link compartilhável'
  ];

  const premiumPlanFeatures = [
    'Eventos ilimitados',
    'Histórico completo',
    'Grupos salvos',
    'Exportação de dados',
    'PIX integrado (em breve)',
    'Suporte prioritário'
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Zap className="w-6 h-6 lg:w-8 lg:h-8 text-orange-500" />
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">TrazAí</h1>
          </Link>
          <div className="flex gap-2 sm:gap-3">
            <Link to={createPageUrl('Dashboard')}>
              <Button variant="outline" size="sm" className="min-h-[44px]">
                <span className="hidden sm:inline">Meus eventos</span>
                <span className="sm:hidden">Entrar</span>
              </Button>
            </Link>
            <Link to={createPageUrl('CreateEvent')}>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 min-h-[44px]">
                Comece grátis
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-green-50 py-12 sm:py-16 lg:py-24 xl:py-32 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-4 lg:mb-6 tracking-tight leading-tight">
                Organize seu rolê<br />
                <span className="text-orange-500">sem complicação</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl lg:max-w-3xl mx-auto mb-8 lg:mb-10 leading-relaxed">
                Chega de planilhas e grupos de WhatsApp bagunçados. Com o TrazAí você organiza churrascos, festas e encontros de forma fácil e colaborativa.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <Link to={createPageUrl('CreateEvent')} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-base lg:text-lg shadow-lg min-w-[200px] min-h-[52px]">
                    Crie seu evento grátis
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <a href="#planos" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-base lg:text-lg min-w-[200px] min-h-[52px]">
                    Ver planos
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
                Tudo que você precisa
              </h2>
              <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
                Ferramentas simples e poderosas para tornar seus eventos inesquecíveis
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-2 border-gray-100 hover:border-orange-200 transition-all duration-300 h-full hover:shadow-lg">
                    <CardContent className="p-6 lg:p-8">
                      <div className="w-12 h-12 lg:w-14 lg:h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-4 lg:mb-5">
                        <feature.icon className="w-6 h-6 lg:w-7 lg:h-7 text-orange-600" />
                      </div>
                      <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 lg:mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="planos" className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
                Escolha seu plano
              </h2>
              <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
                Comece grátis e faça upgrade quando precisar de mais recursos
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="border-2 border-gray-200 h-full">
                  <CardContent className="p-6 lg:p-8">
                    <div className="mb-6 lg:mb-8">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Gratuito</h3>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-3xl lg:text-4xl font-extrabold text-gray-900">R$ 0</span>
                        <span className="text-gray-600">/mês</span>
                      </div>
                      <p className="text-sm lg:text-base text-gray-600">Perfeito para começar a organizar eventos</p>
                    </div>
                    <ul className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
                      {freePlanFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm lg:text-base text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to={createPageUrl('CreateEvent')} className="block">
                      <Button variant="outline" className="w-full min-h-[48px] text-base lg:text-lg">
                        Comece agora
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="border-2 border-orange-500 shadow-xl h-full relative overflow-hidden">
                  <div className="absolute top-4 right-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs lg:text-sm font-semibold">
                      Popular
                    </span>
                  </div>
                  <CardContent className="p-6 lg:p-8">
                    <div className="mb-6 lg:mb-8">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Premium</h3>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-3xl lg:text-4xl font-extrabold text-orange-600">R$ 9,90</span>
                        <span className="text-gray-600">/mês</span>
                      </div>
                      <p className="text-sm lg:text-base text-gray-600">Para organizadores frequentes de eventos</p>
                    </div>
                    <ul className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
                      {premiumPlanFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm lg:text-base text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to={createPageUrl('Upgrade')} className="block">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600 min-h-[48px] text-base lg:text-lg">
                        Fazer upgrade
                        <TrendingUp className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
                Pronto para organizar seu próximo evento?
              </h2>
              <p className="text-base lg:text-lg mb-8 lg:mb-10 opacity-90">
                Junte-se a centenas de organizadores que já simplificaram seus eventos com o TrazAí
              </p>
              <Link to={createPageUrl('CreateEvent')}>
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 min-h-[52px] text-base lg:text-lg shadow-xl px-8">
                  Comece grátis agora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-8 lg:py-12 px-4 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-orange-500" />
              <span className="font-bold text-lg text-gray-900">TrazAí</span>
            </div>
            <p className="text-sm lg:text-base text-gray-600 text-center md:text-left">
              &copy; 2025 TrazAí. Todos os direitos reservados.
            </p>
            <div className="flex gap-4 text-sm text-gray-600">
              <a href="#" className="hover:text-orange-500 transition-colors min-h-[44px] flex items-center">
                Termos
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors min-h-[44px] flex items-center">
                Privacidade
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors min-h-[44px] flex items-center">
                Contato
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="py-3 lg:py-4 px-4 lg:px-12 flex justify-between items-center border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
        <Link to={createPageUrl('Home')} className="flex items-center gap-2">
          <Zap className="w-6 h-6 lg:w-8 lg:h-8 text-orange-500" />
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">TrazAí</h1>
        </Link>
        <div className="flex gap-2">
          <Link to={createPageUrl('Dashboard')} className="hidden sm:block">
            <Button variant="outline" size="sm">Meus eventos</Button>
          </Link>
          <Link to={createPageUrl('CreateEvent')}>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">Criar evento</Button>
          </Link>
        </div>
      </header>
      <main>
        <section className="text-center py-12 lg:py-20 xl:py-32 px-4 bg-gradient-to-br from-orange-50 via-white to-green-50">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-4 lg:mb-6 tracking-tight leading-tight">
            Organize seu rolê sem complicação.
          </h1>
          <p className="text-base lg:text-lg xl:text-xl text-gray-600 max-w-xl lg:max-w-2xl mx-auto mb-8 leading-relaxed">
            Chega de planilhas e grupos de WhatsApp bagunçados. Com o TrazAí você organiza eventos de forma fácil.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link to={createPageUrl('CreateEvent')}>
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-base lg:text-lg shadow-lg w-full sm:w-auto min-w-[200px] h-12">
                Crie seu evento grátis <ArrowRight className="ml-2 w-4 h-4 lg:w-5 lg:h-5" />
              </Button>
            </Link>
            <Link to={createPageUrl('Dashboard')} className="sm:hidden">
              <Button variant="outline" size="lg" className="w-full min-w-[200px] h-12">
                Já tenho conta
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <footer className="py-6 lg:py-8 px-4 lg:px-12 border-t border-gray-100 text-center text-gray-500">
        <p className="text-sm lg:text-base">&copy; 2025 TrazAí. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

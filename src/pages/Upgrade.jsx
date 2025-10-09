
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CreditCard } from 'lucide-react';
import UpgradeForm from '@/components/upgrade/UpgradeForm';

export default function UpgradePage() {
    const navigate = useNavigate();

    const handleFormSubmit = (data) => {
        // Em um app real, os dados seriam salvos ou passados para a próxima etapa
        console.log("Upgrade data:", data);
        navigate(createPageUrl('UpgradeConfirm'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 p-4 md:p-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigate(createPageUrl("Home"))}
                        className="rounded-full"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
                            <CreditCard className="w-8 h-8 text-orange-500" />
                            Upgrade para Premium
                        </h1>
                        <p className="text-gray-600 mt-1">Desbloqueie todos os recursos e crie eventos ilimitados!</p>
                    </div>
                </div>

                <UpgradeForm onSubmit={handleFormSubmit} />
            </div>
        </div>
    );
}

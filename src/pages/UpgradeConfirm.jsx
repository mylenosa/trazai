import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { PaymentsService } from '@/components/lib/PaymentsService';

export default function UpgradeConfirm() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handlePay = async () => {
        setIsLoading(true);
        try {
            // Chama o serviço de pagamento simulado
            const paymentIntent = await PaymentsService.createPaymentIntent({
                amount: 990, // R$9,90 em centavos
                currency: 'BRL',
                plan: 'premium-monthly'
            });

            console.log("Intenção de pagamento criada:", paymentIntent);
            
            // Simula um tempo de processamento
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simula a verificação do status
            const statusResult = await PaymentsService.getPaymentStatus(paymentIntent.id);
            console.log("Status do pagamento:", statusResult);

            if (statusResult.status === 'succeeded') {
                setPaymentSuccess(true);
            } else {
                alert("Ocorreu um erro no pagamento simulado.");
            }

        } catch (error) {
            console.error("Erro ao processar pagamento:", error);
            alert("Ocorreu um erro ao tentar processar o pagamento.");
        }
        setIsLoading(false);
    };

    if (paymentSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <CardTitle className="text-2xl">Pagamento Aprovado!</CardTitle>
                        <CardDescription>Bem-vindo ao Premium! Sua conta foi atualizada com sucesso.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">Agora você pode criar eventos ilimitados e acessar todos os recursos exclusivos.</p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={() => navigate(createPageUrl('Dashboard'))}>
                            Ir para meus eventos
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Resumo da Compra</CardTitle>
                    <CardDescription>Confira os detalhes e prossiga para o pagamento.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                        <span className="text-gray-600">Plano</span>
                        <span className="font-semibold">Premium Mensal</span>
                    </div>
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                        <span className="text-gray-600">Valor</span>
                        <span className="font-bold text-2xl text-orange-600">R$ 9,90</span>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button onClick={handlePay} disabled={isLoading} className="w-full">
                        {isLoading ? 'Processando...' : 'Pagar Agora'}
                    </Button>
                    <Button variant="ghost" onClick={() => navigate(createPageUrl('Upgrade'))} className="w-full flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Voltar
                    </Button>
                    <p className="text-xs text-gray-500 flex items-center justify-center gap-2 mt-2">
                        <ShieldCheck className="w-4 h-4 text-green-600"/> Ambiente de pagamento seguro (simulado).
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
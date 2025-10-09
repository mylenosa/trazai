import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function UpgradeForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        plan: 'premium-monthly'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Card className="border-none shadow-xl">
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <CardTitle>Seus Dados</CardTitle>
                    <CardDescription>Preencha seus dados para continuar para o pagamento.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm sm:text-base">Nome Completo</Label>
                        <Input
                            id="name"
                            placeholder="Seu nome"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                            className="min-h-[48px] text-base"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm sm:text-base">E-mail</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                            className="min-h-[48px] text-base"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="plan" className="text-sm sm:text-base">Plano Escolhido</Label>
                        <Select value={formData.plan} onValueChange={(value) => setFormData({...formData, plan: value})}>
                            <SelectTrigger id="plan" className="min-h-[48px] text-base">
                                <SelectValue placeholder="Selecione o plano" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="premium-monthly">Premium Mensal - R$ 9,90/mês</SelectItem>
                                <SelectItem value="premium-yearly" disabled>Premium Anual (Em breve)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 min-h-[48px] text-base">
                        Continuar para Pagamento
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
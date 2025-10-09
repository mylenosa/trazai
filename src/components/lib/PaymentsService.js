/**
 * Serviço de Pagamento (Stub)
 * 
 * Este é um arquivo de simulação (stub) que imita a interação com um gateway de pagamento como Stripe ou PIX.
 * As funções aqui não realizam transações reais, mas retornam respostas esperadas
 * para que a UI possa ser desenvolvida e testada.
 * Quando um gateway real for integrado, este arquivo será substituído pela implementação real.
 */

const createPaymentIntent = async (details) => {
    console.log('[PaymentsService] Criando intenção de pagamento com:', details);
    // Simula uma chamada de API que leva um tempo
    await new Promise(resolve => setTimeout(resolve, 500));

    // Retorna um objeto parecido com o que um gateway real retornaria
    return {
        id: `pi_${Date.now()}`,
        client_secret: `pi_${Date.now()}_secret_${Math.random().toString(36).substring(2)}`,
        amount: details.amount,
        currency: details.currency,
        status: 'requires_payment_method',
    };
};

const getPaymentStatus = async (paymentIntentId) => {
    console.log('[PaymentsService] Verificando status do pagamento:', paymentIntentId);
    // Simula uma chamada de API
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simula um resultado de sucesso
    return {
        id: paymentIntentId,
        status: 'succeeded',
    };
};

export const PaymentsService = {
    createPaymentIntent,
    getPaymentStatus,
};
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility para combinar classes CSS com Tailwind
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Utility para criar URLs de páginas
export function createPageUrl(pageName, params = {}) {
  const routes = {
    Landing: '/',
    Home: '/',
    Dashboard: '/dashboard',
    CreateEvent: '/create-event',
    EventDetails: '/event',
    PublicEvent: '/public-event',
    Upgrade: '/upgrade',
    UpgradeConfirm: '/upgrade/confirm'
  };

  let url = routes[pageName] || '/';

  if (Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  return url;
}

// Utility para formatar data
export function formatDate(date, locale = 'pt-BR') {
  if (!date) return '';
  
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return new Date(date).toLocaleDateString(locale, options);
}

// Utility para formatar data e hora
export function formatDateTime(date, time, locale = 'pt-BR') {
  if (!date) return '';
  
  const dateStr = formatDate(date, locale);
  return time ? `${dateStr} às ${time}` : dateStr;
}

// Utility para gerar ID único
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Utility para validar email
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Utility para validar telefone brasileiro
export function isValidPhone(phone) {
  const phoneRegex = /^(?:\+55\s?)?(?:\(?[1-9][1-9]\)?\s?)(?:9\s?)?[0-9]{4}[\s-]?[0-9]{4}$/;
  return phoneRegex.test(phone);
}

// Utility para formatar telefone
export function formatPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  
  return phone;
}

// Utility para truncar texto
export function truncateText(text, maxLength = 100) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Utility para debounce
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Utility para copiar texto para clipboard
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Erro ao copiar para clipboard:', err);
    return false;
  }
}

// Utility para storage local
export const storage = {
  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Erro ao ler do localStorage:', error);
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Erro ao remover do localStorage:', error);
      return false;
    }
  },

  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Erro ao limpar localStorage:', error);
      return false;
    }
  }
};

export default {
  cn,
  createPageUrl,
  formatDate,
  formatDateTime,
  generateId,
  isValidEmail,
  isValidPhone,
  formatPhone,
  truncateText,
  debounce,
  copyToClipboard,
  storage
};
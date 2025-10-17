import { supabase } from '../lib/supabaseClient.js'

export class Participant {
  constructor({
    id = null,
    event_id = null,
    name = '',
    phone = '',
    status = 'confirmed',
    companions = 0,
    companion_names = [],
    contributions = []
  } = {}) {
    this.id = id || this.generateId();
    this.event_id = event_id;
    this.name = name;
    this.phone = phone;
    this.status = status;
    this.companions = companions;
    this.companion_names = companion_names;
    this.contributions = contributions;
    this.registeredAt = new Date();
    this.updatedAt = new Date();
  }

  // Getters
  get totalPeople() {
    return 1 + this.companions;
  }

  get isConfirmed() {
    return this.status === 'confirmed';
  }

  get isMaybe() {
    return this.status === 'maybe';
  }

  get isDeclined() {
    return this.status === 'declined';
  }

  get statusLabel() {
    const statusMap = {
      confirmed: 'Confirmado',
      maybe: 'Talvez',
      declined: 'Não vai'
    };
    return statusMap[this.status] || 'Desconhecido';
  }

  get statusColor() {
    const colorMap = {
      confirmed: 'green',
      maybe: 'yellow',
      declined: 'red'
    };
    return colorMap[this.status] || 'gray';
  }

  get formattedPhone() {
    return this.formatPhone(this.phone);
  }

  get totalContributions() {
    return this.contributions.length;
  }

  // Methods
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  updateStatus(newStatus) {
    if (['confirmed', 'maybe', 'declined'].includes(newStatus)) {
      this.status = newStatus;
      this.updatedAt = new Date();
    }
    return this;
  }

  updateDetails(updates) {
    Object.assign(this, updates);
    this.updatedAt = new Date();
    return this;
  }

  addContribution(contribution) {
    const newContribution = {
      id: this.generateId(),
      need_id: contribution.need_id,
      quantity: contribution.quantity || 0,
      amount: contribution.amount || 0,
      for_person: contribution.for_person || '',
      ...contribution
    };
    this.contributions.push(newContribution);
    this.updatedAt = new Date();
    return this;
  }

  removeContribution(contributionId) {
    this.contributions = this.contributions.filter(c => c.id !== contributionId);
    this.updatedAt = new Date();
    return this;
  }

  updateContribution(contributionId, updates) {
    const contributionIndex = this.contributions.findIndex(c => c.id === contributionId);
    if (contributionIndex !== -1) {
      this.contributions[contributionIndex] = { ...this.contributions[contributionIndex], ...updates };
      this.updatedAt = new Date();
    }
    return this;
  }

  addCompanion(companionName) {
    this.companion_names.push(companionName);
    this.companions = this.companion_names.length;
    this.updatedAt = new Date();
    return this;
  }

  removeCompanion(index) {
    this.companion_names.splice(index, 1);
    this.companions = this.companion_names.length;
    this.updatedAt = new Date();
    return this;
  }

  updateCompanion(index, newName) {
    if (index >= 0 && index < this.companion_names.length) {
      this.companion_names[index] = newName;
      this.updatedAt = new Date();
    }
    return this;
  }

  formatPhone(phone) {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    
    return phone;
  }

  validate() {
    const errors = [];
    
    if (!this.event_id) errors.push('ID do evento é obrigatório');
    if (!this.name) errors.push('Nome é obrigatório');
    if (!this.status) errors.push('Status é obrigatório');
    
    if (this.phone && !this.isValidPhone(this.phone)) {
      errors.push('Telefone deve ter formato válido');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  isValidPhone(phone) {
    const phoneRegex = /^(?:\+55\s?)?(?:\(?[1-9][1-9]\)?\s?)(?:9\s?)?[0-9]{4}[\s-]?[0-9]{4}$/;
    return phoneRegex.test(phone);
  }

  toJSON() {
    return {
      id: this.id,
      event_id: this.event_id,
      name: this.name,
      phone: this.phone,
      status: this.status,
      companions: this.companions,
      companion_names: this.companion_names,
      contributions: this.contributions,
      registeredAt: this.registeredAt,
      updatedAt: this.updatedAt
    };
  }

  static fromJSON(data) {
    const participant = new Participant(data);
    if (data.registeredAt) participant.registeredAt = new Date(data.registeredAt);
    if (data.updatedAt) participant.updatedAt = new Date(data.updatedAt);
    return participant;
  }

  static async create(participantData) {
    const participant = new Participant(participantData);
    const validation = participant.validate();

    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const { data, error } = await supabase
      .from('participants')
      .insert([participant.toJSON()])
      .select()
      .maybeSingle();

    if (error) {
      throw new Error(`Error creating participant: ${error.message}`);
    }

    return Participant.fromJSON(data);
  }

  static async filter({ event_id }) {
    if (!event_id) {
      throw new Error('event_id is required for filtering participants');
    }

    const { data, error } = await supabase
      .from('participants')
      .select('*')
      .eq('event_id', event_id)
      .order('registered_at', { ascending: false });

    if (error) {
      throw new Error(`Error fetching participants: ${error.message}`);
    }

    return data.map(participantData => Participant.fromJSON(participantData));
  }
}

// Schema para validação (compatível com o JSON Schema)
export const ParticipantSchema = {
  "name": "Participant",
  "type": "object",
  "properties": {
    "event_id": {
      "type": "string",
      "description": "ID do evento"
    },
    "name": {
      "type": "string",
      "description": "Nome do participante"
    },
    "phone": {
      "type": "string",
      "description": "Telefone (opcional)"
    },
    "status": {
      "type": "string",
      "enum": [
        "confirmed",
        "maybe",
        "declined"
      ],
      "description": "Status de presença"
    },
    "companions": {
      "type": "number",
      "default": 0,
      "description": "Número de acompanhantes"
    },
    "companion_names": {
      "type": "array",
      "description": "Nomes dos acompanhantes",
      "items": {
        "type": "string"
      }
    },
    "contributions": {
      "type": "array",
      "description": "Lista de contribuições",
      "items": {
        "type": "object",
        "properties": {
          "need_id": {
            "type": "string"
          },
          "quantity": {
            "type": "number"
          },
          "amount": {
            "type": "number"
          },
          "for_person": {
            "type": "string",
            "description": "Contribuição em nome de outra pessoa"
          }
        }
      }
    }
  },
  "required": [
    "event_id",
    "name",
    "status"
  ]
};
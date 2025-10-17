import { supabase } from '../lib/supabaseClient.js'

export class Event {
  constructor({
    id = null,
    name = '',
    description = '',
    location = '',
    mapsLink = '',
    date = null,
    time = '',
    unique_link = '',
    cover_image = '',
    needs = [],
    status = 'active'
  } = {}) {
    this.id = id || this.generateId();
    this.name = name;
    this.description = description;
    this.location = location;
    this.mapsLink = mapsLink;
    this.date = date;
    this.time = time;
    this.unique_link = unique_link || this.generateUniqueLink();
    this.cover_image = cover_image;
    this.needs = needs;
    this.status = status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Getters
  get formattedDate() {
    if (!this.date) return '';
    return new Date(this.date).toLocaleDateString('pt-BR');
  }

  get formattedDateTime() {
    if (!this.date || !this.time) return '';
    return `${this.formattedDate} às ${this.time}`;
  }

  get publicUrl() {
    return `${window.location.origin}/public-event?link=${this.unique_link}`;
  }

  get isActive() {
    return this.status === 'active';
  }

  get isCompleted() {
    return this.status === 'completed';
  }

  get isCancelled() {
    return this.status === 'cancelled';
  }

  get totalNeeds() {
    return this.needs.length;
  }

  get completedNeeds() {
    return this.needs.filter(need => need.covered >= need.quantity || need.covered >= need.amount).length;
  }

  get needsProgress() {
    if (this.totalNeeds === 0) return 100;
    return Math.round((this.completedNeeds / this.totalNeeds) * 100);
  }

  // Methods
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  generateUniqueLink() {
    return Math.random().toString(36).substr(2, 9);
  }

  updateDetails(updates) {
    Object.assign(this, updates);
    this.updatedAt = new Date();
    return this;
  }

  addNeed(need) {
    const newNeed = {
      id: this.generateId(),
      type: need.type || 'item',
      name: need.name,
      quantity: need.quantity || 0,
      unit: need.unit || '',
      amount: need.amount || 0,
      covered: 0,
      ...need
    };
    this.needs.push(newNeed);
    this.updatedAt = new Date();
    return this;
  }

  removeNeed(needId) {
    this.needs = this.needs.filter(need => need.id !== needId);
    this.updatedAt = new Date();
    return this;
  }

  updateNeed(needId, updates) {
    const needIndex = this.needs.findIndex(need => need.id === needId);
    if (needIndex !== -1) {
      this.needs[needIndex] = { ...this.needs[needIndex], ...updates };
      this.updatedAt = new Date();
    }
    return this;
  }

  updateStatus(newStatus) {
    if (['active', 'completed', 'cancelled'].includes(newStatus)) {
      this.status = newStatus;
      this.updatedAt = new Date();
    }
    return this;
  }

  validate() {
    const errors = [];
    
    if (!this.name) errors.push('Nome é obrigatório');
    if (!this.date) errors.push('Data é obrigatória');
    if (!this.location) errors.push('Local é obrigatório');
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      location: this.location,
      mapsLink: this.mapsLink,
      date: this.date,
      time: this.time,
      unique_link: this.unique_link,
      cover_image: this.cover_image,
      needs: this.needs,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  static fromJSON(data) {
    const event = new Event(data);
    if (data.createdAt) event.createdAt = new Date(data.createdAt);
    if (data.updatedAt) event.updatedAt = new Date(data.updatedAt);
    return event;
  }

  static async list() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error fetching events: ${error.message}`);
    }

    return data.map(eventData => Event.fromJSON(eventData));
  }

  static async create(eventData) {
    const event = new Event(eventData);
    const validation = event.validate();

    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const { data, error } = await supabase
      .from('events')
      .insert([event.toJSON()])
      .select()
      .maybeSingle();

    if (error) {
      throw new Error(`Error creating event: ${error.message}`);
    }

    return Event.fromJSON(data);
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(`Error fetching event: ${error.message}`);
    }

    if (!data) {
      return null;
    }

    return Event.fromJSON(data);
  }

  static async findByLink(link) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('unique_link', link)
      .maybeSingle();

    if (error) {
      throw new Error(`Error fetching event by link: ${error.message}`);
    }

    if (!data) {
      return null;
    }

    return Event.fromJSON(data);
  }
}

// Schema para validação (compatível com o JSON Schema)
export const EventSchema = {
  "name": "Event",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Nome do evento"
    },
    "description": {
      "type": "string",
      "description": "Descrição do evento"
    },
    "location": {
      "type": "string",
      "description": "Local do evento"
    },
    "mapsLink": {
      "type": "string",
      "format": "uri",
      "description": "Link para o local no Google Maps"
    },
    "date": {
      "type": "string",
      "format": "date",
      "description": "Data do evento"
    },
    "time": {
      "type": "string",
      "description": "Horário do evento"
    },
    "unique_link": {
      "type": "string",
      "description": "Link único para compartilhar"
    },
    "cover_image": {
      "type": "string",
      "description": "URL da imagem de capa"
    },
    "needs": {
      "type": "array",
      "description": "Lista de necessidades do evento",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "type": {
            "type": "string",
            "enum": [
              "item",
              "money"
            ]
          },
          "name": {
            "type": "string"
          },
          "quantity": {
            "type": "number"
          },
          "unit": {
            "type": "string"
          },
          "amount": {
            "type": "number"
          },
          "covered": {
            "type": "number",
            "default": 0
          }
        }
      }
    },
    "status": {
      "type": "string",
      "enum": [
        "active",
        "completed",
        "cancelled"
      ],
      "default": "active"
    }
  },
  "required": [
    "name",
    "date",
    "location"
  ]
};
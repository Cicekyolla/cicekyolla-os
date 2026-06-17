// CICEKYOLLA OS — In-memory data store
// Central typed dataset consumed by dashboard, orders, CRM, couriers,
// customer360 and delivery operations. Replace exports with live API
// data when the backend is wired (GET /orders, /couriers, /customers).
// Full source: github.com/Cicekyolla/cicekyolla-os
import type { OrderStatus } from '../components/ui-kit';

// ───────────────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────────────
export interface Order {
  id:         string;        // e.g. "#8841"
  customerId: number;        // FK → Customer.id
  customer:   string;        // denormalized display name
  product:    string;
  district:   string;
  amount:     number;        // ₺
  status:     OrderStatus;
  courier:    string | null;
  time:       string;        // relative label, e.g. "12 dk önce"
}

export type CourierStatus = 'active' | 'resting' | 'offline';

export interface Courier {
  id:              number;
  name:            string;
  vehicle:         string;
  zone:            string;
  status:          CourierStatus;
  rating:          number;
  todayDeliveries: number;
}

export interface CustomerNote {
  id:   number;
  text: string;
  date: string;
  author: string;
}

export interface CustomerTask {
  id:    number;
  title: string;
  due:   string;
  done:  boolean;
}

export type ChurnRisk = 'Düşük' | 'Orta' | 'Yüksek';

export interface Customer {
  id:               number;
  name:             string;
  email:            string;
  phone:            string;
  city:             string;
  segment:          'VIP' | 'Premium' | 'Regular' | 'Yeni';
  ltv:              number;
  nps:              number;
  orderCount:       number;
  totalOrders:      number;
  lastOrder:        string;
  favoriteCategory: string;
  churnRisk:        ChurnRisk;
  joinDate:         string;
  tags:             string[];
  notes:            CustomerNote[];
  tasks:            CustomerTask[];
}

// ───────────────────────────────────────────────────────────────
// Customers
// ───────────────────────────────────────────────────────────────
export const CUSTOMERS: Customer[] = [
  {
    id: 1, name: 'Ayşe Kaya', email: 'ayse.kaya@gmail.com', phone: '0532 111 22 33',
    city: 'İstanbul', segment: 'VIP', ltv: 18400, nps: 10, orderCount: 12, totalOrders: 12,
    lastOrder: '2 gün önce', favoriteCategory: 'Orkide', churnRisk: 'Düşük', joinDate: '12.03.2022',
    tags: ['VIP', 'Kurumsal', 'Sadık'],
    notes: [
      { id: 1, text: 'Ofisine düzenli orkide gönderiyor. Faturalı teslimat tercih ediyor.', date: '10.06.2026', author: 'Admin' },
    ],
    tasks: [
      { id: 1, title: 'Doğum günü kampanyası ara', due: '18.06.2026', done: false },
    ],
  },
  {
    id: 2, name: 'Mehmet Yılmaz', email: 'mehmet.y@outlook.com', phone: '0542 333 44 55',
    city: 'Ankara', segment: 'Premium', ltv: 9200, nps: 8, orderCount: 7, totalOrders: 7,
    lastOrder: '1 hafta önce', favoriteCategory: 'Gül Buketi', churnRisk: 'Düşük', joinDate: '05.07.2023',
    tags: ['Premium'],
    notes: [],
    tasks: [
      { id: 2, title: 'Yıldönümü hatırlatması gönder', due: '20.06.2026', done: false },
    ],
  },
  {
    id: 3, name: 'Selin Aydın', email: 'selin.aydin@gmail.com', phone: '0553 555 66 77',
    city: 'İzmir', segment: 'VIP', ltv: 24800, nps: 9, orderCount: 19, totalOrders: 19,
    lastOrder: 'Dün', favoriteCategory: 'Aranjman', churnRisk: 'Düşük', joinDate: '22.01.2021',
    tags: ['VIP', 'Sadık', 'Erken Sipariş'],
    notes: [
      { id: 2, text: 'Premium ambalaj her zaman istiyor.', date: '01.06.2026', author: 'Operasyon' },
    ],
    tasks: [],
  },
  {
    id: 4, name: 'Burak Taş', email: 'burak.tas@gmail.com', phone: '0544 777 88 99',
    city: 'Bursa', segment: 'Regular', ltv: 2100, nps: 6, orderCount: 3, totalOrders: 3,
    lastOrder: '3 hafta önce', favoriteCategory: 'Saksı Çiçeği', churnRisk: 'Orta', joinDate: '18.02.2025',
    tags: [],
    notes: [],
    tasks: [
      { id: 3, title: 'Win-back e-postası planla', due: '22.06.2026', done: false },
    ],
  },
  {
    id: 5, name: 'Zeynep Demir', email: 'zeynep.demir@icloud.com', phone: '0535 999 00 11',
    city: 'İstanbul', segment: 'Premium', ltv: 11600, nps: 9, orderCount: 8, totalOrders: 8,
    lastOrder: '4 gün önce', favoriteCategory: 'Lilyum', churnRisk: 'Düşük', joinDate: '30.09.2023',
    tags: ['Premium', 'Özel Gün'],
    notes: [],
    tasks: [],
  },
  {
    id: 6, name: 'Emre Çelik', email: 'emre.celik@gmail.com', phone: '0531 222 11 00',
    city: 'Antalya', segment: 'Regular', ltv: 1450, nps: 5, orderCount: 2, totalOrders: 2,
    lastOrder: '2 ay önce', favoriteCategory: 'Gül Buketi', churnRisk: 'Yüksek', joinDate: '11.04.2025',
    tags: ['Risk'],
    notes: [
      { id: 3, text: 'Son teslimatta gecikme şikayeti oldu. Telafi kuponu verildi.', date: '15.04.2026', author: 'Destek' },
    ],
    tasks: [
      { id: 4, title: 'Memnuniyet araması yap', due: '19.06.2026', done: false },
    ],
  },
];

// ───────────────────────────────────────────────────────────────
// Couriers
// ───────────────────────────────────────────────────────────────
export const COURIERS: Courier[] = [
  { id: 1, name: 'Mehmet Demir',  vehicle: 'Motosiklet', zone: 'Kadıköy',     status: 'active',  rating: 4.9, todayDeliveries: 14 },
  { id: 2, name: 'Ali Yıldız',    vehicle: 'Motosiklet', zone: 'Beşiktaş',    status: 'active',  rating: 4.8, todayDeliveries: 11 },
  { id: 3, name: 'Hasan Kara',    vehicle: 'Araç',       zone: 'Şişli',       status: 'active',  rating: 4.7, todayDeliveries: 9  },
  { id: 4, name: 'Murat Şahin',   vehicle: 'Motosiklet', zone: 'Üsküdar',     status: 'resting', rating: 4.6, todayDeliveries: 7  },
  { id: 5, name: 'Okan Aslan',    vehicle: 'Araç',       zone: 'Bakırköy',    status: 'active',  rating: 4.9, todayDeliveries: 12 },
  { id: 6, name: 'Serkan Polat',  vehicle: 'Motosiklet', zone: 'Maltepe',     status: 'offline', rating: 4.5, todayDeliveries: 0  },
];

// ───────────────────────────────────────────────────────────────
// Orders
// ───────────────────────────────────────────────────────────────
export const ORDERS: Order[] = [
  { id: '#8841', customerId: 1, customer: 'Ayşe Kaya',    product: 'Beyaz Orkide Aranjmanı',   district: 'Kadıköy',  amount: 1840, status: 'new',         courier: null,           time: '4 dk önce'  },
  { id: '#8840', customerId: 3, customer: 'Selin Aydın',  product: 'Premium Gül Buketi (51)',  district: 'Konak',    amount: 2940, status: 'preparing',   courier: null,           time: '12 dk önce' },
  { id: '#8839', customerId: 5, customer: 'Zeynep Demir', product: 'Lilyum & Lisyantus',       district: 'Şişli',    amount: 1280, status: 'designing',   courier: null,           time: '18 dk önce' },
  { id: '#8838', customerId: 2, customer: 'Mehmet Yılmaz', product: 'Kırmızı Gül (21)',        district: 'Çankaya',  amount: 980,  status: 'ready',       courier: null,           time: '25 dk önce' },
  { id: '#8837', customerId: 3, customer: 'Selin Aydın',  product: 'Doğum Günü Aranjmanı',     district: 'Karşıyaka', amount: 1560, status: 'at-courier', courier: 'Okan Aslan',   time: '34 dk önce' },
  { id: '#8836', customerId: 1, customer: 'Ayşe Kaya',    product: 'Kurumsal Açılış Çelengi',  district: 'Ataşehir', amount: 3200, status: 'delivering',  courier: 'Mehmet Demir', time: '48 dk önce' },
  { id: '#8835', customerId: 5, customer: 'Zeynep Demir', product: 'Sevgililer Özel Kutu',     district: 'Beşiktaş', amount: 1720, status: 'delivering',  courier: 'Ali Yıldız',   time: '1 saat önce' },
  { id: '#8834', customerId: 2, customer: 'Mehmet Yılmaz', product: 'Saksı Orkide (2 dal)',    district: 'Üsküdar',  amount: 740,  status: 'delivered',   courier: 'Hasan Kara',   time: '2 saat önce' },
  { id: '#8833', customerId: 4, customer: 'Burak Taş',    product: 'Teşekkür Buketi',          district: 'Nilüfer',  amount: 620,  status: 'delivered',   courier: 'Okan Aslan',   time: '3 saat önce' },
  { id: '#8832', customerId: 6, customer: 'Emre Çelik',   product: 'Karışık Mevsim Buketi',    district: 'Muratpaşa', amount: 540, status: 'cancelled',   courier: null,           time: '4 saat önce' },
];

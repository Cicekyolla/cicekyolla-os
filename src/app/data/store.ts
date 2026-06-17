export const CUSTOMERS = [
  {
    id: 'c1',
    name: 'Ayse Kaya',
    email: 'ayse@example.com',
    phone: '+90 555 111 22 33',
    district: 'Kadikoy',
    address: 'Kadikoy / Istanbul',
    ltv: 12840,
    nps: 9,
    totalOrders: 18,
    lastOrder: '2026-06-14',
    birthday: '12 Temmuz',
    anniversary: '3 Eylul',
    daysLeft: 24,
    notes: [
      { id: 1, text: 'VIP musteri, premium paket tercih ediyor.', date: '14.06.2026' }
    ],
    tasks: [
      { id: 1, text: 'Dogum gunu kampanyasi gonder', due: '2026-06-20', status: 'open' }
    ]
  },
  {
    id: 'c2',
    name: 'Mehmet Yilmaz',
    email: 'mehmet@example.com',
    phone: '+90 555 444 55 66',
    district: 'Besiktas',
    address: 'Besiktas / Istanbul',
    ltv: 8420,
    nps: 8,
    totalOrders: 11,
    lastOrder: '2026-06-12',
    birthday: '25 Haziran',
    anniversary: '18 Agustos',
    daysLeft: 8,
    notes: [],
    tasks: []
  }
];

export const ORDERS = [
  {
    id: 'o1',
    orderNo: 'CY-1001',
    customerId: 'c1',
    customerName: 'Ayse Kaya',
    status: 'preparing',
    amount: 1240,
    district: 'Kadikoy',
    courier: 'Ali Kurye',
    date: '2026-06-17',
    time: '13:40',
    items: 'Premium gul buketi'
  },
  {
    id: 'o2',
    orderNo: 'CY-1002',
    customerId: 'c2',
    customerName: 'Mehmet Yilmaz',
    status: 'delivering',
    amount: 860,
    district: 'Besiktas',
    courier: 'Zeynep Kurye',
    date: '2026-06-17',
    time: '14:10',
    items: 'Orkide aranjmani'
  },
  {
    id: 'o3',
    orderNo: 'CY-1003',
    customerId: 'c1',
    customerName: 'Ayse Kaya',
    status: 'delivered',
    amount: 1490,
    district: 'Uskudar',
    courier: 'Ali Kurye',
    date: '2026-06-16',
    time: '17:25',
    items: 'Cikolata ve cicek seti'
  }
];

export const COURIERS = [
  {
    id: 'k1',
    name: 'Ali Kurye',
    phone: '+90 555 777 88 99',
    status: 'active',
    zone: 'Anadolu Yakasi',
    district: 'Kadikoy',
    orders: 8,
    capacity: 12,
    rating: 4.9
  },
  {
    id: 'k2',
    name: 'Zeynep Kurye',
    phone: '+90 555 222 33 44',
    status: 'active',
    zone: 'Avrupa Yakasi',
    district: 'Besiktas',
    orders: 6,
    capacity: 10,
    rating: 4.8
  },
  {
    id: 'k3',
    name: 'Murat Kurye',
    phone: '+90 555 999 00 11',
    status: 'resting',
    zone: 'Merkez',
    district: 'Sisli',
    orders: 0,
    capacity: 10,
    rating: 4.7
  }
];

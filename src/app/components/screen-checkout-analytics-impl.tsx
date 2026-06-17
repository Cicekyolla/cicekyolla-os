import { T } from './ui-kit';

const cards = [
  { label: 'Sepet Dönüşümü', value: '68.4%', sub: '+4.2%' },
  { label: 'Ortalama Sepet', value: '₺695', sub: '+8.7%' },
  { label: 'Terk Edilen Sepet', value: '21.6%', sub: '-3.1%' },
  { label: 'Günlük Ciro', value: '₺58.400', sub: '+12.5%' }
];

const funnel = [
  { step: 'Ürün Görüntüleme', value: 100 },
  { step: 'Sepete Ekleme', value: 72 },
  { step: 'Teslimat Bilgisi', value: 54 },
  { step: 'Ödeme', value: 43 },
  { step: 'Sipariş', value: 38 }
];

export function ScreenCheckoutAnalytics() {
  return (
    <div style={{ minHeight:'100%', background:T.gray50, padding:'32px' }}>
      <div style={{ maxWidth:1180, margin:'0 auto' }}>
        <div style={{ marginBottom:24 }}>
          <h1 style={{ fontSize:28, fontWeight:900, color:T.gray900, margin:'0 0 6px' }}>
            Checkout Analytics
          </h1>
          <p style={{ fontSize:14, color:T.gray500, margin:0 }}>
            Sepet, ödeme ve dönüşüm performansı
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, minmax(0, 1fr))', gap:16, marginBottom:24 }}>
          {cards.map((card) => (
            <div key={card.label} style={{ background:'#fff', border:`1px solid ${T.gray200}`, borderRadius:14, padding:20 }}>
              <div style={{ fontSize:12, color:T.gray400, fontWeight:700, marginBottom:8 }}>{card.label}</div>
              <div style={{ fontSize:26, color:T.gray900, fontWeight:900 }}>{card.value}</div>
              <div style={{ fontSize:12, color:'#16A34A', fontWeight:700, marginTop:6 }}>{card.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background:'#fff', border:`1px solid ${T.gray200}`, borderRadius:16, padding:24 }}>
          <h2 style={{ fontSize:18, fontWeight:900, color:T.gray900, margin:'0 0 18px' }}>
            Checkout Funnel
          </h2>

          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {funnel.map((item) => (
              <div key={item.step}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                  <span style={{ fontSize:13, color:T.gray700, fontWeight:700 }}>{item.step}</span>
                  <span style={{ fontSize:13, color:T.gray500 }}>{item.value}%</span>
                </div>
                <div style={{ height:10, background:T.gray100, borderRadius:99, overflow:'hidden' }}>
                  <div style={{ width:`${item.value}%`, height:'100%', background:'#16A34A', borderRadius:99 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

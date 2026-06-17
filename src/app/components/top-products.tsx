// CICEKYOLLA OS — Top Products Widget
import { T } from './ui-kit';
import { STOREFRONT_PRODUCTS } from '../data/products-store';

export function TopProducts() {
  const products = STOREFRONT_PRODUCTS.filter(p=>p.status==='active').slice(0,5);
  return (
    <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
      <div style={{ padding:'14px 20px', borderBottom:`1px solid ${T.gray100}`, fontSize:13, fontWeight:700, color:T.gray800 }}>Top Ürünler</div>
      <table style={{ width:'100%', borderCollapse:'collapse' }}>
        <thead>
          <tr style={{ background:T.gray50 }}>
            {['Ürün','Fiyat','Puan','Satış'].map(h=>(
              <th key={h} style={{ padding:'9px 14px', fontSize:10.5, fontWeight:700, color:T.gray400, textAlign:'left', textTransform:'uppercase', letterSpacing:'0.06em', borderBottom:`1px solid ${T.gray100}` }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((p,i)=>(
            <tr key={p.id} style={{ borderBottom:`1px solid ${T.gray50}` }}>
              <td style={{ padding:'11px 14px' }}>
                <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                  <span style={{ fontSize:20 }}>{p.emoji}</span>
                  <div>
                    <div style={{ fontSize:12.5, fontWeight:700, color:T.gray900 }}>{p.name}</div>
                    <div style={{ fontSize:11, color:T.gray400 }}>{p.category}</div>
                  </div>
                </div>
              </td>
              <td style={{ padding:'11px 14px', fontSize:13, fontWeight:800, color:'#7C3AED' }}>₺{p.basePrice.toLocaleString('tr-TR')}</td>
              <td style={{ padding:'11px 14px', fontSize:12, color:T.gray600 }}>★ {p.rating}</td>
              <td style={{ padding:'11px 14px', fontSize:12.5, fontWeight:600, color:T.gray700 }}>{p.sold.toLocaleString('tr-TR')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

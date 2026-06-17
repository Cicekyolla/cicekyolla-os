// CICEKYOLLA OS — Checkout Revenue Analytics (Implementation)
// 6 modules: Overview · Funnel · Products · Bundles · AOV · Abandonment
// Full source: github.com/Cicekyolla/cicekyolla-os
import { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  LayoutDashboard, Filter, ShoppingBag, Package, TrendingUp, AlertTriangle,
} from 'lucide-react';
import { T, fmtCurrency } from './ui-kit';
import {
  REVENUE_METRICS, DAILY_REVENUE, AOV_TREND, FUNNEL_DATA,
  ABANDONMENT_BY_STEP, UPSELL_CATALOG, BUNDLES,
} from '../data/revenue-store';

type ModuleId = 'overview' | 'funnel' | 'products' | 'bundles' | 'aov' | 'abandonment';

const MODULES: { id: ModuleId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview',     label: 'Genel Bakış',  icon: LayoutDashboard },
  { id: 'funnel',       label: 'Huni',         icon: Filter },
  { id: 'products',     label: 'Upsell Ürünler', icon: ShoppingBag },
  { id: 'bundles',      label: 'Paketler',     icon: Package },
  { id: 'aov',          label: 'AOV Trendi',   icon: TrendingUp },
  { id: 'abandonment',  label: 'Terk Analizi', icon: AlertTriangle },
];

function Kpi({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, border: `1px solid ${T.gray200}`, padding: '16px 18px', flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: T.gray400, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 900, color }}>{value}</div>
      <div style={{ fontSize: 11, color: T.gray400, marginTop: 3 }}>{sub}</div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, border: `1px solid ${T.gray200}`, padding: 20 }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: T.gray800, marginBottom: 16 }}>{title}</div>
      {children}
    </div>
  );
}

export function ScreenCheckoutAnalytics() {
  const [module, setModule] = useState<ModuleId>('overview');

  return (
    <div style={{ height: '100%', display: 'flex', overflow: 'hidden' }}>
      {/* Module rail */}
      <div style={{ width: 210, flexShrink: 0, borderRight: `1px solid ${T.gray100}`, background: '#fff', padding: '16px 10px', overflowY: 'auto' }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color: T.gray400, textTransform: 'uppercase', padding: '0 8px 10px' }}>
          Checkout Analytics
        </div>
        {MODULES.map(m => {
          const active = module === m.id;
          const Icon = m.icon;
          return (
            <button key={m.id} onClick={() => setModule(m.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 9,
                padding: '9px 10px', borderRadius: 8, border: 'none', cursor: 'pointer',
                marginBottom: 3, textAlign: 'left',
                background: active ? T.greenLight : 'transparent',
              }}>
              <Icon style={{ width: 15, height: 15, color: active ? T.green : T.gray500 }} />
              <span style={{ fontSize: 12.5, fontWeight: active ? 700 : 500, color: active ? T.greenDark : T.gray700 }}>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 24, background: T.gray50 }}>
        {module === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <Kpi label="Mevcut AOV" value={fmtCurrency(REVENUE_METRICS.currentAOV)} sub={`AOV büyüme +%${REVENUE_METRICS.aovGrowthMoM} (MoM)`} color={T.green} />
              <Kpi label="Upsell Kabul" value={`%${REVENUE_METRICS.upsellAcceptRate}`} sub="sipariş başına" color={T.amber} />
              <Kpi label="Aylık Upsell Geliri" value={fmtCurrency(REVENUE_METRICS.monthlyUpsellRevenue)} sub="son 30 gün" color={T.purple} />
              <Kpi label="Sepet Terk Oranı" value={`%${REVENUE_METRICS.cartAbandonRate}`} sub="iyileştirme fırsatı" color={T.red} />
            </div>
            <Card title="Günlük Gelir — Baz vs Upsell">
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={DAILY_REVENUE}>
                  <defs>
                    <linearGradient id="caBase" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={T.green} stopOpacity={0.3} /><stop offset="95%" stopColor={T.green} stopOpacity={0} /></linearGradient>
                    <linearGradient id="caUps" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={T.amber} stopOpacity={0.3} /><stop offset="95%" stopColor={T.amber} stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.gray100} />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: T.gray400 }} />
                  <YAxis tick={{ fontSize: 11, fill: T.gray400 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="base" stroke={T.green} fill="url(#caBase)" strokeWidth={2} />
                  <Area type="monotone" dataKey="upsell" stroke={T.amber} fill="url(#caUps)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}

        {module === 'funnel' && (
          <Card title="Checkout Hunisi">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {FUNNEL_DATA.map(stage => (
                <div key={stage.stage}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: T.gray700 }}>{stage.stage}</span>
                    <span style={{ fontSize: 12, color: T.gray400 }}>{stage.count.toLocaleString('tr-TR')} · %{stage.pct}</span>
                  </div>
                  <div style={{ height: 22, borderRadius: 6, background: T.gray100, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${stage.pct}%`, background: `linear-gradient(90deg, ${T.green}, ${T.greenDark})`, borderRadius: 6 }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {module === 'products' && (
          <Card title="Upsell Ürün Performansı">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={UPSELL_CATALOG.filter(u => u.active)} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={T.gray100} />
                <XAxis type="number" tick={{ fontSize: 11, fill: T.gray400 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: T.gray500 }} width={140} />
                <Tooltip />
                <Bar dataKey="monthlyRevenue" fill={T.purple} radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        )}

        {module === 'bundles' && (
          <Card title="Paket Satış Performansı">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {BUNDLES.map(b => (
                <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: T.gray50, borderRadius: 10 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.gray800 }}>{b.name}</div>
                    <div style={{ fontSize: 11.5, color: T.gray400, marginTop: 2 }}>{b.description}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 14, fontWeight: 900, color: T.green }}>{b.soldCount} satış</div>
                    <div style={{ fontSize: 11, color: T.amber, marginTop: 2 }}>{fmtCurrency(b.savings)} tasarruf</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {module === 'aov' && (
          <Card title="Ortalama Sepet Tutarı (AOV) Trendi">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={AOV_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke={T.gray100} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: T.gray400 }} />
                <YAxis tick={{ fontSize: 11, fill: T.gray400 }} />
                <Tooltip />
                <Line type="monotone" dataKey="aov" stroke={T.purple} strokeWidth={2.5} dot={{ r: 3 }} name="AOV" />
                <Line type="monotone" dataKey="target" stroke={T.green} strokeWidth={2} strokeDasharray="5 3" dot={false} name="Hedef" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        )}

        {module === 'abandonment' && (
          <Card title="Adım Bazlı Terk Oranı">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {ABANDONMENT_BY_STEP.map(step => (
                <div key={step.step}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: T.gray700 }}>{step.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: step.rate > 25 ? T.red : T.amber }}>%{step.rate}</span>
                  </div>
                  <div style={{ height: 18, borderRadius: 6, background: T.gray100, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${step.rate}%`, background: step.rate > 25 ? T.red : T.amber, borderRadius: 6 }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

// CICEKYOLLA OS — AI Center
import { useState } from 'react';
import { Sparkles, Send, RefreshCw, Copy, Star, Zap, MessageSquare, FileText, Search, TrendingUp } from 'lucide-react';
import { T } from './ui-kit';

const AI_TOOLS = [
  { id:'product-desc', icon:FileText, label:'Ürün Açıklamas Yaz', desc:'SEO uyumlu ürün açıklaması oluştur', color:'#7C3AED' },
  { id:'seo-content', icon:Search, label:'SEO İçerik Oluştur', desc:'Anahtar kelime bazlı içerik üret', color:'#2563EB' },
  { id:'email-campaign', icon:MessageSquare, label:'E-posta Kampanyası', desc:'Doğum günü ve yıldönümü e-postaları', color:'#16A34A' },
  { id:'whatsapp-msg', icon:MessageSquare, label:'WhatsApp Mesajı', desc:'Müşteri mesaj şablonları oluştur', color:'#25D366' },
  { id:'social-caption', icon:Star, label:'Sosyal Medya Yazısı', desc:'Instagram & Facebook için caption', color:'#E1306C' },
  { id:'review-reply', icon:MessageSquare, label:'Yorum Yanıtı', desc:'Google yorumlarına AI yanıt', color:'#D97706' },
];

const SAMPLE_OUTPUTS = {
  'product-desc': '51 adet Ecuador\'dan özenle seçilmiş premium kırmızı güllerin muhteşem buketi. Her bir taç yaprağı mükemmel şekilde açılmış, taze ve canlı. Sevdiklerinize olan derin duygularınızı en güzel şekilde ifade eden bu buket, aynı gün İstanbul\'a teslim edilmektedir. \n\n✓ Ecuador ithal premium güller\n✓ Aynı gün teslimat garantisi\n✓ Taze garanti — memnuniyet iade',
  'seo-content': 'İstanbul çiçek siparişi için en güvenilir adres Cicekyolla! Aynı gün teslimat ile 50.000+ mutlu müşteriye hizmet veriyoruz. Kadıköy, Beşiktaş, Şişli ve tüm İstanbul\'a ekspres çiçek teslimatı yapıyoruz...',
};

export function ScreenAI() {
  const [activeTool, setActiveTool] = useState('product-desc');
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState(SAMPLE_OUTPUTS['product-desc']);
  const [generating, setGenerating] = useState(false);

  function generate() {
    if (!prompt.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      setOutput(`${SAMPLE_OUTPUTS[activeTool as keyof typeof SAMPLE_OUTPUTS] || 'AI içerik üretildi...'}\n\n[Prompt: ${prompt}]`);
      setGenerating(false);
    }, 1500);
  }

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', overflow:'hidden', background:T.gray50 }}>
      {/* Header */}
      <div style={{ background:'#fff', borderBottom:`1px solid ${T.gray200}`, padding:'16px 28px', display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0 }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <Sparkles style={{ width:18, height:18, color:'#7C3AED' }}/>
            <h1 style={{ fontSize:18, fontWeight:900, color:T.gray900, margin:0 }}>AI İçerik Merkezi</h1>
          </div>
          <p style={{ fontSize:12.5, color:T.gray400, margin:'3px 0 0' }}>Claude AI ile içerik üret — SEO, ürün, kampanya</p>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8, background:'#EDE9FE', borderRadius:99, padding:'6px 14px' }}>
          <Zap style={{ width:13, height:13, color:'#7C3AED' }}/>
          <span style={{ fontSize:12, fontWeight:700, color:'#7C3AED' }}>Powered by Claude AI</span>
        </div>
      </div>

      <div style={{ flex:1, display:'grid', gridTemplateColumns:'240px 1fr', overflow:'hidden' }}>
        {/* Tool selector */}
        <div style={{ background:'#fff', borderRight:`1px solid ${T.gray200}`, overflowY:'auto', padding:'12px 8px' }}>
          {AI_TOOLS.map(tool=>(
            <button key={tool.id} onClick={()=>{ setActiveTool(tool.id); setOutput(SAMPLE_OUTPUTS[tool.id as keyof typeof SAMPLE_OUTPUTS]||''); }} style={{ width:'100%', padding:'12px', border:'none', borderRadius:10, background:activeTool===tool.id?'#EDE9FE':'transparent', cursor:'pointer', display:'flex', gap:10, alignItems:'flex-start', textAlign:'left', marginBottom:4, transition:'all 0.12s' }}>
              <div style={{ width:32, height:32, borderRadius:8, background:`${tool.color}15`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <tool.icon style={{ width:15, height:15, color:tool.color }}/>
              </div>
              <div>
                <div style={{ fontSize:12.5, fontWeight:activeTool===tool.id?700:500, color:activeTool===tool.id?'#7C3AED':T.gray700 }}>{tool.label}</div>
                <div style={{ fontSize:10.5, color:T.gray400, marginTop:1 }}>{tool.desc}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Main area */}
        <div style={{ display:'flex', flexDirection:'column', overflow:'hidden' }}>
          {/* Output */}
          <div style={{ flex:1, overflowY:'auto', padding:'20px 24px' }}>
            <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20, minHeight:200, position:'relative' }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
                <div style={{ fontSize:12, fontWeight:700, color:T.gray400, textTransform:'uppercase', letterSpacing:'0.08em' }}>Üretilen İçerik</div>
                <div style={{ display:'flex', gap:8 }}>
                  <button style={{ padding:'5px 10px', border:`1px solid ${T.gray200}`, borderRadius:7, background:'#fff', fontSize:11.5, cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}><Copy style={{ width:11, height:11 }}/> Kopyala</button>
                  <button onClick={()=>setGenerating(g=>!g)} style={{ padding:'5px 10px', border:`1px solid ${T.gray200}`, borderRadius:7, background:'#fff', fontSize:11.5, cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}><RefreshCw style={{ width:11, height:11 }}/> Yenile</button>
                </div>
              </div>
              {generating ? (
                <div style={{ display:'flex', alignItems:'center', gap:10, color:T.gray400 }}>
                  <div style={{ width:16, height:16, borderRadius:'50%', border:`2px solid #7C3AED`, borderTopColor:'transparent', animation:'spin 0.8s linear infinite' }}/>
                  <span style={{ fontSize:13 }}>AI içerik üretiyor...</span>
                </div>
              ) : (
                <div style={{ fontSize:13.5, color:T.gray700, lineHeight:1.8, whiteSpace:'pre-wrap' }}>{output || 'Aşağıya prompt yazın ve Üret\'e basın.'}</div>
              )}
            </div>
          </div>

          {/* Input */}
          <div style={{ background:'#fff', borderTop:`1px solid ${T.gray200}`, padding:'16px 24px', flexShrink:0 }}>
            <div style={{ display:'flex', gap:12, alignItems:'flex-end' }}>
              <textarea
                value={prompt}
                onChange={e=>setPrompt(e.target.value)}
                placeholder="Ürün adını, hedef kitleyi veya isteğinizi yazın..."
                rows={2}
                style={{ flex:1, padding:'10px 14px', border:`1.5px solid ${T.gray200}`, borderRadius:10, fontSize:13, outline:'none', resize:'none', fontFamily:'inherit', lineHeight:1.5 }}
                onKeyDown={e=>{ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); generate(); } }}
              />
              <button onClick={generate} disabled={generating} style={{ padding:'10px 20px', border:'none', borderRadius:10, background:'#7C3AED', color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:6, flexShrink:0 }}>
                <Send style={{ width:13, height:13 }}/> Üret
              </button>
            </div>
            <div style={{ fontSize:11, color:T.gray400, marginTop:8 }}>Enter ile üret • Shift+Enter yeni satır</div>
          </div>
        </div>
      </div>
    </div>
  );
}

(()=>{
  const $=id=>document.getElementById(id);
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const defaults=[{name:'SCATTER',weights:[1,2,3,4,5]},{name:'WILD',weights:[1,2,3,4,5]},{name:'KUCING',weights:[1,2,3,4,5]},{name:'ITEM_1',weights:[1,1,1,1,1]}];
  let symbols=defaults.map(x=>({name:x.name,weights:x.weights.slice()}));
  function rng(seed){let a=seed>>>0;return()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}}
  function renderRows(){
    const out=$('symbolRngRows');if(!out)return;
    out.innerHTML=symbols.map((item,i)=>'<div class="rng-symbol-row" data-index="'+i+'"><input class="rng-symbol-name" value="'+esc(item.name)+'" aria-label="Nama symbol"><div class="rng-symbol-options">'+item.weights.map((value,j)=>'<label>Opsi '+(j+1)+' · custom<input class="rng-symbol-weight" type="number" min="0" max="100000" step="0.1" value="'+value+'" aria-label="'+esc(item.name)+' opsi '+(j+1)+'"></label>').join('')+'</div><button class="secondary compact rng-remove" data-remove="'+i+'"'+(symbols.length<2?' disabled':'')+'>Hapus</button></div>').join('');
  }
  function readRows(){return [...document.querySelectorAll('.rng-symbol-row')].map(row=>({name:row.querySelector('.rng-symbol-name').value.trim().toUpperCase()||'SYMBOL',weights:[...row.querySelectorAll('.rng-symbol-weight')].map(x=>Math.max(0,Number(x.value)||0))})).filter(x=>x.name)}
  function analyze(){
    symbols=readRows();
    const seed=Number($('symbolRngSeed').value)||12345,samples=Math.min(100000,Math.max(1000,Number($('symbolRngSamples').value)||10000)),results=[];
    for(let option=0;option<5;option++){
      const weights=symbols.map(x=>x.weights[option]||0),total=weights.reduce((a,b)=>a+b,0),counts=Array(symbols.length).fill(0);
      if(total<=0){results.push({option:option+1,weights,total,samples:0,counts});continue}
      const next=rng((seed+((option+1)*2654435761))>>>0);
      for(let draw=0;draw<samples;draw++){let cursor=next()*total,picked=weights.length-1;for(let i=0;i<weights.length;i++){cursor-=weights[i];if(cursor<0){picked=i;break}}counts[picked]++}
      results.push({option:option+1,weights,total,samples,counts});
    }
    const payload={scope:'local-sandbox-only',mode:'custom-symbol-options',seed,samples,symbols,results,created_at:new Date().toISOString()};
    localStorage.setItem('octopus_symbol_rng_settings',JSON.stringify({seed,samples,symbols}));localStorage.setItem('octopus_symbol_rng_last',JSON.stringify(payload));const applied=$('symbolRngApplied');if(applied)applied.textContent='APPLIED · '+symbols.length+' symbol · konfigurasi custom aktif';renderResult(payload);
  }
  function renderResult(payload){
    const out=$('symbolRngResult');if(!out)return;
    out.innerHTML=payload.results.map(result=>{const body=result.total?result.counts.map((count,i)=>'<tr><td>'+esc(payload.symbols[i].name)+'</td><td>'+result.weights[i]+'</td><td>'+count.toLocaleString()+'</td><td>'+((count/Math.max(1,result.samples))*100).toFixed(2)+'%</td></tr>').join(''):'<tr><td colspan="4">Masukkan bobot lebih dari 0 untuk opsi ini.</td></tr>';return'<div class="rng-option-result"><div class="advanced-title"><strong>Opsi '+result.option+'</strong><span class="count-badge">'+(result.samples?result.samples.toLocaleString()+' DRAW':'NO WEIGHT')+'</span></div><table class="rng-symbol-table"><thead><tr><th>Symbol</th><th>Bobot</th><th>Hasil</th><th>Distribusi</th></tr></thead><tbody>'+body+'</tbody></table></div>'}).join('')+'<p class="field-hint">Analisa ini hanya sampling RNG lokal berbasis bobot. Tidak mengirim konfigurasi atau perubahan hasil ke endpoint game.</p>';
  }
  function bind(){
    if(!$('symbolRngRows'))return;
    $('symbolRngAdd').onclick=()=>{symbols.push({name:'ITEM_'+(symbols.length+1),weights:[1,1,1,1,1]});renderRows()};
    $('symbolRngReset').onclick=()=>{symbols=defaults.map(x=>({name:x.name,weights:x.weights.slice()}));$('symbolRngSeed').value=12345;$('symbolRngSamples').value=10000;renderRows();$('symbolRngResult').innerHTML='<div class="empty-state">Konfigurasi direset ke contoh sandbox.</div>'};
    $('symbolRngRun').onclick=analyze;
    $('symbolRngRows').onclick=e=>{const i=e.target.dataset.remove;if(i!==undefined&&symbols.length>1){symbols.splice(Number(i),1);renderRows()}};
    const saved=localStorage.getItem('octopus_symbol_rng_settings');if(saved)try{const x=JSON.parse(saved);symbols=x.symbols||symbols;$('symbolRngSeed').value=x.seed||12345;$('symbolRngSamples').value=x.samples||10000}catch(e){}
    renderRows();const last=localStorage.getItem('octopus_symbol_rng_last');if(last)try{renderResult(JSON.parse(last))}catch(e){}
  }
  window.OctopusSymbolRng={analyze,readRows,renderRows};bind();
})();
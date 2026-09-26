(()=>{
  const $=id=>document.getElementById(id);
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  function mulberry32(seed){let a=seed>>>0;return()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}}
  function run(options={}){
    const seed=Number.isFinite(Number(options.seed))?Number(options.seed):12345;
    const samples=Math.min(100000,Math.max(1000,Number(options.samples)||10000));
    const buckets=20,counts=Array(buckets).fill(0),rng=mulberry32(seed),values=[];
    let sum=0,min=1,max=0;
    for(let i=0;i<samples;i++){const value=rng();values.push(value);sum+=value;min=Math.min(min,value);max=Math.max(max,value);counts[Math.min(buckets-1,Math.floor(value*buckets))]++}
    const expected=samples/buckets,chiSquare=counts.reduce((x,count)=>x+((count-expected)**2/expected),0),deviation=Math.max(...counts.map(count=>Math.abs(count-expected)/expected));
    return {scope:'local-sandbox-only',seed,samples,buckets,mean:sum/samples,min,max,unique_values:new Set(values).size,counts,expected_per_bucket:expected,chi_square:chiSquare,max_bucket_deviation:deviation,interpretation:'Screening only; a pass does not prove cryptographic randomness or production fairness.'};
  }
  function render(result){
    const out=$('rngAuditResult');if(!out)return;
    const pass=result.max_bucket_deviation<0.25;
    out.innerHTML='<div class="audit-row"><span class="'+(pass?'ok':'warn')+'">'+(pass?'●':'▲')+'</span><span><strong>'+(pass?'Distribusi tampak seimbang':'Perlu investigasi lebih lanjut')+'</strong><br><small>'+esc(result.samples.toLocaleString())+' sampel · chi-square '+result.chi_square.toFixed(2)+' · deviasi bucket '+(result.max_bucket_deviation*100).toFixed(1)+'%</small></span></div><div class="rng-audit-grid"><div><b>Mean</b><span>'+result.mean.toFixed(6)+'</span></div><div><b>Min / Max</b><span>'+result.min.toFixed(6)+' / '+result.max.toFixed(6)+'</span></div><div><b>Unique</b><span>'+result.unique_values.toLocaleString()+'</span></div><div><b>Seed</b><span>'+esc(result.seed)+'</span></div></div><details><summary>Lihat bucket distribusi</summary><pre>'+esc(JSON.stringify(result.counts,null,2))+'</pre></details><p class="field-hint">Ini hanya uji statistik atas generator sandbox lokal. Tool tidak mengubah RNG, hasil, saldo, atau request ke game/link mana pun.</p>';
  }
  function bind(){const button=$('rngAuditBtn');if(!button)return;button.onclick=()=>{const result=run({seed:Number($('rngAuditSeed').value),samples:Number($('rngAuditSamples').value)});render(result);localStorage.setItem('octopus_rng_audit_last',JSON.stringify(result))};const last=localStorage.getItem('octopus_rng_audit_last');if(last)try{render(JSON.parse(last))}catch(e){}}
  window.OctopusRngAudit={run,render};bind();
})();
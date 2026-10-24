const $ = (selector) => document.querySelector(selector);
const state = { products: [], cart: new Map(), currency: 'USD' };
const currency = (cents) => new Intl.NumberFormat('en-US', { style: 'currency', currency: state.currency }).format(cents / 100);
const categoryNames = {music:'Music',books:'Books & Reading',art:'Digital Art & Printables',bundles:'Bundles'};
const el = (tag, cls, content) => { const n = document.createElement(tag); if (cls) n.className = cls; if (content !== undefined) n.textContent = content; return n; };
function renderProducts() {
  const term = $('#search').value.trim().toLowerCase(), category = $('#category').value;
  const shown = state.products.filter(p => (category === 'all' || p.category === category) && [p.title,p.creator,p.description].join(' ').toLowerCase().includes(term));
  $('#resultCount').textContent = `${shown.length} product${shown.length === 1 ? '' : 's'}`;
  const grid = $('#productGrid'); grid.replaceChildren();
  if (!shown.length) { grid.append(el('p', 'demo-note', 'No products match your search.')); return; }
  shown.forEach(p => {
    const card=el('article','product'); const art=el('div','product-art');
    if (p.image && /^assets\/images\/[\w./-]+$/.test(p.image)) { const img=el('img'); img.src=p.image; img.alt=`Cover for ${p.title}`; img.loading='lazy'; art.append(img); } else art.textContent='Artwork coming soon';
    const body=el('div','product-body');body.append(el('span','category',categoryNames[p.category]||p.category),el('h3','',p.title),el('p','creator',p.creator),el('p','description',p.description),el('p','format',p.format));
    const bottom=el('div','bottom');bottom.append(el('strong','price',currency(p.priceCents)));
    const btn=el('button','add',p.status==='draft'?'Add to demo cart':'Add to cart');btn.type='button';btn.addEventListener('click',()=>addToCart(p.id));bottom.append(btn);body.append(bottom);card.append(art,body);grid.append(card);
  });
}
function addToCart(id){const p=state.products.find(x=>x.id===id);if(!p)return;state.cart.set(id,Math.min(99,(state.cart.get(id)||0)+1));renderCart();openCart();}
function renderCart(){const items=$('#cartItems');items.replaceChildren();let subtotal=0,count=0;
  state.cart.forEach((qty,id)=>{const p=state.products.find(x=>x.id===id);if(!p)return;subtotal+=p.priceCents*qty;count+=qty;const line=el('div','cart-line');const detail=el('div');detail.append(el('strong','',p.title),el('small','',`${qty} × ${currency(p.priceCents)}`));const remove=el('button','','Remove');remove.type='button';remove.addEventListener('click',()=>{state.cart.delete(id);renderCart();});line.append(detail,remove);items.append(line);});
  if(!count)items.append(el('p','demo-note','Your cart is empty.'));$('#cartCount').textContent=count;$('#subtotal').textContent=currency(subtotal);
}
function openCart(){ $('#cartPanel').classList.add('open');$('#cartPanel').setAttribute('aria-hidden','false');$('#cartToggle').setAttribute('aria-expanded','true');$('#overlay').hidden=false;$('#cartClose').focus();}
function closeCart(){ $('#cartPanel').classList.remove('open');$('#cartPanel').setAttribute('aria-hidden','true');$('#cartToggle').setAttribute('aria-expanded','false');$('#overlay').hidden=true;$('#cartToggle').focus();}
$('#cartToggle').addEventListener('click',openCart);$('#cartClose').addEventListener('click',closeCart);$('#overlay').addEventListener('click',closeCart);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#cartPanel').classList.contains('open'))closeCart();});$('#search').addEventListener('input',renderProducts);$('#category').addEventListener('change',renderProducts);$('#year').textContent=new Date().getFullYear();
try { const response=await fetch('data/products.json');if(!response.ok)throw new Error(`HTTP ${response.status}`);const data=await response.json();state.products=data.products;state.currency=data.currency;renderProducts();renderCart(); } catch(err) {$('#productGrid').append(el('p','demo-note','Unable to load the catalog. Please serve this site using a local HTTP server or GitHub Pages.'));console.error('Catalog load failed:',err);}

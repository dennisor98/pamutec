'use client';
import { useState, useEffect, useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface AboutContent { id?: number; heading: string; description: string; mission: string; image_url?: string; }
interface Product { id?: number; name: string; description: string; price: string; currency: string; image_url?: string; is_featured?: boolean; sort_order?: number; }
interface CatalogItem { id?: number; category_id: number; name: string; description: string; price: string; currency: string; image_url?: string; }
interface CatalogCategory { id: number; name: string; slug: string; items: CatalogItem[]; }

// ─── Image Upload Helper ──────────────────────────────────────────────────────
function ImageUpload({ value, onChange, label }: { value: string; onChange: (url: string) => void; label: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState('');

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setErr(''); setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      onChange(data.url);
    } catch (e: any) { setErr(e.message); }
    finally { setUploading(false); }
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={styles.label}>{label}</label>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        {value && (
          <div style={{ position: 'relative' }}>
            <img src={value} alt="preview" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, border: '2px solid #e2e8f0' }} />
            <button onClick={() => onChange('')} style={{ position: 'absolute', top: -6, right: -6, background: '#ef4444', color: '#fff', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
          </div>
        )}
        <div style={{ flex: 1 }}>
          <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
          <button onClick={() => inputRef.current?.click()} disabled={uploading} style={{ ...styles.btnSecondary, width: '100%' }}>
            {uploading ? '⏳ Uploading to MinIO…' : '📤 Upload Image'}
          </button>
          {err && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{err}</p>}
          {value && <p style={{ color: '#64748b', fontSize: 11, marginTop: 4, wordBreak: 'break-all' }}>{value}</p>}
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginErr, setLoginErr] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [tab, setTab] = useState<'about' | 'products' | 'catalog' | 'settings'>('about');
  const [isMobile, setIsMobile] = useState(false);

  // About
  const [about, setAbout] = useState<AboutContent>({ heading: '', description: '', mission: '', image_url: '' });
  const [aboutSaving, setAboutSaving] = useState(false);
  const [aboutMsg, setAboutMsg] = useState('');

  // Products
  const [products, setProducts] = useState<Product[]>([]);
  const [prodForm, setProdForm] = useState<Product>({ name: '', description: '', price: '', currency: 'KES', image_url: '', is_featured: true, sort_order: 0 });
  const [editProdId, setEditProdId] = useState<number | null>(null);
  const [prodSaving, setProdSaving] = useState(false);
  const [prodMsg, setProdMsg] = useState('');

  // Catalog
  const [categories, setCategories] = useState<CatalogCategory[]>([]);
  const [selectedCatId, setSelectedCatId] = useState<number | null>(null);
  const [catForm, setCatForm] = useState({ name: '', slug: '' });
  const [itemForm, setItemForm] = useState<CatalogItem>({ category_id: 0, name: '', description: '', price: '', currency: 'KES', image_url: '' });
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [catSaving, setCatSaving] = useState(false);
  const [catMsg, setCatMsg] = useState('');

  // Password Change
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState('');

  // Check session via cookie
  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then(r => {
        if (r.ok) { setAuthed(true); loadAll(); }
      })
      .catch(() => {});
  }, []);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  function loadAll() {
    fetch('/api/about').then(r => r.json()).then(d => { if (d.heading !== undefined) setAbout(d); });
    fetch('/api/products').then(r => r.json()).then(d => { if (Array.isArray(d)) setProducts(d); });
    fetch('/api/catalog/categories').then(r => r.json()).then(d => { if (Array.isArray(d)) { setCategories(d); if (d.length) setSelectedCatId(d[0].id); } });
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoggingIn(true); setLoginErr('');
    try {
      const res = await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }), credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid credentials');
      setAuthed(true); loadAll();
    } catch (e: any) { setLoginErr(e.message); }
    finally { setLoggingIn(false); }
  }

  async function handleLogout() {
    await fetch('/api/auth', { method: 'DELETE', credentials: 'include' });
    setAuthed(false);
  }

  // ── About Save ──────────────────────────────────────────────────────────────
  async function saveAbout() {
    setAboutSaving(true); setAboutMsg('');
    try {
      const res = await fetch('/api/about', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(about), credentials: 'include' });
      if (!res.ok) throw new Error('Save failed');
      setAboutMsg('✅ Saved successfully!');
    } catch { setAboutMsg('❌ Save failed'); }
    finally { setAboutSaving(false); setTimeout(() => setAboutMsg(''), 3000); }
  }

  // ── Product CRUD ────────────────────────────────────────────────────────────
  async function saveProduct() {
    setProdSaving(true); setProdMsg('');
    try {
      const method = editProdId ? 'PUT' : 'POST';
      const url = editProdId ? `/api/products/${editProdId}` : '/api/products';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(prodForm), credentials: 'include' });
      if (!res.ok) throw new Error('Save failed');
      const saved = await res.json();
      if (editProdId) setProducts(p => p.map(x => x.id === editProdId ? saved : x));
      else setProducts(p => [...p, saved]);
      setProdForm({ name: '', description: '', price: '', currency: 'KES', image_url: '', is_featured: true, sort_order: 0 });
      setEditProdId(null);
      setProdMsg('✅ Product saved!');
    } catch { setProdMsg('❌ Save failed'); }
    finally { setProdSaving(false); setTimeout(() => setProdMsg(''), 3000); }
  }

  async function deleteProduct(id: number) {
    if (!confirm('Delete this product?')) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE', credentials: 'include' });
    setProducts(p => p.filter(x => x.id !== id));
  }

  function editProduct(p: Product) {
    setEditProdId(p.id!);
    setProdForm({ ...p, price: p.price?.toString() || '' });
  }

  // ── Catalog CRUD ────────────────────────────────────────────────────────────
  async function addCategory() {
    if (!catForm.name || !catForm.slug) return;
    const res = await fetch('/api/catalog/categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(catForm), credentials: 'include' });
    const cat = await res.json();
    setCategories(c => [...c, { ...cat, items: [] }]);
    setSelectedCatId(cat.id);
    setCatForm({ name: '', slug: '' });
  }

  async function deleteCategory(id: number) {
    if (!confirm('Delete this category and all its items?')) return;
    await fetch(`/api/catalog/categories/${id}`, { method: 'DELETE', credentials: 'include' });
    setCategories(c => c.filter(x => x.id !== id));
    setSelectedCatId(categories.find(x => x.id !== id)?.id || null);
  }

  async function saveItem() {
    setCatSaving(true); setCatMsg('');
    try {
      const payload = { ...itemForm, category_id: selectedCatId! };
      const method = editItemId ? 'PUT' : 'POST';
      const url = editItemId ? `/api/catalog/items/${editItemId}` : '/api/catalog/items';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), credentials: 'include' });
      if (!res.ok) throw new Error('Save failed');
      const saved = await res.json();
      setCategories(cats => cats.map(cat => {
        if (cat.id !== selectedCatId) return cat;
        const items = editItemId ? cat.items.map(i => i.id === editItemId ? saved : i) : [...cat.items, saved];
        return { ...cat, items };
      }));
      setItemForm({ category_id: selectedCatId!, name: '', description: '', price: '', currency: 'KES', image_url: '' });
      setEditItemId(null);
      setCatMsg('✅ Item saved!');
    } catch { setCatMsg('❌ Save failed'); }
    finally { setCatSaving(false); setTimeout(() => setCatMsg(''), 3000); }
  }

  async function deleteItem(id: number) {
    if (!confirm('Delete this item?')) return;
    await fetch(`/api/catalog/items/${id}`, { method: 'DELETE', credentials: 'include' });
    setCategories(cats => cats.map(cat => ({ ...cat, items: cat.items.filter(i => i.id !== id) })));
  }

  function editItem(item: CatalogItem) {
    setEditItemId(item.id!);
    setItemForm({ ...item, price: item.price?.toString() || '' });
  }

  // ── Password Change ───────────────────────────────────────────────────────────
  async function changePassword() {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordMsg('❌ All fields are required');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMsg('❌ New passwords do not match');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordMsg('❌ New password must be at least 6 characters');
      return;
    }

    setPasswordSaving(true); setPasswordMsg('');
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        }),
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Password change failed');
      setPasswordMsg('✅ Password changed successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (e: any) { setPasswordMsg(`❌ ${e.message}`); }
    finally { setPasswordSaving(false); setTimeout(() => setPasswordMsg(''), 3000); }
  }

  // ─── Login Screen ───────────────────────────────────────────────────────────
  if (!authed) return (
    <div style={styles.loginBg}>
      <div style={{ ...styles.loginCard, ...(isMobile ? styles.loginCardMobile : {}) }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>☀️</div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#1e293b' }}>Admin Dashboard</h1>
          <p style={{ margin: '6px 0 0', color: '#64748b', fontSize: 14 }}>Seven SS Stars Solar</p>
        </div>
        <form onSubmit={handleLogin}>
          <label style={styles.label}>Username</label>
          <input style={styles.input} value={username} onChange={e => setUsername(e.target.value)} placeholder="admin" required autoFocus />
          <label style={styles.label}>Password</label>
          <input style={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          {loginErr && <div style={styles.errorBox}>{loginErr}</div>}
          <button style={styles.btnPrimary} type="submit" disabled={loggingIn}>
            {loggingIn ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: '#94a3b8' }}>
          Admin access only · Secured with JWT
        </p>
      </div>
    </div>
  );

  const selectedCat = categories.find(c => c.id === selectedCatId);

  // ─── Admin Dashboard ────────────────────────────────────────────────────────
  return (
    <div style={styles.dashBg}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside style={styles.sidebar}>
          <div style={{ padding: '24px 20px', borderBottom: '1px solid #1e3a5f' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>☀️</div>
            <div style={{ fontWeight: 800, fontSize: 15, color: '#fff' }}>Seven SS Stars</div>
            <div style={{ fontSize: 11, color: '#93c5fd', marginTop: 2 }}>CMS Dashboard</div>
          </div>
          <nav style={{ padding: '16px 12px', flex: 1 }}>
            {([['about', '📝', 'About Section'], ['products', '📦', 'Products'], ['catalog', '🗂️', 'Catalog'], ['settings', '⚙️', 'Settings']] as const).map(([key, icon, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                style={{ ...styles.sidebarBtn, ...(tab === key ? styles.sidebarBtnActive : {}) }}
              >
                <span style={{ fontSize: 18 }}>{icon}</span>
                <span>{label}</span>
              </button>
            ))}
          </nav>
          <div style={{ padding: '16px 12px', borderTop: '1px solid #1e3a5f' }}>
            <button onClick={handleLogout} style={styles.logoutBtn}>🚪 Sign Out</button>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main style={{ ...styles.main, ...(isMobile ? styles.mainMobile : {}) }}>
        {/* ── ABOUT TAB ── */}
        {tab === 'about' && (
          <div>
            <h2 style={styles.pageTitle}>📝 About Section</h2>
            <p style={styles.pageDesc}>Edit the content shown in the About Us section on the homepage.</p>
            <div style={styles.card}>
              <label style={styles.label}>Heading</label>
              <input style={styles.input} value={about.heading} onChange={e => setAbout(a => ({ ...a, heading: e.target.value }))} placeholder="About Seven SS Stars Solar" />
              <label style={styles.label}>Description</label>
              <textarea style={{ ...styles.input, height: 120, resize: 'vertical' }} value={about.description} onChange={e => setAbout(a => ({ ...a, description: e.target.value }))} placeholder="Company description..." />
              <label style={styles.label}>Mission Statement</label>
              <textarea style={{ ...styles.input, height: 100, resize: 'vertical' }} value={about.mission} onChange={e => setAbout(a => ({ ...a, mission: e.target.value }))} placeholder="Our mission..." />
              <ImageUpload label="About Image" value={about.image_url || ''} onChange={url => setAbout(a => ({ ...a, image_url: url }))} />
              {aboutMsg && <div style={aboutMsg.startsWith('✅') ? styles.successBox : styles.errorBox}>{aboutMsg}</div>}
              <button style={styles.btnPrimary} onClick={saveAbout} disabled={aboutSaving}>
                {aboutSaving ? 'Saving…' : '💾 Save About Content'}
              </button>
            </div>
          </div>
        )}

        {/* ── PRODUCTS TAB ── */}
        {tab === 'products' && (
          <div>
            <h2 style={styles.pageTitle}>📦 Products</h2>
            <p style={styles.pageDesc}>Manage featured products shown on the homepage.</p>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 24 }}>
              {/* Form */}
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>{editProdId ? '✏️ Edit Product' : '➕ Add Product'}</h3>
                <label style={styles.label}>Name *</label>
                <input style={styles.input} value={prodForm.name} onChange={e => setProdForm(f => ({ ...f, name: e.target.value }))} placeholder="Product name" />
                <label style={styles.label}>Description</label>
                <textarea style={{ ...styles.input, height: 90, resize: 'vertical' }} value={prodForm.description} onChange={e => setProdForm(f => ({ ...f, description: e.target.value }))} placeholder="Product description..." />
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={styles.label}>Price</label>
                    <input style={styles.input} type="number" value={prodForm.price} onChange={e => setProdForm(f => ({ ...f, price: e.target.value }))} placeholder="0.00" />
                  </div>
                  <div>
                    <label style={styles.label}>Currency</label>
                    <select style={styles.input} value={prodForm.currency} onChange={e => setProdForm(f => ({ ...f, currency: e.target.value }))}>
                      <option>KES</option><option>USD</option><option>EUR</option>
                    </select>
                  </div>
                </div>
                <label style={styles.label}>Display Order</label>
                <input style={styles.input} type="number" value={prodForm.sort_order} onChange={e => setProdForm(f => ({ ...f, sort_order: Number(e.target.value) }))} />
                <ImageUpload label="Product Image" value={prodForm.image_url || ''} onChange={url => setProdForm(f => ({ ...f, image_url: url }))} />
                {prodMsg && <div style={prodMsg.startsWith('✅') ? styles.successBox : styles.errorBox}>{prodMsg}</div>}
                <div style={{ display: 'flex', gap: 10 }}>
                  <button style={styles.btnPrimary} onClick={saveProduct} disabled={prodSaving}>
                    {prodSaving ? 'Saving…' : editProdId ? '💾 Update' : '➕ Add Product'}
                  </button>
                  {editProdId && <button style={styles.btnSecondary} onClick={() => { setEditProdId(null); setProdForm({ name: '', description: '', price: '', currency: 'KES', image_url: '', is_featured: true, sort_order: 0 }); }}>Cancel</button>}
                </div>
              </div>

              {/* List */}
              <div>
                <h3 style={styles.cardTitle}>All Products ({products.length})</h3>
                {products.length === 0 && <div style={styles.emptyState}>No products yet. Add one →</div>}
                <div style={{ maxHeight: 500, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingRight: 8 }}>
                  {products.map(p => (
                    <div key={p.id} style={styles.listItem}>
                      {p.image_url && <img src={p.image_url} alt={p.name} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />}
                      {!p.image_url && <div style={{ width: 56, height: 56, background: '#f1f5f9', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>📦</div>}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                        <div style={{ fontSize: 13, color: '#059669', fontWeight: 600 }}>
                          {p.price ? `${p.currency} ${Number(p.price).toLocaleString()}` : 'No price set'}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button style={styles.iconBtnEdit} onClick={() => editProduct(p)}>✏️</button>
                        <button style={styles.iconBtnDel} onClick={() => deleteProduct(p.id!)}>🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── CATALOG TAB ── */}
        {tab === 'catalog' && (
          <div>
            <h2 style={styles.pageTitle}>🗂️ Catalog</h2>
            <p style={styles.pageDesc}>Manage catalog categories and items with images, descriptions, and prices.</p>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '280px 1fr', gap: 24, alignItems: 'start' }}>
              {/* Categories sidebar */}
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Categories</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                  {categories.map(cat => (
                    <div key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <button onClick={() => setSelectedCatId(cat.id)} style={{ ...styles.catBtn, ...(selectedCatId === cat.id ? styles.catBtnActive : {}) }}>
                        {cat.name} <span style={{ fontSize: 11, opacity: 0.7 }}>({cat.items.length})</span>
                      </button>
                      <button style={styles.iconBtnDel} onClick={() => deleteCategory(cat.id)}>🗑️</button>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 8 }}>Add Category</p>
                  <input style={{ ...styles.input, marginBottom: 8 }} value={catForm.name} onChange={e => setCatForm(f => ({ ...f, name: e.target.value }))} placeholder="Category name" />
                  <input style={{ ...styles.input, marginBottom: 8 }} value={catForm.slug} onChange={e => setCatForm(f => ({ ...f, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))} placeholder="category-slug" />
                  <button style={{ ...styles.btnPrimary, width: '100%', fontSize: 13 }} onClick={addCategory}>➕ Add Category</button>
                </div>
              </div>

              {/* Items panel */}
              <div>
                {selectedCat ? (
                  <>
                    <h3 style={styles.cardTitle}>
                      {selectedCat.name} — Items ({selectedCat.items.length})
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20 }}>
                      {/* Item form */}
                      <div style={styles.card}>
                        <h4 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: '#1e293b' }}>
                          {editItemId ? '✏️ Edit Item' : '➕ Add Item'}
                        </h4>
                        <label style={styles.label}>Name *</label>
                        <input style={styles.input} value={itemForm.name} onChange={e => setItemForm(f => ({ ...f, name: e.target.value }))} placeholder="Item name" />
                        <label style={styles.label}>Description</label>
                        <textarea style={{ ...styles.input, height: 80, resize: 'vertical' }} value={itemForm.description} onChange={e => setItemForm(f => ({ ...f, description: e.target.value }))} placeholder="Item description..." />
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 10 }}>
                          <div>
                            <label style={styles.label}>Price</label>
                            <input style={styles.input} type="number" value={itemForm.price} onChange={e => setItemForm(f => ({ ...f, price: e.target.value }))} placeholder="0.00" />
                          </div>
                          <div>
                            <label style={styles.label}>Currency</label>
                            <select style={styles.input} value={itemForm.currency} onChange={e => setItemForm(f => ({ ...f, currency: e.target.value }))}>
                              <option>KES</option><option>USD</option><option>EUR</option>
                            </select>
                          </div>
                        </div>
                        <ImageUpload label="Item Image" value={itemForm.image_url || ''} onChange={url => setItemForm(f => ({ ...f, image_url: url }))} />
                        {catMsg && <div style={catMsg.startsWith('✅') ? styles.successBox : styles.errorBox}>{catMsg}</div>}
                        <div style={{ display: 'flex', gap: 10 }}>
                          <button style={styles.btnPrimary} onClick={saveItem} disabled={catSaving}>
                            {catSaving ? 'Saving…' : editItemId ? '💾 Update' : '➕ Add'}
                          </button>
                          {editItemId && <button style={styles.btnSecondary} onClick={() => { setEditItemId(null); setItemForm({ category_id: selectedCatId!, name: '', description: '', price: '', currency: 'KES', image_url: '' }); }}>Cancel</button>}
                        </div>
                      </div>

                      {/* Items list */}
                      <div style={{ maxHeight: 500, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingRight: 8 }}>
                        {selectedCat.items.length === 0 && <div style={styles.emptyState}>No items in this category yet.</div>}
                        {selectedCat.items.map(item => (
                          <div key={item.id} style={styles.listItem}>
                            {item.image_url
                              ? <img src={item.image_url} alt={item.name} style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
                              : <div style={{ width: 52, height: 52, background: '#f1f5f9', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🖼️</div>
                            }
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: 700, fontSize: 13, color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                              <div style={{ fontSize: 12, color: '#059669', fontWeight: 600 }}>
                                {item.price ? `${item.currency} ${Number(item.price).toLocaleString()}` : 'No price'}
                              </div>
                              {item.description && <div style={{ fontSize: 11, color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.description}</div>}
                            </div>
                            <div style={{ display: 'flex', gap: 6 }}>
                              <button style={styles.iconBtnEdit} onClick={() => editItem(item)}>✏️</button>
                              <button style={styles.iconBtnDel} onClick={() => deleteItem(item.id!)}>🗑️</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={styles.emptyState}>Select or create a category to manage items.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── SETTINGS TAB ── */}
        {tab === 'settings' && (
          <div>
            <h2 style={styles.pageTitle}>⚙️ Settings</h2>
            <p style={styles.pageDesc}>Manage your account settings and security.</p>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Change Password</h3>
              <label style={styles.label}>Current Password *</label>
              <input
                style={styles.input}
                type="password"
                value={passwordForm.currentPassword}
                onChange={e => setPasswordForm(f => ({ ...f, currentPassword: e.target.value }))}
                placeholder="Enter your current password"
              />
              <label style={styles.label}>New Password *</label>
              <input
                style={styles.input}
                type="password"
                value={passwordForm.newPassword}
                onChange={e => setPasswordForm(f => ({ ...f, newPassword: e.target.value }))}
                placeholder="Enter new password (min. 6 characters)"
              />
              <label style={styles.label}>Confirm New Password *</label>
              <input
                style={styles.input}
                type="password"
                value={passwordForm.confirmPassword}
                onChange={e => setPasswordForm(f => ({ ...f, confirmPassword: e.target.value }))}
                placeholder="Confirm new password"
              />
              {passwordMsg && <div style={passwordMsg.startsWith('✅') ? styles.successBox : styles.errorBox}>{passwordMsg}</div>}
              <button
                style={styles.btnPrimary}
                onClick={changePassword}
                disabled={passwordSaving}
              >
                {passwordSaving ? 'Changing…' : '🔒 Change Password'}
              </button>
            </div>
          </div>
        )}

        {/* Mobile Bottom Navigation */}
        {isMobile && (
          <div style={styles.mobileBottomNav}>
            {([['about', '📝'], ['products', '📦'], ['catalog', '🗂️'], ['settings', '⚙️']] as const).map(([key, icon]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                style={{ ...styles.mobileNavBtn, ...(tab === key ? styles.mobileNavBtnActive : {}) }}
              >
                <span style={{ fontSize: 20 }}>{icon}</span>
                <span style={{ fontSize: 10, fontWeight: 600, marginTop: 2 }}>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
              </button>
            ))}
            <button onClick={handleLogout} style={styles.mobileNavBtn}>
              <span style={{ fontSize: 20 }}>🚪</span>
              <span style={{ fontSize: 10, fontWeight: 600, marginTop: 2 }}>Logout</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  loginBg: { minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 },
  loginCard: { background: '#fff', borderRadius: 20, padding: 40, width: '100%', maxWidth: 400, boxShadow: '0 25px 60px rgba(0,0,0,0.35)' },
  loginCardMobile: { padding: 24 },
  mainMobile: { padding: '16px 16px 80px 16px' },
  mobileBottomNav: { position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-around', padding: '8px 0', background: '#fff', borderTop: '1px solid #e2e8f0', boxShadow: '0 -2px 10px rgba(0,0,0,0.05)', zIndex: 50 },
  mobileNavBtn: { display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: '8px 16px', minWidth: 60 },
  mobileNavBtnActive: { color: '#f59e0b' },
  dashBg: { display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif' },
  sidebar: { width: 220, background: 'linear-gradient(180deg, #0f172a 0%, #1e3a5f 100%)', display: 'flex', flexDirection: 'column', flexShrink: 0, position: 'sticky', top: 0, height: '100vh' },
  sidebarBtn: { display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '11px 14px', background: 'transparent', border: 'none', borderRadius: 10, color: '#93c5fd', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 4, transition: 'all 0.2s' },
  sidebarBtnActive: { background: 'rgba(255,255,255,0.12)', color: '#fff' },
  logoutBtn: { display: 'block', width: '100%', padding: '10px 14px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, color: '#fca5a5', fontSize: 13, fontWeight: 600, cursor: 'pointer' },
  main: { flex: 1, padding: 32, overflowY: 'auto' },
  pageTitle: { margin: '0 0 6px', fontSize: 24, fontWeight: 800, color: '#1e293b' },
  pageDesc: { margin: '0 0 28px', fontSize: 14, color: '#64748b' },
  cardTitle: { margin: '0 0 20px', fontSize: 16, fontWeight: 700, color: '#1e293b' },
  card: { background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' },
  label: { display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
  input: { display: 'block', width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14, color: '#1e293b', background: '#f8fafc', marginBottom: 14, boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' },
  btnPrimary: { display: 'block', width: '100%', padding: '12px 20px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 8px rgba(245,158,11,0.3)' },
  btnSecondary: { display: 'block', width: '100%', padding: '11px 20px', background: '#f1f5f9', border: '1.5px solid #e2e8f0', borderRadius: 10, color: '#475569', fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  errorBox: { padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, color: '#dc2626', fontSize: 13, marginBottom: 14 },
  successBox: { padding: '10px 14px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, color: '#16a34a', fontSize: 13, marginBottom: 14 },
  listItem: { display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' },
  iconBtnEdit: { padding: '6px 8px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, cursor: 'pointer', fontSize: 14 },
  iconBtnDel: { padding: '6px 8px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, cursor: 'pointer', fontSize: 14 },
  emptyState: { padding: '32px 20px', textAlign: 'center', color: '#94a3b8', fontSize: 14, background: '#f8fafc', borderRadius: 12, border: '2px dashed #e2e8f0' },
  catBtn: { flex: 1, textAlign: 'left', padding: '9px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#475569', cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  catBtnActive: { background: '#eff6ff', border: '1.5px solid #3b82f6', color: '#1d4ed8' },
};

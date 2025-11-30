"use client";

import { useState, useEffect } from "react";
import { loginUser, changePassword } from "./actions";
import { Category, Product, Subcategory } from "@/types";
import Image from "next/image";
import { sha256 } from "@/lib/crypto";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"categories" | "subcategories" | "products">("categories");
  const [searchTerm, setSearchTerm] = useState("");

  // Change Password State
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Data State
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  
  // Form State
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const [editingSubcategory, setEditingSubcategory] = useState<Partial<Subcategory> | null>(null);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const storedUsername = localStorage.getItem("admin_username");
      const storedHash = localStorage.getItem("admin_password_hash");
      
      if (storedUsername && storedHash) {
        const res = await loginUser(storedUsername, storedHash);
        if (res.success) {
          setIsAuthenticated(true);
          setUsername(storedUsername);
          fetchData();
        }
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const passwordHash = await sha256(password);
      const res = await loginUser(username, passwordHash);
      
      if (res.success) {
        setIsAuthenticated(true);
        localStorage.setItem("admin_username", username);
        localStorage.setItem("admin_password_hash", passwordHash);
        fetchData();
      } else {
        alert(res.message || "Giriş başarısız!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (confirm("Çıkış yapmak istediğinize emin misiniz?")) {
      localStorage.removeItem("admin_username");
      localStorage.removeItem("admin_password_hash");
      setIsAuthenticated(false);
      setUsername("");
      setPassword("");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Yeni şifreler eşleşmiyor!");
      return;
    }

    try {
      const oldHash = await sha256(oldPassword);
      const newHash = await sha256(newPassword);
      
      const res = await changePassword(username, oldHash, newHash);
      
      if (res.success) {
        alert("Şifre başarıyla güncellendi. Lütfen tekrar giriş yapın.");
        localStorage.setItem("admin_password_hash", newHash); // Update stored hash
        setIsChangePasswordOpen(false);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(res.message || "Şifre değiştirilemedi.");
      }
    } catch (error) {
      console.error("Password change error:", error);
      alert("Bir hata oluştu.");
    }
  };

  const fetchData = async () => {
    setDataLoading(true);
    try {
      const [catsRes, subcatsRes, prodsRes] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/subcategories"),
        fetch("/api/products"),
      ]);
      if (catsRes.ok) setCategories(await catsRes.json());
      if (subcatsRes.ok) setSubcategories(await subcatsRes.json());
      if (prodsRes.ok) setProducts(await prodsRes.json());
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    } finally {
      setDataLoading(false);
    }
  };

  // --- Category Operations ---
  const saveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    const method = editingCategory.id ? "PUT" : "POST";
    const res = await fetch("/api/categories", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingCategory),
    });

    if (res.ok) {
      setIsModalOpen(false);
      setEditingCategory(null);
      fetchData();
    } else {
      alert("Hata oluştu");
    }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Bu kategoriyi silmek istediğine emin misin?")) return;
    await fetch(`/api/categories?id=${id}`, { method: "DELETE" });
    fetchData();
  };

  // --- Subcategory Operations ---
  const saveSubcategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubcategory) return;

    const method = editingSubcategory.id ? "PUT" : "POST";
    const res = await fetch("/api/subcategories", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingSubcategory),
    });

    if (res.ok) {
      setIsModalOpen(false);
      setEditingSubcategory(null);
      fetchData();
    } else {
      alert("Hata oluştu");
    }
  };

  const deleteSubcategory = async (id: string) => {
    if (!confirm("Bu alt başlığı silmek istediğine emin misin?")) return;
    await fetch(`/api/subcategories?id=${id}`, { method: "DELETE" });
    fetchData();
  };

  // --- Product Operations ---
  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const productToSave = { ...editingProduct };
    // Default image if none selected
    if (!productToSave.image_url) {
      productToSave.image_url = "https://cldjoahajslsvbtskzvl.supabase.co/storage/v1/object/public/menu-images/1764468035699.jpg";
    }

    const method = productToSave.id ? "PUT" : "POST";
    const res = await fetch("/api/products", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productToSave),
    });

    if (res.ok) {
      setIsModalOpen(false);
      setEditingProduct(null);
      fetchData();
    } else {
      alert("Hata oluştu");
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Bu ürünü silmek istediğine emin misin?")) return;
    await fetch(`/api/products?id=${id}`, { method: "DELETE" });
    fetchData();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const { url } = await res.json();
      setEditingProduct((prev) => ({ ...prev, image_url: url }));
    } else {
      alert("Resim yüklenemedi");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-primary/10">
          <h1 className="text-2xl font-bold text-primary mb-6 text-center font-serif">Admin Girişi</h1>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Kullanıcı Adı"
            className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifre"
            className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-bold"
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-primary-dark font-serif">Admin Paneli</h1>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsChangePasswordOpen(true)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
            >
              Şifre Değiştir
            </button>
            <button 
              onClick={handleLogout} 
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
            >
              Çıkış Yap
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto pb-2 mb-8 border-b border-gray-200 gap-2 md:gap-4 no-scrollbar">
          <button
            onClick={() => setActiveTab("categories")}
            className={`pb-2 px-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === "categories"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            Kategoriler
          </button>
          <button
            onClick={() => setActiveTab("subcategories")}
            className={`pb-2 px-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === "subcategories"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            Alt Başlıklar
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`pb-2 px-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === "products"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            Ürünler
          </button>
        </div>

        {/* Content */}
        {dataLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : activeTab === "categories" ? (
          <div>
            <button
              onClick={() => {
                setEditingCategory({});
                setIsModalOpen(true);
              }}
              className="bg-primary text-white px-4 py-2 rounded-lg mb-4 hover:bg-primary-dark transition-colors w-full md:w-auto"
            >
              + Yeni Kategori
            </button>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="p-4">Sıra</th>
                    <th className="p-4">Ad</th>
                    <th className="p-4">Slug</th>
                    <th className="p-4 text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-gray-50">
                      <td className="p-4">{cat.order_index}</td>
                      <td className="p-4 font-medium">{cat.name}</td>
                      <td className="p-4 text-gray-500">{cat.slug}</td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingCategory(cat);
                            setIsModalOpen(true);
                          }}
                          className="text-blue-600 hover:underline"
                        >
                          Düzenle
                        </button>
                        <button
                          onClick={() => deleteCategory(cat.id)}
                          className="text-red-600 hover:underline"
                        >
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === "subcategories" ? (
          <div>
            <button
              onClick={() => {
                setEditingSubcategory({});
                setIsModalOpen(true);
              }}
              className="bg-primary text-white px-4 py-2 rounded-lg mb-4 hover:bg-primary-dark transition-colors w-full md:w-auto"
            >
              + Yeni Alt Başlık
            </button>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="p-4">Sıra</th>
                    <th className="p-4">Ad</th>
                    <th className="p-4">Kategori</th>
                    <th className="p-4 text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {subcategories.map((sub) => {
                    const parentCat = categories.find(c => c.id === sub.category_id);
                    return (
                      <tr key={sub.id} className="hover:bg-gray-50">
                        <td className="p-4">{sub.order_index}</td>
                        <td className="p-4 font-medium">{sub.name}</td>
                        <td className="p-4 text-gray-500">{parentCat?.name || "Bilinmiyor"}</td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              setEditingSubcategory(sub);
                              setIsModalOpen(true);
                            }}
                            className="text-blue-600 hover:underline"
                          >
                            Düzenle
                          </button>
                          <button
                            onClick={() => deleteSubcategory(sub.id)}
                            className="text-red-600 hover:underline"
                          >
                            Sil
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
              <button
                onClick={() => {
                  setEditingProduct({ is_active: true, currency: "₺" });
                  setIsModalOpen(true);
                }}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors w-full md:w-auto"
              >
                + Yeni Ürün
              </button>
              <input
                type="text"
                placeholder="Ürün ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full md:w-64 focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter(prod => prod.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((prod) => (
                <div key={prod.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden relative flex-shrink-0">
                    {prod.image_url ? (
                      <Image src={prod.image_url} alt={prod.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Img</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{prod.name}</h3>
                    <p className="text-sm text-gray-500">{prod.price} {prod.currency}</p>
                    <div className="mt-2 flex gap-2 text-sm">
                      <button
                        onClick={() => {
                          setEditingProduct(prod);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        Düzenle
                      </button>
                      <button
                        onClick={() => deleteProduct(prod.id)}
                        className="text-red-600 hover:underline"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4 text-primary-dark">
                {activeTab === "categories"
                  ? (editingCategory?.id ? "Kategori Düzenle" : "Yeni Kategori")
                  : activeTab === "subcategories"
                  ? (editingSubcategory?.id ? "Alt Başlık Düzenle" : "Yeni Alt Başlık")
                  : (editingProduct?.id ? "Ürün Düzenle" : "Yeni Ürün")}
              </h2>
              
              {activeTab === "categories" ? (
                <form onSubmit={saveCategory} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Kategori Adı</label>
                    <input
                      className="w-full border rounded p-2"
                      value={editingCategory?.name || ""}
                      onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Slug otomatik oluşturulacaktır.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Sıra</label>
                    <input
                      type="number"
                      className="w-full border rounded p-2"
                      value={editingCategory?.order_index || 0}
                      onChange={(e) => setEditingCategory({ ...editingCategory, order_index: Number(e.target.value) })}
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">İptal</button>
                    <button type="submit" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">Kaydet</button>
                  </div>
                </form>
              ) : activeTab === "subcategories" ? (
                <form onSubmit={saveSubcategory} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Alt Başlık Adı</label>
                    <input
                      className="w-full border rounded p-2"
                      value={editingSubcategory?.name || ""}
                      onChange={(e) => setEditingSubcategory({ ...editingSubcategory, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Kategori</label>
                    <select
                      className="w-full border rounded p-2"
                      value={editingSubcategory?.category_id || ""}
                      onChange={(e) => setEditingSubcategory({ ...editingSubcategory, category_id: e.target.value })}
                      required
                    >
                      <option value="">Seçiniz...</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Sıra</label>
                    <input
                      type="number"
                      className="w-full border rounded p-2"
                      value={editingSubcategory?.order_index || 0}
                      onChange={(e) => setEditingSubcategory({ ...editingSubcategory, order_index: Number(e.target.value) })}
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">İptal</button>
                    <button type="submit" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">Kaydet</button>
                  </div>
                </form>
              ) : (
                <form onSubmit={saveProduct} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Ürün Adı</label>
                    <input
                      className="w-full border rounded p-2"
                      value={editingProduct?.name || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Kategori</label>
                    <select
                      className="w-full border rounded p-2"
                      value={editingProduct?.category_id || ""}
                      onChange={(e) => {
                        setEditingProduct({ 
                          ...editingProduct, 
                          category_id: e.target.value,
                          subcategory_id: "" // Reset subcategory when category changes
                        });
                      }}
                      required
                    >
                      <option value="">Seçiniz...</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Alt Başlık</label>
                    <select
                      className="w-full border rounded p-2"
                      value={editingProduct?.subcategory_id || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, subcategory_id: e.target.value })}
                      required
                      disabled={!editingProduct?.category_id}
                    >
                      <option value="">Seçiniz...</option>
                      {subcategories
                        .filter(s => s.category_id === editingProduct?.category_id)
                        .map(s => <option key={s.id} value={s.id}>{s.name}</option>)
                      }
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Ürünleri gruplamak için kullanılır.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Açıklama</label>
                    <textarea
                      className="w-full border rounded p-2"
                      value={editingProduct?.description || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Fiyat</label>
                      <input
                        type="number"
                        step="0.01"
                        className="w-full border rounded p-2"
                        value={editingProduct?.price || 0}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Para Birimi</label>
                      <input
                        className="w-full border rounded p-2"
                        value={editingProduct?.currency || "₺"}
                        onChange={(e) => setEditingProduct({ ...editingProduct, currency: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Resim</label>
                    <div className="flex items-center gap-4">
                      {editingProduct?.image_url && (
                        <div className="w-16 h-16 relative rounded overflow-hidden bg-gray-100 border border-gray-200">
                          <Image src={editingProduct.image_url} alt="Preview" fill className="object-cover" />
                        </div>
                      )}
                      <label className="cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        <span>Fotoğraf Yükle</span>
                        <input type="file" onChange={handleImageUpload} accept="image/*" className="hidden" />
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={editingProduct?.is_active ?? true}
                      onChange={(e) => setEditingProduct({ ...editingProduct, is_active: e.target.checked })}
                    />
                    <label htmlFor="isActive" className="text-sm">Aktif mi?</label>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">İptal</button>
                    <button type="submit" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">Kaydet</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Change Password Modal */}
        {isChangePasswordOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4 text-primary-dark">Şifre Değiştir</h2>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Eski Şifre</label>
                  <input
                    type="password"
                    className="w-full border rounded p-2"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Yeni Şifre</label>
                  <input
                    type="password"
                    className="w-full border rounded p-2"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Yeni Şifre (Tekrar)</label>
                  <input
                    type="password"
                    className="w-full border rounded p-2"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button type="button" onClick={() => setIsChangePasswordOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">İptal</button>
                  <button type="submit" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">Kaydet</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

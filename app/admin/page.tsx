"use client";

import { useState, useEffect } from "react";
import { verifyPassword } from "./actions";
import { Category, Product } from "@/types";
import Image from "next/image";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false); // Yeni loading state
  const [activeTab, setActiveTab] = useState<"categories" | "products">("categories");

  // Data State
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  
  // Form State
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const isValid = await verifyPassword(password);
    if (isValid) {
      setIsAuthenticated(true);
      localStorage.setItem("admin_auth", "true");
      fetchData();
    } else {
      alert("Hatalı şifre!");
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
  };

  const fetchData = async () => {
    setDataLoading(true);
    try {
      const [catsRes, prodsRes] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/products"),
      ]);
      if (catsRes.ok) setCategories(await catsRes.json());
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

  // --- Product Operations ---
  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const method = editingProduct.id ? "PUT" : "POST";
    const res = await fetch("/api/products", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingProduct),
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifre"
            className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-primary focus:outline-none"
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
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary-dark font-serif">Admin Paneli</h1>
          <button onClick={handleLogout} className="text-red-500 hover:text-red-700 underline">
            Çıkış Yap
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("categories")}
            className={`pb-2 px-4 font-medium transition-colors ${
              activeTab === "categories"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            Kategoriler
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`pb-2 px-4 font-medium transition-colors ${
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
              className="bg-primary text-white px-4 py-2 rounded-lg mb-4 hover:bg-primary-dark transition-colors"
            >
              + Yeni Kategori
            </button>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <table className="w-full text-left">
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
        ) : (
          <div>
            <button
              onClick={() => {
                setEditingProduct({ is_active: true, currency: "₺" });
                setIsModalOpen(true);
              }}
              className="bg-primary text-white px-4 py-2 rounded-lg mb-4 hover:bg-primary-dark transition-colors"
            >
              + Yeni Ürün
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
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
                  {/* Slug input kaldırıldı */}
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
                      onChange={(e) => setEditingProduct({ ...editingProduct, category_id: e.target.value })}
                      required
                    >
                      <option value="">Seçiniz...</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
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
                        <div className="w-16 h-16 relative rounded overflow-hidden bg-gray-100">
                          <Image src={editingProduct.image_url} alt="Preview" fill className="object-cover" />
                        </div>
                      )}
                      <input type="file" onChange={handleImageUpload} accept="image/*" className="text-sm" />
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
      </div>
    </div>
  );
}

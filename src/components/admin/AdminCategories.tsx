import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Layers, X, AlertCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Category } from '../../types';
import { DynamicIcon, AVAILABLE_CATEGORY_ICONS } from '../../utils/iconHelper';

export const AdminCategories: React.FC = () => {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCatId, setDeletingCatId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [icon, setIcon] = useState('Laptop');
  const [description, setDescription] = useState('');
  const [bannerImage, setBannerImage] = useState('');

  const openAddModal = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setIcon('Laptop');
    setDescription('');
    setBannerImage('https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80');
    setIsModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setIcon(cat.icon);
    setDescription(cat.description);
    setBannerImage(cat.bannerImage || '');
    setIsModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingCategory) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      icon,
      description,
      bannerImage,
      displayOrder: editingCategory ? editingCategory.displayOrder : categories.length + 1,
    };

    if (editingCategory) {
      updateCategory(editingCategory.id, payload);
    } else {
      addCategory(payload);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
            Manage Categories ({categories.length})
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Configure electronics departments, icons, and navigational order
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-orange-500/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const productCount = products.filter((p) => p.categoryId === cat.id).length;
          return (
            <div
              key={cat.id}
              className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm hover:border-orange-300 dark:hover:border-orange-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
                    <DynamicIcon name={cat.icon} className="w-6 h-6" />
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(cat)}
                      className="p-1.5 text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors"
                      title="Edit Category"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingCatId(cat.id)}
                      className="p-1.5 text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">
                  {cat.name}
                </h3>
                <p className="text-[11px] font-mono text-zinc-400 mt-0.5">/{cat.slug}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2">
                  {cat.description || 'No description provided.'}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold">
                <span className="text-zinc-400">Products in Catalog:</span>
                <span className="px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-orange-600 dark:text-orange-400 font-bold">
                  {productCount} deals
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingCatId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 max-w-sm w-full border border-zinc-200 dark:border-zinc-800 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                Delete Category?
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Products currently assigned to this category will become uncategorized.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setDeletingCatId(null)}
                className="flex-1 py-2 text-xs font-semibold rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteCategory(deletingCatId);
                  setDeletingCatId(null);
                }}
                className="flex-1 py-2 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
          <div 
            className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden my-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:px-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="font-extrabold text-base sm:text-lg text-zinc-900 dark:text-white">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Wireless Audio, 4K TVs, Drones"
                  className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="wireless-audio"
                  className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl font-mono focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-1.5">
                  Select Icon
                </label>
                <div className="grid grid-cols-5 gap-2 max-h-36 overflow-y-auto p-2 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800/40">
                  {AVAILABLE_CATEGORY_ICONS.map((iconName) => (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => setIcon(iconName)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                        icon === iconName
                          ? 'bg-orange-500 text-white border-orange-500'
                          : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100'
                      }`}
                    >
                      <DynamicIcon name={iconName} className="w-4 h-4" />
                      <span className="text-[9px] truncate max-w-full">{iconName}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-1">
                  Department Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief summary of electronics included in this department..."
                  className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-1">
                  Department Header Image URL
                </label>
                <input
                  type="url"
                  value={bannerImage}
                  onChange={(e) => setBannerImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md cursor-pointer"
                >
                  {editingCategory ? 'Update Category' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

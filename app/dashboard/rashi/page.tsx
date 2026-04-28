'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSync } from 'react-icons/fa';

const PRIMARY = '#4A90E2';

interface RashiRow {
  id: string;
  name: string;
  nameNepali?: string | null;
  icon?: string | null;
  shortDescription?: string | null;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function DashboardRashiPage() {
  const router = useRouter();
  const [rashis, setRashis] = useState<RashiRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<RashiRow | null>(null);
  const [rashiForm, setRashiForm] = useState({
    name: '',
    nameNepali: '',
    icon: '',
    shortDescription: '',
    description: '',
  });
  const [refreshing, setRefreshing] = useState(false);

  const authHeaders = (): HeadersInit => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  const fetchRashis = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
      const res = await fetch('/api/rashis', { headers: { Authorization: `Bearer ${token}` } });
      if (res.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
        return;
      }
      const data = await res.json();
      if (data.success) setRashis(data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRashis();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount only
  }, []);

  const openCreate = () => {
    setEditing(null);
    setRashiForm({
      name: '',
      nameNepali: '',
      icon: '',
      shortDescription: '',
      description: '',
    });
    setModalOpen(true);
  };

  const openEdit = (r: RashiRow) => {
    setEditing(r);
    setRashiForm({
      name: r.name,
      nameNepali: r.nameNepali ?? '',
      icon: r.icon ?? '',
      shortDescription: r.shortDescription ?? '',
      description: r.description ?? '',
    });
    setModalOpen(true);
  };

  const save = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const trimmed = rashiForm.name.trim();
    if (!trimmed) return;

    const url = editing ? `/api/rashis/${editing.id}` : '/api/rashis';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: authHeaders(),
      body: JSON.stringify({
        name: trimmed,
        nameNepali: rashiForm.nameNepali.trim() || null,
        icon: rashiForm.icon.trim() || null,
        shortDescription: rashiForm.shortDescription.trim() || null,
        description: rashiForm.description.trim() || null,
      }),
    });
    const data = await res.json();
    if (data.success) {
      setModalOpen(false);
      fetchRashis();
    } else {
      alert(data.error || 'Save failed');
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this rashi? Related detail row will also be removed.')) return;
    const token = localStorage.getItem('token');
    if (!token) return;
    const res = await fetch(`/api/rashis/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) fetchRashis();
  };

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"
          style={{ borderColor: `${PRIMARY}`, borderTopColor: 'transparent' }}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)] mb-2">
            MongoDB · Rashi
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Rashi CRUD</h2>
          <p className="text-slate-600 mt-2 max-w-xl">
            Create, read, update, delete <strong>Rashi</strong> documents in your cluster. Deleting a rashi removes its linked <strong>RashiDetail</strong> row.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setRefreshing(true);
              fetchRashis();
            }}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <FaSync className={refreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white shadow-lg transition hover:brightness-105"
            style={{ backgroundColor: PRIMARY }}
          >
            <FaPlus />
            Add rashi
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="px-5 py-4 font-semibold text-slate-700">Name</th>
                <th className="px-5 py-4 font-semibold text-slate-700 hidden lg:table-cell max-w-[140px]">
                  Document ID
                </th>
                <th className="px-5 py-4 font-semibold text-slate-700 hidden md:table-cell">Updated</th>
                <th className="px-5 py-4 font-semibold text-slate-700 text-right w-40">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rashis.map((r) => (
                <motion.tr
                  key={r.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-slate-100 hover:bg-slate-50/60 transition-colors"
                >
                  <td className="px-5 py-4 font-medium text-slate-900">{r.name}</td>
                  <td
                    className="px-5 py-4 font-mono text-xs text-slate-500 hidden lg:table-cell truncate max-w-[180px]"
                    title={r.id}
                  >
                    {r.id}
                  </td>
                  <td className="px-5 py-4 text-slate-500 hidden md:table-cell">
                    {new Date(r.updatedAt).toLocaleString()}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => openEdit(r)}
                      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[var(--primary)] font-semibold hover:bg-[color-mix(in_srgb,var(--primary)_12%,white)] mr-2"
                    >
                      <FaEdit className="text-xs" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(r.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-red-600 font-semibold hover:bg-red-50"
                    >
                      <FaTrash className="text-xs" />
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {rashis.length === 0 && (
          <p className="px-5 py-12 text-center text-slate-500">No rashis yet. Add one to get started.</p>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px] overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              {editing ? 'Edit rashi' : 'New rashi'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Rashi name *</label>
                <input
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--primary)]/40"
                  value={rashiForm.name}
                  onChange={(e) => setRashiForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Mesha / Aries"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Name (Nepali)</label>
                <input
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--primary)]/40"
                  value={rashiForm.nameNepali}
                  onChange={(e) => setRashiForm((f) => ({ ...f, nameNepali: e.target.value }))}
                  placeholder="मेष"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Icon filename</label>
                <input
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--primary)]/40 font-mono text-sm"
                  value={rashiForm.icon}
                  onChange={(e) => setRashiForm((f) => ({ ...f, icon: e.target.value }))}
                  placeholder="aries.jpg (must exist in /public)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Short description</label>
                <textarea
                  rows={2}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--primary)]/40 text-sm"
                  value={rashiForm.shortDescription}
                  onChange={(e) => setRashiForm((f) => ({ ...f, shortDescription: e.target.value }))}
                  placeholder="Shown on home cards and hero — plain text or HTML."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">About (long)</label>
                <textarea
                  rows={4}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--primary)]/40 text-sm"
                  value={rashiForm.description}
                  onChange={(e) => setRashiForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Optional longer story on the public detail page."
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-xl px-4 py-2.5 font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={save}
                className="rounded-xl px-5 py-2.5 font-semibold text-white shadow-md"
                style={{ backgroundColor: PRIMARY }}
              >
                Save
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

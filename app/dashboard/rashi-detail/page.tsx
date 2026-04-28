'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaSave, FaTrash, FaSync, FaEdit } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('@/components/editor/RichTextEditor'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[220px] rounded-xl border border-slate-200 bg-slate-50 animate-pulse" />
  ),
});

const PRIMARY = '#4A90E2';

interface RashiRow {
  id: string;
  name: string;
}

interface DetailForm {
  dailyRashifal: string;
  favoriteColor: string;
  favoriteNumber: string;
  upay: string;
  weeklyRashifal: string;
  saptahikPrem: string;
  monthlyRashifal: string;
}

interface DetailListRow {
  id: string;
  rashiId: string;
  updatedAt: string;
  rashi: { id: string; name: string };
}

const emptyForm = (): DetailForm => ({
  dailyRashifal: '',
  favoriteColor: '',
  favoriteNumber: '',
  upay: '',
  weeklyRashifal: '',
  saptahikPrem: '',
  monthlyRashifal: '',
});

function normalizeDetailNumber(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'number') return String(value);
  return String(value).trim();
}

export default function DashboardRashiDetailPage() {
  const router = useRouter();
  const [rashis, setRashis] = useState<RashiRow[]>([]);
  const [detailRows, setDetailRows] = useState<DetailListRow[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [detailRecordId, setDetailRecordId] = useState<string | null>(null);
  const [form, setForm] = useState<DetailForm>(emptyForm());
  const [detailEpoch, setDetailEpoch] = useState(0);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [saving, setSaving] = useState(false);
  const [listBusy, setListBusy] = useState(false);

  const tokenHeaders = (): HeadersInit => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  const fetchRashis = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const res = await fetch('/api/rashis', { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (data.success) setRashis(data.data);
  }, []);

  const fetchDetailRows = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    setListBusy(true);
    try {
      const res = await fetch('/api/rashi-details', { headers: { Authorization: `Bearer ${token}` } });
      if (res.status === 401) {
        localStorage.removeItem('token');
        router.replace('/login');
        return;
      }
      const data = await res.json();
      if (data.success) {
        setDetailRows(
          (data.data as DetailListRow[]).map((r) => ({
            id: r.id,
            rashiId: r.rashiId,
            updatedAt: r.updatedAt,
            rashi: r.rashi,
          }))
        );
      }
    } finally {
      setListBusy(false);
    }
  }, [router]);

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/login');
        return;
      }
      try {
        const res = await fetch('/api/rashis', { headers: { Authorization: `Bearer ${token}` } });
        if (res.status === 401) {
          localStorage.removeItem('token');
          router.replace('/login');
          return;
        }
        const data = await res.json();
        if (data.success) {
          setRashis(data.data);
          if (data.data?.length && !selectedId) {
            setSelectedId(data.data[0].id);
          }
        }
        await fetchDetailRows();
      } finally {
        setLoadingList(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!selectedId) {
      setForm(emptyForm());
      setDetailRecordId(null);
      setDetailEpoch((e) => e + 1);
      return;
    }

    const loadDetail = async () => {
      setLoadingDetail(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await fetch(`/api/rashi-details/by-rashi/${selectedId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success && data.data) {
          const d = data.data;
          setDetailRecordId(d.id ?? null);
          setForm({
            dailyRashifal: d.dailyRashifal ?? '',
            favoriteColor: typeof d.favoriteColor === 'string' ? d.favoriteColor : '',
            favoriteNumber: normalizeDetailNumber(d.favoriteNumber),
            upay: d.upay ?? '',
            weeklyRashifal: d.weeklyRashifal ?? '',
            saptahikPrem: typeof d.saptahikPrem === 'string' ? d.saptahikPrem : '',
            monthlyRashifal: d.monthlyRashifal ?? '',
          });
        } else {
          setDetailRecordId(null);
          setForm(emptyForm());
        }
      } finally {
        setLoadingDetail(false);
        setDetailEpoch((e) => e + 1);
      }
    };

    loadDetail();
  }, [selectedId]);

  const save = async () => {
    if (!selectedId) return;
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const payload = {
        rashiId: selectedId,
        ...form,
      };

      let res: Response;
      if (detailRecordId) {
        res = await fetch(`/api/rashi-details/${detailRecordId}`, {
          method: 'PUT',
          headers: tokenHeaders(),
          body: JSON.stringify(form),
        });
      } else {
        res = await fetch('/api/rashi-details', {
          method: 'POST',
          headers: tokenHeaders(),
          body: JSON.stringify(payload),
        });
        if (res.status === 409) {
          res = await fetch('/api/rashi-details', {
            method: 'PUT',
            headers: tokenHeaders(),
            body: JSON.stringify(payload),
          });
        }
      }

      const data = await res.json();
      if (!data.success) {
        alert(data.error || 'Save failed');
        return;
      }

      if (data.data?.id) {
        setDetailRecordId(data.data.id);
      }
      await fetchDetailRows();
    } finally {
      setSaving(false);
    }
  };

  const deleteDetail = async (id: string, label?: string) => {
    if (!confirm(`Delete this Rashi detail${label ? ` (${label})` : ''} from the database?`)) return;
    const token = localStorage.getItem('token');
    if (!token) return;
    const res = await fetch(`/api/rashi-details/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!data.success) {
      alert(data.error || 'Delete failed');
      return;
    }
    if (id === detailRecordId) {
      setDetailRecordId(null);
      setForm(emptyForm());
      setDetailEpoch((e) => e + 1);
    }
    await fetchDetailRows();
  };

  const selectDetailRow = (rashiId: string) => {
    setSelectedId(rashiId);
  };

  if (loadingList) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"
          style={{ borderColor: PRIMARY, borderTopColor: 'transparent' }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)] mb-2">MongoDB · RashiDetail</p>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Rashi detail CRUD</h2>
        <p className="text-slate-600 mt-2 max-w-2xl">
          All rows below are stored in your Atlas <strong>RashiDetail</strong> collection. Create / read / update / delete from here.
          Rich text is HTML from the editor.
        </p>
      </div>

      <section className="rounded-2xl border border-slate-200/90 bg-white shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-slate-100 bg-slate-50/80">
          <h3 className="font-semibold text-slate-900">Saved details ({detailRows.length})</h3>
          <button
            type="button"
            onClick={() => {
              fetchRashis();
              fetchDetailRows();
            }}
            disabled={listBusy}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <FaSync className={listBusy ? 'animate-spin' : ''} />
            Refresh from database
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-white">
                <th className="px-4 py-3 font-semibold text-slate-700">Rashi</th>
                <th className="px-4 py-3 font-semibold text-slate-700 hidden lg:table-cell">Detail ID</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Updated</th>
                <th className="px-4 py-3 font-semibold text-slate-700 text-right w-[200px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {detailRows.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-slate-500">
                    No detail documents yet. Pick a rashi below and save to create one (POST → MongoDB).
                  </td>
                </tr>
              ) : (
                detailRows.map((row) => (
                  <tr
                    key={row.id}
                    className={`border-b border-slate-100 hover:bg-slate-50/60 ${
                      row.rashiId === selectedId ? 'bg-[color-mix(in_srgb,var(--primary)_6%,white)]' : ''
                    }`}
                  >
                    <td className="px-4 py-3 font-medium text-slate-900">{row.rashi?.name ?? '—'}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-500 hidden lg:table-cell max-w-[200px] truncate" title={row.id}>
                      {row.id}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{new Date(row.updatedAt).toLocaleString()}</td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => selectDetailRow(row.rashiId)}
                        className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-[var(--primary)] font-semibold hover:bg-[color-mix(in_srgb,var(--primary)_12%,white)]"
                      >
                        <FaEdit className="text-xs" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteDetail(row.id, row.rashi?.name)}
                        className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-red-600 font-semibold hover:bg-red-50"
                      >
                        <FaTrash className="text-xs" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {rashis.length === 0 ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
          Add at least one rashi under <strong>Rashi</strong> first — that populates the <strong>Rashi</strong> collection, then you can attach details.
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:justify-between">
            <div className="flex-1 max-w-md">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Select rashi (links to Rashi document)</label>
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-900 outline-none focus:ring-2 focus:ring-[var(--primary)]/35"
              >
                {rashis.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-sm text-slate-600">
              {detailRecordId ? (
                <span>
                  Mode: <strong className="text-slate-900">Update</strong> — existing detail id in MongoDB.
                </span>
              ) : (
                <span>
                  Mode: <strong className="text-slate-900">Create</strong> — POST will insert a new RashiDetail for this rashi.
                </span>
              )}
            </div>
          </div>

          {loadingDetail ? (
            <div className="flex justify-center py-16">
              <div
                className="h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"
                style={{ borderColor: PRIMARY, borderTopColor: 'transparent' }}
              />
            </div>
          ) : (
            <motion.div
              key={selectedId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-slate-200/90 bg-white p-6 md:p-8 shadow-[0_12px_40px_-20px_rgba(15,23,42,0.15)]"
            >
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    दैनिक राशिफल <span className="text-red-500">*</span>
                  </label>
                  <RichTextEditor
                    key={`${selectedId}-daily-${detailEpoch}`}
                    value={form.dailyRashifal}
                    onChange={(html) => setForm((f) => ({ ...f, dailyRashifal: html }))}
                    placeholder="Add headings, bold important lines, bullet lists…"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">
                      पसंदीदा रंग (एक से अधिक)
                    </label>
                    <input
                      type="text"
                      value={form.favoriteColor}
                      onChange={(e) => setForm({ ...form, favoriteColor: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/35"
                      placeholder="जैसे #4A90E2, Crimson, Gold या लाल, नीला"
                    />
                    <p className="mt-1.5 text-xs text-slate-500">
                      अल्पविराम, सेमीकोलन या &quot;और&quot; से अलग करें — MongoDB में टेक्स्ट के रूप में सहेजा जाता है।
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">
                      भाग्यशाली / पसंदीदा संख्याएँ (एक से अधिक)
                    </label>
                    <input
                      type="text"
                      inputMode="text"
                      value={form.favoriteNumber}
                      onChange={(e) => setForm({ ...form, favoriteNumber: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/35"
                      placeholder="e.g. 5, 10, 7"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">उपाय</label>
                  <RichTextEditor
                    key={`${selectedId}-upay-${detailEpoch}`}
                    value={form.upay}
                    onChange={(html) => setForm((f) => ({ ...f, upay: html }))}
                    placeholder="Remedies with headings and emphasis…"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    साप्ताहिक राशिफल
                  </label>
                  <RichTextEditor
                    key={`${selectedId}-weekly-${detailEpoch}`}
                    value={form.weeklyRashifal}
                    onChange={(html) => setForm((f) => ({ ...f, weeklyRashifal: html }))}
                    placeholder="साप्ताहिक भविष्यवाणी…"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    साप्ताहिक प्रेम
                  </label>
                  <RichTextEditor
                    key={`${selectedId}-prem-${detailEpoch}`}
                    value={form.saptahikPrem}
                    onChange={(html) => setForm((f) => ({ ...f, saptahikPrem: html }))}
                    placeholder="साप्ताहिक प्रेम संबंधित राशिफल…"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    मासिक राशिफल
                  </label>
                  <RichTextEditor
                    key={`${selectedId}-monthly-${detailEpoch}`}
                    value={form.monthlyRashifal}
                    onChange={(html) => setForm((f) => ({ ...f, monthlyRashifal: html }))}
                    placeholder="मासिक दृष्टिकोण…"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                  <div className="flex flex-wrap gap-2">
                    {detailRecordId && (
                      <button
                        type="button"
                        onClick={() => deleteDetail(detailRecordId)}
                        className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3 font-semibold text-red-700 hover:bg-red-100"
                      >
                        <FaTrash />
                        Delete this detail
                      </button>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={save}
                    disabled={saving || !selectedId}
                    className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition disabled:opacity-50"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    <FaSave />
                    {saving ? 'Saving…' : detailRecordId ? 'Update (PUT)' : 'Create (POST)'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}

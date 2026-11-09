const service = require('../services/suratService');

const idValid = (id) => Number.isInteger(Number(id)) && Number(id) > 0;

const cekBody = (b) => {
  if (!b.no_surat || !b.nama_pemohon || !b.nik || !b.jenis_surat) {
    return 'no_surat, nama_pemohon, nik, dan jenis_surat wajib diisi';
  }
  if (!/^\d{16}$/.test(b.nik)) {
    return 'NIK harus 16 digit angka';
  }
  return null;
};

const tanganiError = (err, res) => {
  if (err.code === '23505') {
    return res.status(400).json({ success: false, message: 'Nomor surat sudah dipakai' });
  }
  console.error(err);
  return res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
};

exports.getAll = async (req, res) => {
  try {
    const data = await service.getAll();
    res.status(200).json({ success: true, data });
  } catch (err) {
    tanganiError(err, res);
  }
};

exports.getById = async (req, res) => {
  try {
    if (!idValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'ID tidak valid' });
    }
    const data = await service.getById(req.params.id);
    if (!data) {
      return res.status(404).json({ success: false, message: 'Surat tidak ditemukan' });
    }
    res.status(200).json({ success: true, data });
  } catch (err) {
    tanganiError(err, res);
  }
};

exports.getByNama = async (req, res) => {
  try {
    const nama = req.params.nama.trim();
    if (!nama) {
      return res.status(400).json({ success: false, message: 'Nama tidak boleh kosong' });
    }
    const data = await service.getByNama(nama);
    if (data.length === 0) {
      return res.status(404).json({ success: false, message: 'Surat dengan nama tersebut tidak ditemukan' });
    }
    res.status(200).json({ success: true, data });
  } catch (err) {
    tanganiError(err, res);
  }
};

exports.create = async (req, res) => {
  try {
    const pesan = cekBody(req.body);
    if (pesan) return res.status(400).json({ success: false, message: pesan });
    const data = await service.create(req.body);
    res.status(201).json({ success: true, message: 'Surat berhasil ditambahkan', data });
  } catch (err) {
    tanganiError(err, res);
  }
};

exports.update = async (req, res) => {
  try {
    if (!idValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'ID tidak valid' });
    }
    const pesan = cekBody(req.body);
    if (pesan) return res.status(400).json({ success: false, message: pesan });

    const body = {
      ...req.body,
      status: req.body.status ?? 0,
      sudah_diambil: req.body.sudah_diambil ?? false,
    };
    if (![0, 1, 2, 3, 4].includes(Number(body.status))) {
      return res.status(400).json({ success: false, message: 'Status harus 0 sampai 4' });
    }

    const data = await service.update(req.params.id, body);
    if (!data) {
      return res.status(404).json({ success: false, message: 'Surat tidak ditemukan' });
    }
    res.status(200).json({ success: true, message: 'Surat berhasil diubah', data });
  } catch (err) {
    tanganiError(err, res);
  }
};

exports.remove = async (req, res) => {
  try {
    if (!idValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'ID tidak valid' });
    }
    const data = await service.remove(req.params.id);
    if (!data) {
      return res.status(404).json({ success: false, message: 'Surat tidak ditemukan' });
    }
    res.status(200).json({ success: true, message: 'Surat berhasil dihapus', data });
  } catch (err) {
    tanganiError(err, res);
  }
};
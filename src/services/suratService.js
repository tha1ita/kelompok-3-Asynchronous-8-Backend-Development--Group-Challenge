const db = require('../db');

exports.getAll = async () => {
  const result = await db.query('SELECT * FROM surat ORDER BY id ASC');
  return result.rows;
};

exports.getById = async (id) => {
  const result = await db.query('SELECT * FROM surat WHERE id = $1', [id]);
  return result.rows[0];
};

exports.getByNama = async (nama) => {
  const kata = nama.replace(/[\\%_]/g, '\\$&');
  const result = await db.query(
    'SELECT * FROM surat WHERE nama_pemohon ILIKE $1 ORDER BY id ASC',
    [`%${kata}%`]
  );
  return result.rows;
};

exports.create = async (d) => {
  const result = await db.query(
    `INSERT INTO surat (no_surat, nama_pemohon, nik, jenis_surat)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [d.no_surat, d.nama_pemohon, d.nik, d.jenis_surat]
  );
  return result.rows[0];
};

exports.update = async (id, d) => {
  const result = await db.query(
    `UPDATE surat
     SET no_surat = $1, nama_pemohon = $2, nik = $3, jenis_surat = $4,
         status = $5, sudah_diambil = $6
     WHERE id = $7 RETURNING *`,
    [d.no_surat, d.nama_pemohon, d.nik, d.jenis_surat, d.status, d.sudah_diambil, id]
  );
  return result.rows[0];
};

exports.remove = async (id) => {
  const result = await db.query('DELETE FROM surat WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};
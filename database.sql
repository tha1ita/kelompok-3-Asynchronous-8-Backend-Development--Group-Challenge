CREATE TABLE surat (
  id SERIAL PRIMARY KEY,
  no_surat VARCHAR(50) NOT NULL UNIQUE,
  nama_pemohon VARCHAR(100) NOT NULL,
  nik CHAR(16) NOT NULL,
  jenis_surat VARCHAR(100) NOT NULL,
  status SMALLINT NOT NULL DEFAULT 0,
  sudah_diambil BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO surat (no_surat, nama_pemohon, nik, jenis_surat, status) VALUES
('001/KDR/2026', 'Budi Santoso', '3515010101900001', 'Surat Keterangan Domisili', 0),
('002/KDR/2026', 'Siti Aminah', '3515010202920002', 'Surat Keterangan Usaha', 3);
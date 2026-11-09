CREATE TABLE staf (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  jabatan VARCHAR(100) NOT NULL
);

-- satu staf memiliki satu akun
CREATE TABLE akun_staf (
  id SERIAL PRIMARY KEY,
  staf_id INTEGER NOT NULL UNIQUE REFERENCES staf(id) ON DELETE CASCADE,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE status_surat (
  kode SMALLINT PRIMARY KEY,
  nama VARCHAR(50) NOT NULL UNIQUE
);

-- satu status dipakai banyak surat
CREATE TABLE surat (
  id SERIAL PRIMARY KEY,
  no_surat VARCHAR(50) NOT NULL UNIQUE,
  nama_pemohon VARCHAR(100) NOT NULL,
  nik CHAR(16) NOT NULL,
  jenis_surat VARCHAR(100) NOT NULL,
  status SMALLINT NOT NULL DEFAULT 0 REFERENCES status_surat(kode),
  sudah_diambil BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- satu surat banyak riwayat, satu staf banyak riwayat
CREATE TABLE riwayat_status (
  id SERIAL PRIMARY KEY,
  surat_id INTEGER NOT NULL REFERENCES surat(id) ON DELETE CASCADE,
  staf_id INTEGER REFERENCES staf(id) ON DELETE SET NULL,
  status SMALLINT NOT NULL REFERENCES status_surat(kode),
  catatan TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE persyaratan (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(100) NOT NULL UNIQUE
);

-- satu surat banyak persyaratan, satu persyaratan banyak surat
CREATE TABLE surat_persyaratan (
  surat_id INTEGER NOT NULL REFERENCES surat(id) ON DELETE CASCADE,
  persyaratan_id INTEGER NOT NULL REFERENCES persyaratan(id) ON DELETE CASCADE,
  sudah_diserahkan BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (surat_id, persyaratan_id)
);

INSERT INTO staf (nama, jabatan) VALUES
('Rina Wulandari', 'Sekretaris Desa'),
('Agus Prasetyo', 'Staf Pelayanan');

INSERT INTO akun_staf (staf_id, username, password) VALUES
(1, 'rina', 'staffdesa1'),
(2, 'agus', 'staffdesa2');

INSERT INTO status_surat (kode, nama) VALUES
(0, 'Berkas diajukan staf'),
(1, 'Berkas belum sesuai'),
(2, 'Berkas masih kurang'),
(3, 'Menunggu tanda tangan'),
(4, 'Siap diambil');

INSERT INTO surat (no_surat, nama_pemohon, nik, jenis_surat, status, sudah_diambil) VALUES
('001/KDR/2026', 'Budi Santoso', '3515010101900001', 'Surat Keterangan Domisili', 3, FALSE),
('002/KDR/2026', 'Siti Aminah', '3515010202920002', 'Surat Keterangan Usaha', 4, TRUE);

INSERT INTO riwayat_status (surat_id, staf_id, status, catatan) VALUES
(1, 1, 0, 'Berkas diajukan'),
(1, 2, 3, 'Menunggu tanda tangan Kepala Desa'),
(2, 1, 0, 'Berkas diajukan'),
(2, 1, 4, 'Surat siap diambil');

INSERT INTO persyaratan (nama) VALUES
('Fotokopi KTP'), ('Fotokopi KK'), ('Surat pengantar RT/RW');

INSERT INTO surat_persyaratan (surat_id, persyaratan_id, sudah_diserahkan) VALUES
(1, 1, TRUE), (1, 2, TRUE), (1, 3, FALSE),
(2, 1, TRUE), (2, 2, TRUE);
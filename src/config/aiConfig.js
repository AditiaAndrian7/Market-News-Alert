module.exports = {
  MODEL: "gemini-2.5-flash",

  MAX_RETRY: 2,
  RETRY_DELAY: 45000,

  PROMPT_TEMPLATE: `
Ringkas berita berikut menjadi 2-3 kalimat singkat.

Fokus HANYA pada informasi yang diberikan.
JANGAN menambahkan informasi dari luar.

Prioritaskan dampak terhadap:
- ekonomi
- saham
- crypto
- komoditas

WAJIB format:
Summary: <ringkasan>
Impact: LOW / MEDIUM / HIGH

Berita:
Title: {{title}}
Description: {{description}}
Content: {{content}}
`,
};

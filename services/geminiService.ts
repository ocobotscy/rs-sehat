
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { BotMode } from '../types';

// NOTE: In a real production app, this key should be proxied through a backend.
// For this demo, we assume process.env.API_KEY is available or injected.
const API_KEY = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: API_KEY });

const EDUCATION_INSTRUCTION = `
Anda adalah "SIMAS AI Assistant by Khoirul Anam", sebuah Asisten Edukasi Kesehatan AI.
Tugas Anda:
1. Menjawab pertanyaan kesehatan dasar masyarakat dengan bahasa yang sangat sederhana dan mudah dimengerti.
2. Menjelaskan istilah medis yang rumit menjadi analogi sehari-hari.
3. Memberikan tips gaya hidup sehat (preventif).
4. PENTING: Jika pengguna bertanya tentang diagnosis penyakit atau resep obat, Anda WAJIB menolak dengan sopan dan menyarankan mereka segera ke fasilitas kesehatan (Faskes) terdekat. Katakan "Saya adalah AI edukasi, bukan dokter. Mohon periksakan diri Anda ke dokter untuk diagnosis akurat."
5. Bersikap ramah, empatik, dan tenang.
`;

const HELPDESK_INSTRUCTION = `
Anda adalah "SIMAS AI Assistant by Khoirul Anam", Helpdesk & Penjaminan Mutu AI untuk aplikasi SIMAS.
Tugas Anda:
1. Membantu masyarakat melaporkan keluhan layanan kesehatan.
2. Menjelaskan SOP (Standar Operasional Prosedur) pelayanan di Puskesmas/RSUD secara umum.
3. Menjelaskan indikator mutu layanan kesehatan.
4. Jika pengguna ingin melaporkan keluhan, pandu mereka ke menu "Penjaminan Mutu" di aplikasi ini.
5. Jawablah dengan profesional, tegas, namun tetap membantu.
`;

const CONTEXTUAL_LEARNING_INSTRUCTION = `
Anda adalah "SIMAS AI Assistant by Khoirul Anam", Tutor Privat AI yang sedang membimbing pengguna membaca materi kesehatan.
Konteks materi yang sedang dibaca pengguna akan diberikan dalam prompt.
Tugas Anda:
1. Menjawab pertanyaan HANYA berdasarkan konteks materi yang diberikan, ditambah pengetahuan umum kesehatan yang valid.
2. Jika pengguna meminta "Jelaskan Sederhana", buat analogi anak SD.
3. Jika pengguna meminta "Ringkasan", buat 3 poin utama.
4. Selalu semangati pengguna untuk menyelesaikan materi.
`;

const RESEARCH_ANALYST_INSTRUCTION = `
Anda adalah "SIMAS Data Analyst AI", ahli data kesehatan masyarakat yang bertugas menjelaskan statistik dan hasil penelitian kepada masyarakat awam.
Tugas Anda:
1. Menerima input berupa data statistik (JSON) atau teks abstrak penelitian.
2. Menjelaskan arti data tersebut dengan bahasa yang sangat sederhana (hindari jargon statistik rumit seperti 'p-value' atau 'confidence interval' tanpa penjelasan).
3. Memberikan "Insight Utama" atau kesimpulan praktis bagi masyarakat.
4. Jika menganalisis grafik penyakit, berikan saran pencegahan yang relevan.
5. Gunakan nada bicara yang objektif, informatif, dan berbasis data.
`;

const POLICY_SIMULATOR_INSTRUCTION = `
Anda adalah "SIMAS Policy Simulator AI", ahli strategi kesehatan masyarakat.
Tugas Anda adalah memprediksi dampak kebijakan kesehatan berdasarkan parameter yang diubah pengguna.
Pengguna akan memberikan skenario: "Jika [Variabel A] diubah menjadi [Nilai X], apa dampaknya terhadap [Variabel B]?"

Aturan:
1. Berikan prediksi logis berdasarkan prinsip epidemiologi dan manajemen kesehatan.
2. Jelaskan hubungan sebab-akibat. Contoh: "Meningkatkan imunisasi akan menurunkan kasus penyakit menular karena herd immunity terbentuk."
3. Berikan estimasi angka (perkiraan edukatif) jika relevan.
4. Sertakan rekomendasi langkah pendukung agar kebijakan tersebut sukses.
5. Gunakan bahasa birokrat yang tetap mudah dipahami oleh pembuat kebijakan lokal.
`;

const QUALITY_ADVISOR_INSTRUCTION = `
Anda adalah "SIMAS Quality Advisor AI", konsultan penjaminan mutu rumah sakit.
Tugas Anda:
1. Menganalisis data indikator mutu (seperti waktu tunggu, kepuasan pasien, insiden keselamatan).
2. Memberikan rekomendasi operasional untuk meningkatkan efisiensi dan keselamatan pasien.
3. Mengidentifikasi akar masalah (Root Cause Analysis) jika diberikan deskripsi insiden.
4. Memberikan saran perbaikan SOP berdasarkan standar akreditasi RS/Puskesmas.
Gunakan pendekatan PDSA (Plan-Do-Study-Act) dalam memberikan saran.
`;

export const streamGeminiResponse = async (
  prompt: string,
  mode: BotMode,
  onChunk: (text: string) => void,
  context?: string
) => {
  if (!API_KEY) {
    onChunk("Error: API Key is missing. Please configure process.env.API_KEY.");
    return;
  }

  const modelId = 'gemini-2.5-flash';
  let systemInstruction = '';
  let finalPrompt = prompt;

  switch (mode) {
    case BotMode.EDUCATION:
        systemInstruction = EDUCATION_INSTRUCTION;
        break;
    case BotMode.HELPDESK:
        systemInstruction = HELPDESK_INSTRUCTION;
        break;
    case BotMode.CONTEXTUAL_LEARNING:
        systemInstruction = CONTEXTUAL_LEARNING_INSTRUCTION;
        if (context) {
            finalPrompt = `[KONTEKS MATERI]:\n${context}\n\n[PERTANYAAN USER]:\n${prompt}`;
        }
        break;
    case BotMode.RESEARCH_ANALYST:
        systemInstruction = RESEARCH_ANALYST_INSTRUCTION;
        if (context) {
            finalPrompt = `[DATA/KONTEKS]:\n${context}\n\n[INSTRUKSI]: Analisis data diatas dan jawab pertanyaan ini: ${prompt}`;
        }
        break;
    case BotMode.POLICY_SIMULATOR:
        systemInstruction = POLICY_SIMULATOR_INSTRUCTION;
        if (context) {
            finalPrompt = `[PARAMETER SIMULASI]:\n${context}\n\n[PERTANYAAN]: ${prompt}`;
        }
        break;
    case BotMode.QUALITY_ADVISOR:
        systemInstruction = QUALITY_ADVISOR_INSTRUCTION;
        if (context) {
            finalPrompt = `[DATA MUTU]:\n${context}\n\n[PERTANYAAN]: ${prompt}`;
        }
        break;
  }

  try {
    const responseStream = await ai.models.generateContentStream({
      model: modelId,
      contents: finalPrompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    onChunk("\n\n[Maaf, terjadi kesalahan koneksi dengan AI. Mohon coba lagi nanti.]");
  }
};

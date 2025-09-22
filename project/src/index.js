import express from 'express';
import OpenAI from 'openai';
import multer from 'multer';
import fs from 'fs/promises';

const app = express();
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Multer para upload de arquivos
const upload = multer({ dest: 'uploads/' });

// Função que chama a IA para analisar o log
async function analyzeLog(log) {
  const prompt = `
Você é um especialista em cibersegurança. Recebi o seguinte log JSON:

${JSON.stringify(log, null, 2)}

Gere um relatório **APENAS em JSON** com estas chaves:

- "critico": nível de criticidade (ALTO, MÉDIO, BAIXO) baseado em MITRE ATT&CK, CVEs e padrões de ataque
- "resumo": breve explicação do evento, fácil de entender por não técnicos
- "acoes": lista de ações recomendadas
- "campos": lista dos campos importantes do log
- "categoria_mitre": técnica MITRE ATT&CK relacionada
- "referencias": informações adicionais de threat intelligence (IP, hash, domínio, CVEs, etc.)
- "impacto": estimativa do impacto
- "contexto": padrões ou frequência observada

**Não inclua nada fora do JSON. Não coloque explicações nem texto adicional.**
`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 1000,
  });

  const analysisText = completion.choices[0]?.message?.content ?? '{}';

  try {
    return JSON.parse(analysisText);
  } catch (err) {
    console.error('Erro ao parsear JSON da IA:', analysisText);
    return { error: 'Erro ao gerar JSON válido' };
  }
}

// Rota JSON direto
app.post('/api/analyze-log', async (req, res) => {
  try {
    const { log } = req.body;
    if (!log) return res.status(400).json({ error: 'Log não enviado' });

    const analysis = await analyzeLog(log);
    res.json({ analysis });
  } catch (error) {
    console.error('Erro detalhado:', error.response?.data || error);
    res.status(500).json({ error: 'Erro ao analisar o log' });
  }
});

// Rota upload de arquivo JSON
app.post('/api/upload-log', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Arquivo não enviado' });

  let tmpPath = req.file.path;
  try {
    const raw = (await fs.readFile(tmpPath, 'utf8')).trim().replace(/^\uFEFF/, '');
    const log = JSON.parse(raw);

    const analysis = await analyzeLog(log);
    res.json({ analysis });
  } catch (err) {
    console.error('Erro upload/análise:', err);
    res.status(400).json({ error: 'Arquivo inválido ou mal formatado' });
  } finally {
    try { await fs.unlink(tmpPath); } catch {}
  }
});

// Rodar servidor em todas as interfaces
app.listen(3000, '0.0.0.0', () => {
  console.log('API rodando na porta 3000');
});

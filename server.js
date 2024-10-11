// Document Summarization
app.post('/api/ai/summarize', authenticateToken, async (req, res) => {
  const { documentId } = req.body;

  try {
    const document = await db.get('SELECT content FROM documents WHERE id = ? AND user_id = ?', [documentId, req.user.id]);
    
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`
      },
      body: JSON.stringify({ inputs: document.content }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate summary');
    }

    const data = await response.json();
    res.json({ summary: data[0].summary_text });
  } catch (error) {
    console.error('Error summarizing document:', error);
    res.status(500).json({ error: 'Error summarizing document' });
  }
});
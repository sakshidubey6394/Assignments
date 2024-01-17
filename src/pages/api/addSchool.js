import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // const formData = new FormData(req.body);
      // console.log(formData.get("name"));
      const { name, address, city, state, contact, email_id, image} = req.body;
      console.log(name);

      await db.query(
        'INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, address, city, state, contact, email_id,null]
      );
      res.status(200).json({ message: 'School added successfully!' });
    } catch (error) {
      
      console.error('Error adding school:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

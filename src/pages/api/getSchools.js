// pages/api/getSchools.js
import db from '../../../src/lib/db';
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch all schools from the MySQL database
      const schools = await db.query('SELECT * FROM schools');
      res.status(200).json(schools);
    } catch (error) {
      console.error('Error fetching schools:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

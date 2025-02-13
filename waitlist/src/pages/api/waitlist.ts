import type { NextApiRequest, NextApiResponse } from 'next';
import { addToWaitlist, checkEmailExists } from '../../lib/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email } = req.body;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    try {
      // Check if email already exists
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        return res.status(409).json({ error: 'Email already on waitlist' });
      }

      // Add email to waitlist
      const success = await addToWaitlist(email);
      
      if (success) {
        return res.status(200).json({ message: 'Successfully added to waitlist' });
      } else {
        return res.status(500).json({ error: 'Error processing waitlist submission' });
      }
    } catch (error) {
      console.error('Waitlist submission error:', error);
      return res.status(500).json({ error: 'Error processing waitlist submission' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

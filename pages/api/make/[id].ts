import {NextApiRequest, NextApiResponse} from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    return res.status(200).json(null);
  }
  if (req.method === 'PATCH') {
    return res.status(200).json(req.body);
  }
}
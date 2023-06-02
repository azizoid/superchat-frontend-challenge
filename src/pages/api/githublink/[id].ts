// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { githubLinksData, Data } from '../../../store/_data'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query

  if (req.method === 'GET') {
    const result = githubLinksData.find(link => link.id === id)

    if (result) {
      res.status(200).json({ ...result })
    } else {
      res.status(404).end(`link ${id} Not Found`)
    }
  }
}

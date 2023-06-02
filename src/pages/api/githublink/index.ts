// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cryptoRandomString from 'crypto-random-string'
import type { NextApiRequest, NextApiResponse } from 'next'

import { githubLinksData, Data, GithubLinksDataProps } from '@/store/_data'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | GithubLinksDataProps>
) {
  switch (req.method) {
    case 'POST':
      const data = { ...JSON.parse(req.body), id: cryptoRandomString({ length: 10 }) }
      githubLinksData.push(data)
      //return the saved data in case if we need to reuse it (which we do)
      res.status(200).json({ data })
      break
    case 'GET':
      res.status(200).json({ data: githubLinksData })
    default:
      res.setHeader('Allow', ['PUT'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

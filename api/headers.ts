import type { VercelRequest, VercelResponse } from '@vercel/node';

const sortObject = (o: unknown) => {
  return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    cookies: req.cookies,
    headers: sortObject(req.headers)
  });
}

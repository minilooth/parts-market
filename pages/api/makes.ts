import {NextApiRequest, NextApiResponse} from "next";
import {PageableUtils} from "../../core/utils/pageable";
import {Make} from "../../core/types/types";

const mocks: Array<Make> = [
  {
    id: 1,
    name: 'BMW',
    createdAt: new Date('2023-03-01T13:18:47.314Z'),
    updatedAt: new Date('2023-03-01T13:18:47.314Z')
  },
  {
    id: 2,
    name: 'Audi',
    createdAt: new Date('2023-03-02T13:18:47.314Z'),
    updatedAt: new Date('2023-03-02T13:18:47.314Z')
  },
  {
    id: 3,
    name: 'Mercedes-Benz',
    createdAt: new Date('2023-03-03T13:18:47.314Z'),
    updatedAt: new Date('2023-03-03T13:18:47.314Z')
  },
  {
    id: 4,
    name: 'Volkswagen',
    createdAt: new Date('2023-03-04T13:18:47.314Z'),
  },
  {
    id: 5,
    name: 'Toyota',
    createdAt: new Date('2023-03-05T13:18:47.314Z'),
  },
  {
    id: 6,
    name: 'Honda',
    createdAt: new Date('2023-03-06T13:18:47.314Z'),
  }
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;

  const page = Number.parseInt(query.page as string);
  const size = Number.parseInt(query.size as string);

  res.status(200).json(PageableUtils.mockPages(mocks, {page, size}))
}
import {Model} from "../../core/types";
import {NextApiRequest, NextApiResponse} from "next";
import {PageableUtils} from "../../core/utils/pageable";

const array: Array<Model> = [
  {
    id: 1,
    makeId: 1,
    name: '3 series',
    createdAt: new Date('2023-03-01T13:18:47.314Z'),
    updatedAt: new Date('2023-03-01T13:18:47.314Z')
  },
  {
    id: 2,
    makeId: 1,
    name: '5 series',
    createdAt: new Date('2023-03-01T13:18:47.314Z'),
    updatedAt: new Date('2023-03-01T13:18:47.314Z')
  },
  {
    id: 3,
    makeId: 1,
    name: '7 series',
    createdAt: new Date('2023-03-01T13:18:47.314Z'),
    updatedAt: new Date('2023-03-01T13:18:47.314Z')
  },
  {
    id: 4,
    makeId: 1,
    name: '6 series',
    createdAt: new Date('2023-03-01T13:18:47.314Z'),
    updatedAt: new Date('2023-03-01T13:18:47.314Z')
  },
  {
    id: 5,
    makeId: 1,
    name: '8 series',
    createdAt: new Date('2023-03-01T13:18:47.314Z'),
    updatedAt: new Date('2023-03-01T13:18:47.314Z')
  },
  {
    id: 6,
    makeId: 1,
    name: '4 series',
    createdAt: new Date('2023-03-01T13:18:47.314Z'),
    updatedAt: new Date('2023-03-01T13:18:47.314Z')
  },
  {
    id: 7,
    makeId: 1,
    name: '1 series',
    createdAt: new Date('2023-03-01T13:18:47.314Z'),
    updatedAt: new Date('2023-03-01T13:18:47.314Z')
  },
  {
    id: 8,
    makeId: 1,
    name: '2 series',
    createdAt: new Date('2023-03-01T13:18:47.314Z'),
    updatedAt: new Date('2023-03-01T13:18:47.314Z')
  },
  {
    id: 9,
    makeId: 2,
    name: 'A4',
    createdAt: new Date('2023-03-02T13:18:47.314Z'),
    updatedAt: new Date('2023-03-02T13:18:47.314Z')
  },
  {
    id: 10,
    makeId: 3,
    name: 'CLS',
    createdAt: new Date('2023-03-03T13:18:47.314Z'),
    updatedAt: new Date('2023-03-03T13:18:47.314Z')
  },
  {
    id: 11,
    makeId: 4,
    name: 'Passat',
    createdAt: new Date('2023-03-04T13:18:47.314Z'),
  },
  {
    id: 12,
    makeId: 5,
    name: 'Celica',
    createdAt: new Date('2023-03-05T13:18:47.314Z'),
  },
  {
    id: 13,
    makeId: 6,
    name: 'Accord',
    createdAt: new Date('2023-03-06T13:18:47.314Z'),
  }
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;
  const makeId = Number.parseInt(query.makeId as string);

  const models = array.filter((model) => model.makeId === makeId);

  if (query.page && query.size) {
    const page = Number.parseInt(query.page as string);
    const size = Number.parseInt(query.size as string);

    res.status(200).json(PageableUtils.mockPages(models, {page, size}))
  }
  else {
    res.status(200).json(PageableUtils.mockPages(models))
  }
}
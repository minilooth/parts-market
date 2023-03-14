import {Generation, Model} from "../../core/types";
import {NextApiRequest, NextApiResponse} from "next";
import {PageableUtils} from "../../core/utils/pageable";

const array: Array<Generation> = [
  {
    id: 1,
    modelId: 1,
    name: 'E30',
    createdAt: new Date('2023-03-01T13:18:47.314Z'),
    updatedAt: new Date('2023-03-01T13:18:47.314Z'),
    issuedFrom: 1990,
    issuedTo: 2000
  },
  {
    id: 2,
    modelId: 1,
    name: 'E36',
    createdAt: new Date('2023-03-01T13:18:47.314Z'),
    updatedAt: new Date('2023-03-01T13:18:47.314Z'),
    issuedFrom: 1990,
    issuedTo: 2000
  },
  {
    id: 3,
    modelId: 1,
    name: 'E46',
    createdAt: new Date('2023-03-01T13:18:47.314Z'),
    updatedAt: new Date('2023-03-01T13:18:47.314Z'),
    issuedFrom: 1990,
    issuedTo: 2000
  },
  {
    id: 4,
    modelId: 1,
    name: 'E46 LCM',
    createdAt: new Date('2023-03-01T13:18:47.314Z'),
    updatedAt: new Date('2023-03-01T13:18:47.314Z'),
    issuedFrom: 1990,
    issuedTo: 2000
  },
  {
    id: 5,
    modelId: 1,
    name: 'E90/E91/E92/E93',
    createdAt: new Date('2023-03-01T13:18:47.314Z'),
    updatedAt: new Date('2023-03-01T13:18:47.314Z'),
    issuedFrom: 1990,
    issuedTo: 2000
  },
  {
    id: 6,
    modelId: 1,
    name: 'E90/E91/E92/E93 LCM',
    createdAt: new Date('2023-03-01T13:18:47.314Z'),
    updatedAt: new Date('2023-03-01T13:18:47.314Z'),
    issuedFrom: 1990,
    issuedTo: 2000
  },
  {
    id: 7,
    modelId: 2,
    name: 'E28',
    createdAt: new Date('2023-03-01T13:18:47.314Z'),
    updatedAt: new Date('2023-03-01T13:18:47.314Z'),
    issuedFrom: 1990,
    issuedTo: 2000
  },
  {
    id: 8,
    modelId: 2,
    name: 'E34',
    createdAt: new Date('2023-03-01T13:18:47.314Z'),
    updatedAt: new Date('2023-03-01T13:18:47.314Z'),
    issuedFrom: 1990,
    issuedTo: 2000
  },
  {
    id: 9,
    modelId: 2,
    name: 'E39',
    createdAt: new Date('2023-03-02T13:18:47.314Z'),
    updatedAt: new Date('2023-03-02T13:18:47.314Z'),
    issuedFrom: 1990,
    issuedTo: 2000
  },
  {
    id: 10,
    modelId: 2,
    name: 'E60/E61',
    createdAt: new Date('2023-03-03T13:18:47.314Z'),
    updatedAt: new Date('2023-03-03T13:18:47.314Z'),
    issuedFrom: 1990,
    issuedTo: 2000
  },
  {
    id: 11,
    modelId: 2,
    name: 'F10/F11',
    createdAt: new Date('2023-03-04T13:18:47.314Z'),
    issuedFrom: 1990,
    issuedTo: 2000
  },
  {
    id: 12,
    modelId: 2,
    name: 'G30',
    createdAt: new Date('2023-03-05T13:18:47.314Z'),
    issuedFrom: 1990,
    issuedTo: 2000
  }
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;
  const modelId = Number.parseInt(query.modelId as string);

  const generations = array.filter((generation) => generation.modelId === modelId);

  if (query.page && query.size) {
    const page = Number.parseInt(query.page as string);
    const size = Number.parseInt(query.size as string);

    res.status(200).json(PageableUtils.mockPages(generations, {page, size}))
  }
  else {
    res.status(200).json(PageableUtils.mockPages(generations))
  }
}
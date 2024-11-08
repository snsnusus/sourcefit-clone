import { rest } from 'msw';

export const handlers = [
  rest.get('*/posts', (_req, res, ctx) => res(ctx.status(200))),
];

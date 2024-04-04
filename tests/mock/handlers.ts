import { http, HttpResponse } from 'msw';
import { db } from './db';

export const handlers = [
  http.get('/tags', () => {
    return HttpResponse.json([
      { id: 1, name: 'Tag1' },
      { id: 2, name: 'Tag2' },
      { id: 3, name: 'Tag3' }
    ])
  }),
  http.post('/tags', () => {
    return HttpResponse.json({ id: 1, name: 'Tag1' })
  }),
  ...db.product.toHandlers('rest'),
  ...db.category.toHandlers('rest')
]
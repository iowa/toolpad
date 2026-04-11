import { NextResponse } from 'next/server';
import { GenresRepository } from '@/app/lib/db/repository/GenresRepository';
import { getDC } from '@/app/lib/db/dm';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const name = url.searchParams.get('name') || undefined;
    const repository = new GenresRepository(getDC('toolpad'));
    const result = await repository.search({ name });
    return NextResponse.json(result);
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}

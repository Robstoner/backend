import { createUser, getAllUsers } from '@/lib/services/users.service';
import { Prisma } from '@prisma/client';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequestWithAuth) {
  try {
    const users = await getAllUsers();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: NextRequestWithAuth) {
  // if (!req.nextauth?.token) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }
  try {
    const data = (await req.json()) as unknown as Prisma.UserCreateInput;

    const user = await createUser(data);

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ error: 'Duplicate entry', entry: error.meta?.target }, { status: 409 });
    }
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

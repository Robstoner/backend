import { deleteUserBySlug, getUserBySlug, updateUserBySlug } from '@/lib/services/users.service';
import { Prisma } from '@prisma/client';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export async function GET(
  req: NextRequestWithAuth,
  context: {
    params: { slug: string };
  }
) {
  try {
    const user = await getUserBySlug(context.params.slug);

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequestWithAuth,
  context: {
    params: { slug: string };
  }
) {
  try {
    const data = (await req.json()) as unknown as Prisma.UserUpdateInput;

    const user = await updateUserBySlug(context.params.slug, data);

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ error: 'Duplicate entry', entry: error.meta?.target }, { status: 409 });
    }
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequestWithAuth,
  context: {
    params: { slug: string };
  }
) {
  try {
    const user = await deleteUserBySlug(context.params.slug);

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

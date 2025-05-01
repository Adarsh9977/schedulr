import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";


export async function POST(request: Request) {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
        return new Response('Missing required fields', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        return new Response(JSON.stringify(user), { status: 201 });
    } catch (error) {
        return new Response('Error creating user', { status: 500 });
    }
}
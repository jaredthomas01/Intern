import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function GET(req, { params }) {
    try {
        
        const { id } = params

        if (!id) {
            return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id),
            },include: {
                student: true
            }
        })
        return new Response(JSON.stringify(user), { status: 200 })

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: 'Failed to fetch user' }), { status: 500 })
    }
}

export async function PUT(req, { params }) {
    try {
        const data = await req.json()
        const { email, role, student } = data
        const { id } = params

        if (!email || !role) {
            return new Response(JSON.stringify({ error: 'Email, password, and role are required' }), { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: parseInt(id),
            },
            data: {
                email,
                role,
                student: student ? {
                    update: student
                } : undefined,
            },
        })

        return new Response(JSON.stringify(updatedUser), { status: 200 })

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: 'Failed to update user' }), { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    try {
    
        const { id } = params

        if (!id || id === '') {
            return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });
        }

        await prisma.user.delete({
            where: {
                id: parseInt(id),
            },
        })

        return new Response(JSON.stringify({ success: true }), { status: 200 })

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: 'Failed to delete user' }), { status: 500 })
    }
}

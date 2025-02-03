import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req, { params }) {
    try {
        const { organizationId } = params;

        const internships = await prisma.jobPosting.findMany({
            where: {
                department: {
                    organizationId: parseInt(organizationId)
                }
            },
            include: {
                skills: true,
                department: true
            }
        });

        return new Response(JSON.stringify(internships), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to fetch internships' }), { status: 500 });
    }
}

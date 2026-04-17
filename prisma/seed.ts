  import * as dotenv from 'dotenv'
dotenv.config()

  import { PrismaClient, Stage } from '@prisma/client'
  import { PrismaPg } from '@prisma/adapter-pg' 
  import { Pool } from 'pg'

  const pool = new Pool({
  connectionString: "postgresql://postgres:LPq4ekhlN2iGMiqW@db.gvqxxuwopejtnidvegog.supabase.co:5432/postgres",
  ssl: { rejectUnauthorized: false },
})

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({
  adapter,
})

  async function main() {
    const org = await prisma.organization.create({
      data: {
        name: 'Acme Corp',
        plan: 'growth',
      },
    })

    const job1 = await prisma.job.create({
      data: {
        orgId: org.id,
        title: 'Senior Software Engineer',
        department: 'Engineering',
        location: 'Remote',
        salary: '$140k–$180k',
        skills: ['React', 'Node.js', 'TypeScript'],
        status: 'active',
      },
    })

    const job2 = await prisma.job.create({
      data: {
        orgId: org.id,
        title: 'Product Manager',
        department: 'Product',
        location: 'New York',
        salary: '$120k–$150k',
        skills: ['Roadmapping', 'SQL', 'Agile'],
        status: 'active',
      },
    })

    const candidateData = [
      { name: 'Sarah Chen', email: 'sarah@email.com', source: 'LinkedIn' },
      { name: 'Arjun Patel', email: 'arjun@email.com', source: 'Indeed' },
      { name: 'Maria Gonzalez', email: 'maria@email.com', source: 'Referral' },
      { name: 'James OBrien', email: 'james@email.com', source: 'LinkedIn' },
      { name: 'Priya Sharma', email: 'priya@email.com', source: 'AngelList' },
    ]

    for (const c of candidateData) {
      const candidate = await prisma.candidate.create({
        data: {
          orgId: org.id,
          name: c.name,
          email: c.email,
          source: c.source,
        },
      })

      await prisma.application.create({
        data: {
          candidateId: candidate.id,
          jobId: job1.id,
          orgId: org.id,
          stage: Stage.NEW,
          aiScore: Math.floor(Math.random() * 40) + 60,
          matchScore: Math.floor(Math.random() * 40) + 60,
          resumeScore: Math.floor(Math.random() * 40) + 60,
          skillsScore: Math.floor(Math.random() * 40) + 60,
          experienceScore: Math.floor(Math.random() * 40) + 60,
        },
      })
    }

    console.log('✅ Database seeded successfully!')
  }

  main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
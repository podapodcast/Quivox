import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.investmentPlan.deleteMany()
  console.log("Seeding investment plans...")

  const investmentPlans = [
    {
      name: "Starter Plan",
      description: "Perfect for beginners looking to start their investment journey",
      minAmount: 100,
      maxAmount: 1000,
      interestRate: 5.5,
      duration: 30,
      isActive: true,
    },
    {
      name: "Growth Plan",
      description: "Balanced plan for steady growth and moderate returns",
      minAmount: 1000,
      maxAmount: 10000,
      interestRate: 8.2,
      duration: 90,
      isActive: true,
    },
    {
      name: "Premium Plan",
      description: "High-yield investment plan for experienced investors",
      minAmount: 10000,
      maxAmount: 100000,
      interestRate: 12.5,
      duration: 180,
      isActive: true,
    },
  ]

  for (const plan of investmentPlans) {
    await prisma.investmentPlan.upsert({
      where: { id: plan.name },
      update: plan,
      create: plan,
    })
  }

  console.log("Investment plans seeded successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

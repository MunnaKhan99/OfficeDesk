import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
    const passwordHash = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD!, 10);

    const admin = await prisma.employee.upsert({
        where: { emailAddress: "munna@impelitsolutions.com" },
        update: {},
        create: {
            name: "System Admin",
            emailAddress: "munna@impelitsolutions.com",
            passwordHash,
            role: "ADMIN",
        },
    });

    console.log("Seeded admin:", admin);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

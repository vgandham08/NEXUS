import { PrismaClient } from '@prisma/client';
import {
  INITIAL_USERS,
  INITIAL_CUSTOMERS,
  INITIAL_PRODUCTS,
} from '../src/services/mockData';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting NexusERP AI SQLite Database Seed...');

  // Clean existing tables
  await prisma.auditLog.deleteMany().catch(() => {});
  await prisma.salesItem.deleteMany().catch(() => {});
  await prisma.salesChallan.deleteMany().catch(() => {});
  await prisma.stockLog.deleteMany().catch(() => {});
  await prisma.followUp.deleteMany().catch(() => {});
  await prisma.customer.deleteMany().catch(() => {});
  await prisma.product.deleteMany().catch(() => {});
  await prisma.user.deleteMany().catch(() => {});

  // Seed Users
  for (const u of INITIAL_USERS) {
    await prisma.user.create({
      data: {
        id: u.id,
        name: u.name,
        email: u.email,
        password: '$2a$10$YourHashedPasswordHereForSecurityDemo',
        role: u.role,
        avatar: u.avatar,
        department: u.department,
      },
    });
  }

  // Seed Customers
  for (const c of INITIAL_CUSTOMERS) {
    await prisma.customer.create({
      data: {
        id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        company: c.company,
        status: c.status,
        tags: c.tags.join(', '),
        avatar: c.avatar,
        pinned: c.pinned,
        totalSpent: c.totalSpent,
        churnRisk: c.churnRisk,
        notes: c.notes,
      },
    });
  }

  // Seed Products
  for (const p of INITIAL_PRODUCTS) {
    await prisma.product.create({
      data: {
        id: p.id,
        name: p.name,
        sku: p.sku,
        category: p.category,
        price: p.price,
        stockQuantity: p.stockQuantity,
        minStockLevel: p.minStockLevel,
        warehouseLocation: p.warehouseLocation,
        status: p.status,
      },
    });
  }

  console.log('✅ NexusERP AI SQLite Database Seeding Complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
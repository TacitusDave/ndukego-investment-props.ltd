import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const PERMISSIONS = [
  // Company
  { code: 'company.read', name: 'View Company', resource: 'company', action: 'read' },
  { code: 'company.update', name: 'Update Company', resource: 'company', action: 'update' },
  // Estate
  { code: 'estate.create', name: 'Create Estate', resource: 'estate', action: 'create' },
  { code: 'estate.read', name: 'View Estate', resource: 'estate', action: 'read' },
  { code: 'estate.update', name: 'Update Estate', resource: 'estate', action: 'update' },
  { code: 'estate.delete', name: 'Delete Estate', resource: 'estate', action: 'delete' },
  // Property
  { code: 'property.create', name: 'Create Property', resource: 'property', action: 'create' },
  { code: 'property.read', name: 'View Property', resource: 'property', action: 'read' },
  { code: 'property.update', name: 'Update Property', resource: 'property', action: 'update' },
  { code: 'property.delete', name: 'Delete Property', resource: 'property', action: 'delete' },
  { code: 'property.publish', name: 'Publish Property', resource: 'property', action: 'publish' },
  { code: 'property.approve', name: 'Approve Property', resource: 'property', action: 'approve' },
  { code: 'property.archive', name: 'Archive Property', resource: 'property', action: 'archive' },
  // Customer
  { code: 'customer.create', name: 'Create Customer', resource: 'customer', action: 'create' },
  { code: 'customer.read', name: 'View Customer', resource: 'customer', action: 'read' },
  { code: 'customer.update', name: 'Update Customer', resource: 'customer', action: 'update' },
  // Reservation
  { code: 'reservation.create', name: 'Create Reservation', resource: 'reservation', action: 'create' },
  { code: 'reservation.read', name: 'View Reservation', resource: 'reservation', action: 'read' },
  { code: 'reservation.update', name: 'Update Reservation', resource: 'reservation', action: 'update' },
  { code: 'reservation.cancel', name: 'Cancel Reservation', resource: 'reservation', action: 'cancel' },
  // Sale
  { code: 'sale.create', name: 'Create Sale', resource: 'sale', action: 'create' },
  { code: 'sale.read', name: 'View Sale', resource: 'sale', action: 'read' },
  { code: 'sale.update', name: 'Update Sale', resource: 'sale', action: 'update' },
  { code: 'sale.approve', name: 'Approve Sale', resource: 'sale', action: 'approve' },
  // Payment
  { code: 'payment.create', name: 'Record Payment', resource: 'payment', action: 'create' },
  { code: 'payment.read', name: 'View Payment', resource: 'payment', action: 'read' },
  { code: 'payment.verify', name: 'Verify Payment', resource: 'payment', action: 'verify' },
  // Inspection
  { code: 'inspection.create', name: 'Create Inspection', resource: 'inspection', action: 'create' },
  { code: 'inspection.read', name: 'View Inspection', resource: 'inspection', action: 'read' },
  { code: 'inspection.update', name: 'Update Inspection', resource: 'inspection', action: 'update' },
  // Document
  { code: 'document.upload', name: 'Upload Document', resource: 'document', action: 'upload' },
  { code: 'document.read', name: 'View Document', resource: 'document', action: 'read' },
  { code: 'document.download', name: 'Download Document', resource: 'document', action: 'download' },
  { code: 'document.verify', name: 'Verify Document', resource: 'document', action: 'verify' },
  { code: 'document.approve', name: 'Approve Document', resource: 'document', action: 'approve' },
  // Employee
  { code: 'employee.create', name: 'Create Employee', resource: 'employee', action: 'create' },
  { code: 'employee.read', name: 'View Employee', resource: 'employee', action: 'read' },
  { code: 'employee.update', name: 'Update Employee', resource: 'employee', action: 'update' },
  // Vendor
  { code: 'vendor.create', name: 'Create Vendor', resource: 'vendor', action: 'create' },
  { code: 'vendor.read', name: 'View Vendor', resource: 'vendor', action: 'read' },
  { code: 'vendor.update', name: 'Update Vendor', resource: 'vendor', action: 'update' },
  // Appointment
  { code: 'appointment.create', name: 'Create Appointment', resource: 'appointment', action: 'create' },
  { code: 'appointment.read', name: 'View Appointment', resource: 'appointment', action: 'read' },
  { code: 'appointment.update', name: 'Update Appointment', resource: 'appointment', action: 'update' },
  // Audit
  { code: 'audit.read', name: 'View Audit Logs', resource: 'audit', action: 'read' },
  // AI
  { code: 'ai.use', name: 'Use AI Assistant', resource: 'ai', action: 'use' },
  // Dashboard
  { code: 'dashboard.read', name: 'View Dashboard', resource: 'dashboard', action: 'read' },
  // Settings
  { code: 'settings.manage', name: 'Manage Settings', resource: 'settings', action: 'manage' },
] as const;

const ROLES = [
  {
    code: 'SUPER_ADMIN',
    name: 'Super Administrator',
    description: 'Full system access',
    isSystem: true,
    permissions: PERMISSIONS.map((p) => p.code),
  },
  {
    code: 'EXECUTIVE',
    name: 'Executive',
    description: 'Approve, archive, analytics, override',
    isSystem: true,
    permissions: PERMISSIONS.filter((p) => !p.code.startsWith('settings')).map((p) => p.code),
  },
  {
    code: 'SALES_STAFF',
    name: 'Sales Staff',
    description: 'Create properties, manage customers, sales',
    isSystem: true,
    permissions: [
      'property.create', 'property.read', 'property.update',
      'customer.create', 'customer.read', 'customer.update',
      'reservation.create', 'reservation.read', 'reservation.update',
      'sale.create', 'sale.read', 'sale.update',
      'payment.read', 'inspection.read',
      'document.upload', 'document.read',
      'appointment.create', 'appointment.read', 'appointment.update',
      'ai.use', 'dashboard.read',
    ],
  },
  {
    code: 'INSPECTOR',
    name: 'Inspector',
    description: 'Upload inspection reports',
    isSystem: true,
    permissions: [
      'property.read', 'inspection.create', 'inspection.read', 'inspection.update',
      'document.upload', 'document.read', 'appointment.read', 'ai.use',
    ],
  },
  {
    code: 'LEGAL_OFFICER',
    name: 'Legal Officer',
    description: 'Verify titles, approve legal documents',
    isSystem: true,
    permissions: [
      'property.read', 'property.approve',
      'document.upload', 'document.read', 'document.download', 'document.verify', 'document.approve',
      'customer.read', 'sale.read', 'ai.use',
    ],
  },
  {
    code: 'MARKETING',
    name: 'Marketing Team',
    description: 'Publish ads, SEO, featured listings',
    isSystem: true,
    permissions: [
      'property.read', 'property.update', 'property.publish',
      'estate.read', 'document.read', 'document.upload',
      'ai.use', 'dashboard.read',
    ],
  },
  {
    code: 'FINANCE',
    name: 'Finance',
    description: 'Valuations, payments, invoices',
    isSystem: true,
    permissions: [
      'property.read', 'customer.read', 'sale.read', 'sale.update',
      'payment.create', 'payment.read', 'payment.verify',
      'document.upload', 'document.read', 'document.download',
      'ai.use', 'dashboard.read',
    ],
  },
  {
    code: 'PROPERTY_MANAGER',
    name: 'Property Manager',
    description: 'Manage estates, properties, maintenance docs',
    isSystem: true,
    permissions: [
      'estate.create', 'estate.read', 'estate.update',
      'property.create', 'property.read', 'property.update',
      'inspection.create', 'inspection.read', 'inspection.update',
      'document.upload', 'document.read', 'vendor.read',
      'ai.use', 'dashboard.read',
    ],
  },
  {
    code: 'HR_MANAGER',
    name: 'HR Manager',
    description: 'Employee records, onboarding',
    isSystem: true,
    permissions: [
      'employee.create', 'employee.read', 'employee.update',
      'document.upload', 'document.read', 'ai.use',
    ],
  },
  {
    code: 'CUSTOMER',
    name: 'Customer',
    description: 'View published properties, reserve, inspect',
    isSystem: true,
    permissions: [
      'property.read', 'reservation.create', 'reservation.read',
      'appointment.create', 'appointment.read',
      'payment.read', 'document.read', 'document.download',
      'ai.use',
    ],
  },
] as const;

async function main() {
  console.log('🌱 Seeding NHGP system bootstrap (roles, permissions, company structure)...');

  for (const perm of PERMISSIONS) {
    await prisma.permission.upsert({
      where: { code: perm.code },
      update: { name: perm.name, resource: perm.resource, action: perm.action },
      create: perm,
    });
  }
  console.log(`✅ ${PERMISSIONS.length} permissions seeded`);

  for (const roleDef of ROLES) {
    const role = await prisma.role.upsert({
      where: { code: roleDef.code },
      update: { name: roleDef.name, description: roleDef.description },
      create: {
        code: roleDef.code,
        name: roleDef.name,
        description: roleDef.description,
        isSystem: roleDef.isSystem,
      },
    });

    for (const permCode of roleDef.permissions) {
      const permission = await prisma.permission.findUnique({ where: { code: permCode } });
      if (permission) {
        await prisma.rolePermission.upsert({
          where: { roleId_permissionId: { roleId: role.id, permissionId: permission.id } },
          update: {},
          create: { roleId: role.id, permissionId: permission.id },
        });
      }
    }
  }
  console.log(`✅ ${ROLES.length} roles seeded with permissions`);

  const departments = [
    { code: 'EXEC', name: 'Executive Office' },
    { code: 'SALES', name: 'Sales & Marketing' },
    { code: 'LEGAL', name: 'Legal & Compliance' },
    { code: 'FIN', name: 'Finance & Accounts' },
    { code: 'PROP', name: 'Property Management' },
    { code: 'HR', name: 'Human Resources' },
    { code: 'IT', name: 'Information Technology' },
    { code: 'OPS', name: 'Operations' },
  ];

  for (const dept of departments) {
    await prisma.department.upsert({
      where: { code: dept.code },
      update: { name: dept.name },
      create: dept,
    });
  }
  console.log(`✅ ${departments.length} departments seeded`);

  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
  const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD;

  if (superAdminEmail && superAdminPassword) {
    const existingUser = await prisma.user.findUnique({ where: { email: superAdminEmail } });
    if (!existingUser) {
      let company = await prisma.company.findFirst();
      if (!company) {
        company = await prisma.company.create({
          data: {
            name: process.env.COMPANY_NAME || 'Ndukego Investments & Properties',
            legalName: process.env.COMPANY_LEGAL_NAME || 'Ndukego Investments & Properties Limited',
            email: process.env.COMPANY_EMAIL || 'info@ndukego.com',
            phone: process.env.COMPANY_PHONE || '',
            country: 'Nigeria',
          },
        });
        console.log('✅ Default company created');
      }

      const passwordHash = await bcrypt.hash(superAdminPassword, 12);
      const employeeNumber = `EMP-${Date.now()}`;

      const employee = await prisma.employee.create({
        data: {
          companyId: company.id,
          employeeNumber,
          firstName: process.env.SUPER_ADMIN_FIRST_NAME || 'Super',
          lastName: process.env.SUPER_ADMIN_LAST_NAME || 'Admin',
          email: superAdminEmail,
          phone: process.env.SUPER_ADMIN_PHONE || '',
          jobTitle: 'System Administrator',
          employmentType: 'FULL_TIME',
          status: 'ACTIVE',
          isVerified: true,
          hireDate: new Date(),
        },
      });

      const user = await prisma.user.create({
        data: {
          email: superAdminEmail,
          passwordHash,
          type: 'EMPLOYEE',
          status: 'ACTIVE',
          emailVerified: true,
          emailVerifiedAt: new Date(),
          employeeId: employee.id,
        },
      });

      const superAdminRole = await prisma.role.findUnique({ where: { code: 'SUPER_ADMIN' } });
      if (superAdminRole) {
        await prisma.employeeRole.create({
          data: { employeeId: employee.id, roleId: superAdminRole.id },
        });
      }

      console.log(`✅ Super admin created: ${superAdminEmail} (User ID: ${user.id})`);
    } else {
      console.log('ℹ️  Super admin already exists, skipping');
    }
  } else {
    console.log('ℹ️  Set SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD to create super admin on seed');
  }

  console.log('🎉 NHGP system bootstrap complete');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

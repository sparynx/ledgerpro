const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createAdmin(firebaseUid, email, displayName, username, stateCode) {
  try {
    const admin = await prisma.user.upsert({
      where: { firebaseUid },
      update: {
        isAdmin: true,
        username,
        stateCode,
        displayName,
        email,
      },
      create: {
        firebaseUid,
        email,
        displayName,
        username,
        stateCode,
        isAdmin: true,
      },
    });

    console.log('✅ Admin user created/updated successfully:', admin);
    return admin;
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    throw error;
  }
}

async function main() {
  // Example usage - replace with actual Firebase UID and details
  const adminData = {
    firebaseUid: 'pQtrVGuUVzgGrEaPEARTFTNcRMb2',
    email: 'adebisitimileyin23@gmail.com',
    displayName: 'CDS Admin',
    username: 'cds_admin',
    stateCode: 'FC/25A/11981',
  };

  try {
    await createAdmin(
      adminData.firebaseUid,
      adminData.email,
      adminData.displayName,
      adminData.username,
      adminData.stateCode
    );
  } catch (error) {
    console.error('Failed to create admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main();
}

module.exports = { createAdmin }; 
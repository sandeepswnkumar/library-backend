// import { seedRoles } from "./role.seeder";
// import { seedPermissions } from "./permission.seeder";
// import { seedBookingStatus } from "./booking-status.seeder";
import { seedUserType } from "./userType.seeder.js";

async function main() {
  console.log("here")
  await seedUserType()
  // await seedRoles();
  // await seedPermissions();
  // await seedBookingStatus();
}

main()
  .then(() => {
    console.log("🌱 Seeding finished.");
    process.exit(0);
  })
  .catch((e) => {
    console.error("error while seeding : ", e);
    process.exit(1);
  });

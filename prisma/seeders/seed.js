import { seedPermissions } from "./permissions.seeder.js";
import { seedCity } from "./city.seeder.js";
import { seedCountry } from "./country.seeder.js";
import { seedState } from "./state.seeder.js";
import { seedUserType } from "./userType.seeder.js";
import { seedRoles } from "./role.seeder.js";
import { seedUser } from "./user.seeder.js";
import { seedUserPagePermission } from "./pagePermission.seeder.js";
import { seedBookingStatus } from "./bookingStatus.seeder.js";
import { seedPage } from "./page.seeder.js";
import { seedLibraryStatus } from "./libraryStatus.seeder.js";
import { seedLibraryType } from "./libraryType.js";

async function main() {
  await seedUserType()
  await seedCountry()
  await seedState()
  await seedCity()
  await seedPermissions()
  await seedRoles()
  await seedUser()
  await seedPage()
  await seedUserPagePermission()
  await seedBookingStatus();

  await seedLibraryStatus();
  await seedLibraryType();
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

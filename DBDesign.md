User
id, email, password, phone, isActive, userTypeId, emailVerifiedAt, phoneVerifiedAt, rememberToken, refreshToken, createdBy, updatedBy, deletedBy, createdAt, updatedAt, deletedAt

UserDetails
id, userId, firstName, middleName, lastName, address1, address2, cityId, stateId, countryId, pincode, createdBy, updatedBy, deletedBy, createdAt, updatedAt, deletedAt

Token
id, token, userId, expireIn, createdAt, updatedAt

Roles
id, name, description, createdBy, createdAt

Permissions
id, name(view, create, update, delete), description, createdBy, createdAt

pages
id, name, path, createdBy, createdAt

User Page Permission
id, userId, pageId, permissionId, createdBy, createdAt //Composite key(userId, pageId, permissionId)

Library
id, libraryName, diamension, floor, capacity, statusId, typeId, createdBy, updatedBy, deletedBy, createdAt, updatedAt, deletedAt

LibraryLocation
id, libraryId, email, phone, address1, address2, cityId, stateId, countryId, pincode, latitude, longitude, mapUrl, isActive, createdBy, updatedBy, deletedBy, createdAt, updatedAt, deletedAt

LibraryFacility
id, libraryId, libraryLocationId, name, description, imageUrl, createdBy, updatedBy, deletedBy, createdAt, updatedAt, deletedAt

UserLibrary
id, libraryId, libraryLocationId, userId, createdBy, createdAt Composite key(libraryId, libraryLocationId, userId)

Booking
id, libraryLocationId, userId, statusId, expireOn, isExpired, amount, createdBy, updatedBy, deletedBy, createdAt, updatedAt, deletedAt

BookingDetails
id, bookingId, unit, rate, noOfUnit, start_date, start_time

Coupon
id, name, description, unit(PERCENTAGE, FLAT), noOfNunit, createdBy, createdAt

UserType
id, name, createdBy, createdAt

City
id, name, createdBy, createdAt

State
id, name, createdBy, createdAt

Country
id, name, createdBy, createdAt

LibraryType
id, name, createdBy, createdAt

LiberaryStatus
id, name, createdBy, createdAt

BookingUnit
id, name, rate, createdBy, createdAt
/*
Hourly -> Rate 10/h
Daily -> Rate 120/d
Monthly -> Rate 900/m
*/

BookingStatus
id, name, createdBy, createdAt

Payment
id, userId, bookingId, amount, paymentMethod (e.g. UPI, Card, Cash), status (PENDING, SUCCESS, FAILED), transactionId, paidAt, createdAt, updatedAt
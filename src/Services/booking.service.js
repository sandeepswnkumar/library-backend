import BookingStatus from "../Enums/bookingStatusEnum.js";
import { prisma } from "../prismaClient.js";
import { getLibraryShiftAndPrice } from "./libraryShift.service.js";

// Create a new booking
export const createBooking = async (payload, userId) => {
    const {
        libraryLocationId,
        roomType,
        unit,
        noOfUnit,
        shiftPeriod,
        bookingAmount,
        discountPercentage,
        discountAmount,
        totalAmount,
        startDate
    } = payload;

    // Convert DD/MM/YYYY → Date
    const [day, month, year] = startDate.split('/');
    const parsedStartDate = new Date(`${year}-${month}-${day}`);

    if (totalAmount !== bookingAmount - discountAmount) {
        throw new Error("Invalid total amount calculation");
    }

    const shift = await getLibraryShiftAndPrice({
        libraryLocationId: Number(libraryLocationId),
        libraryRoomTypeId: roomType,
        libraryBookingUnitId: unit,
        period: shiftPeriod
    })
    console.log("shift ==== ", shift)
    if (!shift) {
        throw new Error("Invalid Shift");
    }

    return await prisma.booking.create({
        data: {
            libraryLocationId: Number(libraryLocationId),
            userId,
            statusId: BookingStatus.PENDING, // ACTIVE / CREATED
            createdBy: userId,
            details: {
                create: {
                    noOfUnit,
                    roomType: shift.roomType.roomType,
                    unit: shift.bookingUnit.bookingUnit,
                    shiftPeriod: shift.period,
                    rate: shift.rate,
                    shiftStartTime: shift.startTime,
                    shiftEndTime: shift.endTime,
                    startDate: parsedStartDate,
                    bookingAmount,
                    discountPercentage,
                    discountAmount,
                    totalAmount,
                }
            }
        },
        include: {
            details: true
        }
    });
};

// Update a booking by ID
export const updateBooking = async (bookingId, bookingData) => {
    return await prisma.booking.update({
        where: { id: bookingId },
        data: { ...bookingData },
    });
};

// Soft delete a booking by ID (can set deletedAt)
export const deleteBooking = async (bookingId, deletedBy) => {
    return await prisma.booking.update({
        where: { id: bookingId },
        data: { deletedAt: new Date(), deletedBy },
    });
};

// Check if booking exists with conditions (e.g. by ID or status)
export const bookingExists = async (conditions) => {
    return await prisma.booking.findUnique({
        where: conditions,
    });
};

// Get a specific booking with related data (like location, user, status, etc.)
export const getBooking = async (bookingId) => {
    return await prisma.booking.findFirst({
        where: { id: bookingId },
        include: {
            location: {
                include: {
                    library: true,
                    roomTypes : true,
                    libraryBookingUnit : true,
                }
            },
            user: true,
            status: true,
            details: true,
            payments: true,
            subscriptions: true,
            invoice: true,
            notifications: true,
        },
    });
};

// Get multiple bookings with conditions and pagination
export const getBookings = async ({ conditions, pagination }) => {
    return await prisma.booking.findMany({
        where: { ...conditions },
        ...pagination,
        include: {
            location: {
                include: {
                    library: true
                }
            },
            user: true,
            status: true,
            details: true
        },
    });
};

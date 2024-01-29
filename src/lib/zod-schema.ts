import { FleetStatus, FleetType, UserRole } from "@prisma/client";
import * as z from "zod";

export const loginSchema = z.object({
  email: z.string({
    required_error: "Email is required",
  }).email().min(2, {
    message: "Email must be at least 2 characters long",
  }),
  password: z.string({
    required_error: "Password is required",
  }).min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export const registerSchema = z.object({
  email: z.string({
    required_error: "Email is required",
  }).email({
    message: "Invalid email",
  }).min(2, {
    message: "Email must be at least 2 characters long",
  }),
  password: z.string({
    required_error: "Password is required",
  }).min(6, {
    message: "Password must be at least 6 characters long",
  }),
  confirmPassword: z.string({
    required_error: "Confirm Password is required",
  }).min(6, {
    message: "Confirm Password must be at least 6 characters long",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const userSchema = z.object({
  email: z.string({
    required_error: "Email is required",
  }).email({
    message: "Invalid Email",
  }).min(2, {
    message: "Email must be at least 2 characters long",
  }),
  password: z.string({
    required_error: "Password is required",
  }).min(6, {
    message: "Password must be at least 6 characters long",
  }),
  confirmPassword: z.string({
    required_error: "Password is required",
  }).min(6, {
    message: "Password must be at least 6 characters long",
  }),
  role: z.nativeEnum(UserRole, {
    required_error: "Role is required",
  }),
  isVerified: z.boolean(),
  isOnboarded: z.boolean(),
});

export const updateUserSchema = z.object({
  userId: z.string(),
  email: z.string({
    required_error: "Email is required",
  }).email({
    message: "Invalid Email",
  }).min(2, {
    message: "Email must be at least 2 characters long",
  }),
  role: z.nativeEnum(UserRole, {
    required_error: "Role is required",
  }),
})

export const fleetFormSchema = z.object({
  fleetNumber: z.string({
    required_error: "Fleet Number is required",
  }).min(2, {
    message: "Fleet Number must be at least 2 characters long",
  }),
  regNumber: z.string({
    required_error: "Registration Number is required",
  }).min(2, {
    message: "Registration Number must be at least 2 characters long",
  }),
  make: z.string({
    required_error: "Make is required",
  }).min(2, {
    message: "Make must be at least 2 characters long",
  }),
  model: z.string({
    required_error: "Model is required",
  }).min(2, {
    message: "Model must be at least 2 characters long",
  }),
  year: z.preprocess((args) => (args === "" ? undefined : args), z.coerce.number().min(2000, {
    message: "Year must be at least 2000",
  }).max(new Date().getFullYear(), {
    message: "Year cannot be greater than current year",
  }),
  ),
  type: z.nativeEnum(FleetType, {
    required_error: "Type is required",
  }),
  color: z.string({
    required_error: "Color is required",
  }).min(2, {
    message: "Color must be at least 2 characters long",
  }),
  status: z.nativeEnum(FleetStatus, {
    required_error: "Status is required",
  }),
  fcExpDate: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce.date({
      required_error: "Fitness Certificate Expiry Date is required",
    }),
  ),
  capacity: z.preprocess((args) => (args === "" ? undefined : args), z.coerce.number()),
  ac: z.preprocess((args) => (args === "" ? undefined : args), z.coerce.boolean({
    required_error: "AC is required",
  }),
  ),
});

export const updateFleetFormSchema = z.object({
  fleetNumber: z.string({
    required_error: "Fleet Number is required",
  }).min(2, {
    message: "Fleet Number must be at least 2 characters long",
  }),
  regNumber: z.string({
    required_error: "Registration Number is required",
  }).min(2, {
    message: "Registration Number must be at least 2 characters long",
  }),
  make: z.string({
    required_error: "Make is required",
  }).min(2, {
    message: "Make must be at least 2 characters long",
  }),
  model: z.string({
    required_error: "Model is required",
  }).min(2, {
    message: "Model must be at least 2 characters long",
  }),
  year: z.preprocess((args) => (args === "" ? undefined : args), z.coerce.number().min(2000, {
    message: "Year must be at least 2000",
  }).max(new Date().getFullYear(), {
    message: "Year cannot be greater than current year",
  })),
  type: z.nativeEnum(FleetType, {
    required_error: "Type is required",
  }),
  color: z.string({
    required_error: "Color is required",
  }).min(2, {
    message: "Color must be at least 2 characters long",
  }),
  status: z.nativeEnum(FleetStatus, {
    required_error: "Status is required",
  }),
  fcExpDate: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce.date({
      required_error: "Fitness Certificate Expiry Date is required",
    }),
  ),
  capacity: z.preprocess((args) => (args === "" ? undefined : args), z.coerce.number()),
  ac: z.preprocess((args) => (args === "" ? undefined : args), z.coerce.boolean({
    required_error: "AC is required",
  }),
  ),
});

export const routeSchema = z.object({
  routeName: z.string({
    required_error: "Route Number is required",
  }).min(2, {
    message: "Route Number must be at least 2 characters long",
  }),
  stops: z.string({
    required_error: "Stops are required",
  }),
  passengerCount: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce.number().min(20, {
      message: "Passenger Count must be at least 2",
    }).max(60, {
      message: "Passenger Count cannot be greater than 15",
    }),
  ),
  startTime: z.string({
    required_error: "Start Time is required",
  }),
  endTime: z.string({
    required_error: "End Time is required",
  }),
  startPoint: z.string({
    required_error: "Start Point is required",
  }),
  distance: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce.number().min(15, {
      message: "Distance must be at least 15 kms",
    }).max(180, {
      message: "Distance cannot be greater than 50 kms",
    }),
  ),
  duration: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce.number().min(30, {
      message: "Duration must be at least 30",
    }).max(180, {
      message: "Duration cannot be greater than 180",
    }),
  ),
  driverName: z.string({
    required_error: "Driver name is required"
  }),
  fleetNumber: z.string({
    required_error: "Fleet Number is required"
  })
});


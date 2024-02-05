import {
  FleetStatus,
  FleetType,
  UserRole,
  OrganizationType,
} from "@prisma/client";
import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email()
    .min(2, {
      message: "Email must be at least 2 characters long",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    }),
});

export const registerSchema = z
  .object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message: "Invalid email",
      })
      .min(2, {
        message: "Email must be at least 2 characters long",
      }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, {
        message: "Password must be at least 6 characters long",
      }),
    confirmPassword: z
      .string({
        required_error: "Confirm Password is required",
      })
      .min(6, {
        message: "Confirm Password must be at least 6 characters long",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const userSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid Email",
    })
    .min(2, {
      message: "Email must be at least 2 characters long",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    }),
  confirmPassword: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
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
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid Email",
    })
    .min(2, {
      message: "Email must be at least 2 characters long",
    }),
  role: z.nativeEnum(UserRole, {
    required_error: "Role is required",
  }),
});

export const fleetFormSchema = z.object({
  fleetNumber: z
    .string({
      required_error: "Fleet Number is required",
    })
    .min(2, {
      message: "Fleet Number must be at least 2 characters long",
    }),
  regNumber: z
    .string({
      required_error: "Registration Number is required",
    })
    .min(2, {
      message: "Registration Number must be at least 2 characters long",
    }),
  make: z
    .string({
      required_error: "Make is required",
    })
    .min(2, {
      message: "Make must be at least 2 characters long",
    }),
  model: z
    .string({
      required_error: "Model is required",
    })
    .min(2, {
      message: "Model must be at least 2 characters long",
    }),
  year: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number()
      .min(2000, {
        message: "Year must be at least 2000",
      })
      .max(new Date().getFullYear(), {
        message: "Year cannot be greater than current year",
      }),
  ),
  type: z.nativeEnum(FleetType, {
    required_error: "Type is required",
  }),
  color: z
    .string({
      required_error: "Color is required",
    })
    .min(2, {
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
  capacity: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce.number(),
  ),
  ac: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce.boolean({
      required_error: "AC is required",
    }),
  ),
});

export const updateFleetFormSchema = z.object({
  fleetNumber: z
    .string({
      required_error: "Fleet Number is required",
    })
    .min(2, {
      message: "Fleet Number must be at least 2 characters long",
    }),
  regNumber: z
    .string({
      required_error: "Registration Number is required",
    })
    .min(2, {
      message: "Registration Number must be at least 2 characters long",
    }),
  make: z
    .string({
      required_error: "Make is required",
    })
    .min(2, {
      message: "Make must be at least 2 characters long",
    }),
  model: z
    .string({
      required_error: "Model is required",
    })
    .min(2, {
      message: "Model must be at least 2 characters long",
    }),
  year: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number()
      .min(2000, {
        message: "Year must be at least 2000",
      })
      .max(new Date().getFullYear(), {
        message: "Year cannot be greater than current year",
      }),
  ),
  type: z.nativeEnum(FleetType, {
    required_error: "Type is required",
  }),
  color: z
    .string({
      required_error: "Color is required",
    })
    .min(2, {
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
  capacity: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce.number(),
  ),
  ac: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce.boolean({
      required_error: "AC is required",
    }),
  ),
});

export const routeSchema = z.object({
  routeName: z
    .string({
      required_error: "Route Number is required",
    })
    .min(2, {
      message: "Route Number must be at least 2 characters long",
    }),
  stops: z.array(z.string()),
  passengerCount: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number()
      .min(20, {
        message: "Passenger Count must be at least 2",
      })
      .max(60, {
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
    z.coerce
      .number()
      .min(15, {
        message: "Distance must be at least 15 kms",
      })
      .max(180, {
        message: "Distance cannot be greater than 50 kms",
      }),
  ),
  duration: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number()
      .min(30, {
        message: "Duration must be at least 30",
      })
      .max(180, {
        message: "Duration cannot be greater than 180",
      }),
  ),
  driverName: z.string({
    required_error: "Driver name is required",
  }),
  fleetNumber: z.string({
    required_error: "Fleet Number is required",
  }),
});

export const updateRouteSchema = z.object({
  routeName: z
    .string({
      required_error: "Route Number is required",
    })
    .min(2, {
      message: "Route Number must be at least 2 characters long",
    }),
  stops: z.array(z.string()),
  passengerCount: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number()
      .min(20, {
        message: "Passenger Count must be at least 2",
      })
      .max(60, {
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
    z.coerce
      .number()
      .min(15, {
        message: "Distance must be at least 15 kms",
      })
      .max(180, {
        message: "Distance cannot be greater than 50 kms",
      }),
  ),
  duration: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number()
      .min(30, {
        message: "Duration must be at least 30",
      })
      .max(180, {
        message: "Duration cannot be greater than 180",
      }),
  ),
});

export const stopSchema = z.object({
  stopName: z
    .string({
      required_error: "Stop Name is required",
    })
    .min(2, {
      message: "Stop Name must be at least 2 characters long",
    }),
  lat: z.string({
    required_error: "Latitude is required",
  }),
  lng: z.string({
    required_error: "Longitude is required",
  }),
  fleetNumber: z.string({
    required_error: "Fleet Number is required",
  }),
  routeName: z.string({
    required_error: "Route Number is required",
  }),
  pickupTime: z.string({
    required_error: "Pickup Time is required",
  }),
  dropTime: z.string({
    required_error: "Drop Time is required",
  }),
  passengerCount: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number()
      .min(2, {
        message: "Passenger Count must be at least 2",
      })
      .max(15, {
        message: "Passenger Count cannot be greater than 15",
      }),
  ),
});

export const updateStopSchema = z.object({
  stopName: z
    .string({
      required_error: "Stop Name is required",
    })
    .min(2, {
      message: "Stop Name must be at least 2 characters long",
    }),
  // fleetNumber: z.string({
  //   required_error: "Fleet Number is required",
  // }),
  // routeName: z.string({
  //   required_error: "Route Number is required",
  // }),
  pickupTime: z.string({
    required_error: "Pickup Time is required",
  }),
  dropTime: z.string({
    required_error: "Drop Time is required",
  }),
  passengerCount: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number()
      .min(2, {
        message: "Passenger Count must be at least 2",
      })
      .max(15, {
        message: "Passenger Count cannot be greater than 15",
      }),
  ),
});

export const organizationFormSchema = z.object({
  orgName: z
    .string({
      required_error: "Organization name is required",
    })
    .min(3, {
      message: "Organization name must be at least 3 characters long",
    }),
  orgType: z.nativeEnum(OrganizationType),
  fleetsCount: z
    .string()
    .refine((value) => parseInt(value, 10), {
      message: "Fleets count must be a valid number",
    })
    .refine((value) => parseInt(value) >= 50, {
      message: "Fleets count must be at least 50",
    })
    .refine((value) => parseInt(value) <= 200, {
      message: "Fleets count cannot be greater than 200",
    }),
  routesCount: z
    .string()
    .refine((value) => parseInt(value, 10), {
      message: "Fleets count must be a valid number",
    })
    .refine((value) => parseInt(value, 10) >= 50, {
      message: "Fleets count must be at least 50",
    })
    .refine((value) => parseInt(value, 10) <= 200, {
      message: "Fleets count cannot be greater than 200",
    }),
  phone: z
    .object({
      adminPhoneNumber: z
        .string({
          required_error: "Admin Phone Number is required",
        })
        .refine((value) => /^\d+$/.test(value), {
          message: "Admin Phone Number must be a valid phone number",
        }),
      altAdminPhoneNumber: z
        .string({
          required_error: "Alternate Phone Number is required",
        })
        .refine((value) => /^\d+$/.test(value), {
          message: "Alternate Admin Phone must be a valid phone number",
        }),
    })
    .refine((data) => data.adminPhoneNumber !== data.altAdminPhoneNumber, {
      message:
        "Alternate Admin Phone Number must be different from Admin Phone Number",
      path: ["altAdminPhoneNumber"],
    }),
  crewsCount: z
    .string()
    .refine((value) => parseInt(value, 10), {
      message: "Fleets count must be a valid number",
    })
    .refine((value) => parseInt(value, 10) >= 50, {
      message: "Fleets count must be at least 50",
    })
    .refine((value) => parseInt(value, 10) <= 200, {
      message: "Fleets count cannot be greater than 200",
    }),
  passengersCount: z
    .string()
    .refine((value) => parseInt(value, 10), {
      message: "Fleets count must be a valid number",
    })
    .refine((value) => parseInt(value, 10) >= 1000, {
      message: "Fleets count must be at least 1000",
    })
    .refine((value) => parseInt(value, 10) <= 10000, {
      message: "Fleets count cannot be greater than 10000",
    }),
  adminName: z
    .string({
      required_error: "Admin name is required",
    })
    .min(3, {
      message: "Admin name must be at least 3 characters long",
    }),
  adminEmail: z
    .string({
      required_error: "Admin email is required",
    })
    .email({
      message: "Admin email must be a valid email",
    })
    .min(3, {
      message: "Admin email must be at least 3 characters long",
    }),
  addressLine1: z
    .string({
      required_error: "Address Line 1 is required",
    })
    .min(3, {
      message: "Address Line 1 must be at least 3 characters long",
    }),
  addressLine2: z.string().optional(),
  addressLine3: z.string().optional(),
  state: z
    .string({
      required_error: "State is required",
    })
    .min(3, {
      message: "State must be at least 3 characters long",
    }),
  city: z
    .string({
      required_error: "City is required",
    })
    .min(3, {
      message: "City must be at least 3 characters long",
    }),
  pincode: z
    .string({
      required_error: "Pincode is required",
    })
    .max(6, {
      message: "Pincode must be at most 6 characters long",
    })
    .refine((value) => /^\d+$/.test(value), {
      message: "Pincode must be a valid pincode",
    }),
});

export const passengerFormSchema = z.object({
  firstName: z.string({
    required_error: "First Name is required",
  }),
  lastName: z.string({
    required_error: "Last Name is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid Email",
    }),
  gender: z.nativeEnum({
    MALE: "MALE",
    FEMALE: "FEMALE",
  }),
  phone: z
    .object({
      phoneNumber: z
        .string({
          required_error: "Admin Phone Number is required",
        })
        .refine((value) => /^\d+$/.test(value), {
          message: "Phone Number must be a valid phone number",
        }),
      altPhoneNumber: z
        .string({
          required_error: "Alternate Phone Number is required",
        })
        .refine((value) => /^\d+$/.test(value), {
          message: "Alternate Phone must be a valid phone number",
        }),
    })
    .refine((data) => data.phoneNumber !== data.altPhoneNumber, {
      message:
        "Alternate Admin Phone Number must be different from Phone Number",
      path: ["altPhoneNumber"],
    }),
  addressLine1: z
    .string({
      required_error: "Address Line 1 is required",
    })
    .min(3, {
      message: "Address Line 1 must be at least 3 characters long",
    }),
  addressLine2: z.string().optional(),
  addressLine3: z.string().optional(),
  state: z
    .string({
      required_error: "State is required",
    })
    .min(3, {
      message: "State must be at least 3 characters long",
    }),
  city: z
    .string({
      required_error: "City is required",
    })
    .min(3, {
      message: "City must be at least 3 characters long",
    }),
  pincode: z
    .string({
      required_error: "Pincode is required",
    })
    .max(6, {
      message: "Pincode must be at most 6 characters long",
    })
    .refine((value) => /^\d+$/.test(value), {
      message: "Pincode must be a valid pincode",
    }),
});

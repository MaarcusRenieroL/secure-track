"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { useFormContext } from "react-hook-form";
import { Stop } from "@prisma/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { CheckIcon } from "lucide-react";
import { useRef, useState } from "react";

interface StopsFieldProps {
  stops: Stop[];
}

export const StopsField = ({ stops }: StopsFieldProps) => {
  const { control, setValue, clearErrors, setError } = useFormContext();
  const [stopsId, setStopsId] = useState<Array<string>>([...stops.map((stop) => stop.stopId)])

  const checkCurrentIndex = (stop: string) => {
    const newStops = stopsId.includes(stop)
      ? stopsId.filter((s) => s !== stop)
      : [...stopsId, stop];
    setStopsId(newStops);
    setValue("stops", newStops);

    if (newStops.length >= 0 && newStops.length < 3) {
      setError("stops", {
        type: "required",
        message: "Enter at least 3 stops",
      });
    } else {
      clearErrors("stops");
    }
  };


  return (
    <div className="space-y-2">
      <FormField
        control={control}
        name="stops"
        render={({ field }) => (
          <FormItem className="p-4">
            <FormLabel>Stops</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between truncate pr-2",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {field.value ? stopsId.map((val) => stops.find((stop) => stop.stopId === val)?.stopName).join(", ")
                      : "Select stop"}
                    <CaretSortIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder="Search stops..." className="h-9" />
                  <CommandEmpty>No stops found.</CommandEmpty>
                  <CommandGroup>
                    {stops.map((stop) => (
                      <CommandItem
                        value={stop.stopName}
                        key={stop.stopName}
                        onSelect={() => {
                          checkCurrentIndex(stop.stopId);
                        }}
                      >
                        {stop.stopName}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            stopsId.includes(stop.stopId)
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};


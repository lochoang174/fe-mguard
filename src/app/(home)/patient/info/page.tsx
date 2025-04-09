"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import axiosInstance from "@/api/axios";

// Define schema here since we don't have access to the external file
const pregnancyConditions = [
  "THA thai kỳ",
  "THA mạn tính",
  "Tiền sản giật",
  "Tiền sản giật/THA mạn tính",
] as const;

const patientSchema = z.object({
  fullName: z.string().min(1, "Vui lòng nhập họ và tên"),
  age: z.number().min(1, "Vui lòng nhập tuổi hợp lệ"),
  birthDate: z.date({
    required_error: "Vui lòng chọn ngày sinh",
  }),
  pregnancyNumber: z.number().min(0, "Số lần mang thai không được âm"),
  gestationalAgeAtBirth: z.number().min(0, "Tuổi thai không được âm"),
  pregnancyConditions: z.array(z.string()),
});

// Export the type from the schema
type PatientFormData = z.infer<typeof patientSchema>;

const Page = () => {
  const { user , updateUser} = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      pregnancyConditions: [],
      age: 0,
      pregnancyNumber: 0,
      gestationalAgeAtBirth: 0,
      fullName: "",
      birthDate: undefined,
    },
  });

  React.useEffect(() => {
    const fetchPatientData = async () => {
      if (user?.isUpdateInfo) {
        try {
          setIsLoading(true);
          const response = await axiosInstance.get("/user/get-patient");

          if (response.status === 200) {
            const data = response.data;
            // Convert date string to Date object
            const patientData = {
              ...data,
              birthDate: new Date(data.birthDate),
            };

            form.reset(patientData);
          }
        } catch (error) {
          console.error("Error fetching patient data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPatientData();
  }, [user?.isUpdateInfo, form]);

  const onSubmit = async (data: PatientFormData) => {
    try {
      setIsLoading(true);
      const url = user?.isUpdateInfo
        ? "/user/update-patient"
        : "/user/create-patient";

      const response = user?.isUpdateInfo
        ? await axiosInstance.patch(url, data)
        : await axiosInstance.post(url, data);

      if (response.status === 200) {
        console.log("Patient data saved successfully:", response.data);
        if (user?.isUpdateInfo===false) {
          updateUser({
            ...user,
            isUpdateInfo: true,
          });
        }
      }
    } catch (error) {
      console.error("Error saving patient data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-4 px-2">
      <div className="bg-white/40 backdrop-blur-3xl rounded-lg p-6 shadow-lg border border-white/20">
        <h1 className="text-2xl font-bold mb-6">Thông tin bệnh nhân</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cột trái */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ và tên</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập họ và tên" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tuổi</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Nhập tuổi"
                          {...field}
                          value={field.value}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === "" ? 0 : Number(value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Ngày sinh</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outlined"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Chọn ngày sinh</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Cột phải */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="pregnancyNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số lần mang thai</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Nhập số lần mang thai"
                          {...field}
                          value={field.value}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === "" ? 0 : Number(value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gestationalAgeAtBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tuổi thai khi sinh</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Nhập tuổi thai khi sinh"
                          {...field}
                          value={field.value}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === "" ? 0 : Number(value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pregnancyConditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        Tình trạng thai kỳ
                      </FormLabel>
                      <div className="space-y-2 mt-2">
                        {pregnancyConditions.map((condition) => (
                          <FormItem
                            key={condition}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(condition)}
                                onCheckedChange={(checked) => {
                                  const currentValue = field.value || [];
                                  if (checked) {
                                    field.onChange([
                                      ...currentValue,
                                      condition,
                                    ]);
                                  } else {
                                    field.onChange(
                                      currentValue.filter(
                                        (value) => value !== condition
                                      )
                                    );
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {condition}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="mt-6">
              <Button type="submit" className="w-[200px]" disabled={isLoading}>
                {isLoading ? "Đang lưu..." : "Lưu thông tin"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;

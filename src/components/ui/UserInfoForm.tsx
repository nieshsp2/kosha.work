import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface UserInfoFormData {
  age: number;
  email: string;
  occupation: string;
  gender: string;
  location: string;
}

const occupationOptions = [
  { value: "employed", label: "Employed (Full-time)" },
  { value: "part_time", label: "Employed (Part-time)" },
  { value: "business_owner", label: "Business Owner" },
  { value: "entrepreneur", label: "Entrepreneur" },
  { value: "freelancer", label: "Freelancer/Consultant" },
  { value: "student", label: "Student" },
  { value: "retired", label: "Retired" },
  { value: "unemployed", label: "Unemployed" },
  { value: "homemaker", label: "Homemaker" },
  { value: "other", label: "Other" }
];

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non_binary", label: "Non-binary" },
  { value: "prefer_not_to_say", label: "Prefer not to say" }
];

export const UserInfoForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<UserInfoFormData>({
    defaultValues: {
      age: undefined,
      email: "",
      occupation: "",
      gender: "",
      location: ""
    }
  });

  const onSubmit = async (data: UserInfoFormData) => {
    try {
      setIsSubmitting(true);
      
      // Insert user profile data
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          email: data.email,
          age: data.age,
          occupation: data.occupation,
          gender: data.gender,
          location: data.location 
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Profile saved successfully!",
        description: "You can now proceed to the assessment.",
      });

      // Navigate to enhanced assessment
      navigate('/assessment');
      
    } catch (error: any) {
      console.error('Error saving user profile:', error);
      toast({
        title: "Error saving profile",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Personal Information
          </CardTitle>
          <p className="text-muted-foreground">
            Please provide your details before starting the assessment
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                rules={{ 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                rules={{ 
                  required: "Age is required",
                  min: { value: 18, message: "Must be at least 18 years old" },
                  max: { value: 120, message: "Please enter a valid age" }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter your age"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || "")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="occupation"
                rules={{ required: "Occupation is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occupation</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your occupation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {occupationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                rules={{ required: "Gender is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genderOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
  control={form.control}
  name="location"
  rules={{ required: "Location is required" }}
  render={({ field }) => (
    <FormItem>
      <FormLabel>Location</FormLabel>
      <FormControl>
        <Input
          type="text"
          placeholder="Enter your city or country"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Continue to Assessment"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
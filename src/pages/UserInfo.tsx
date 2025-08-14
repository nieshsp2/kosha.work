import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { guestUserService, GuestUserProfile } from '@/services/guestUserService';

const UserInfo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    age: '',
    occupation: '',
    gender: '',
    location: ''
  });

  useEffect(() => {
    // Load existing profile data if available
    const loadProfile = async () => {
      try {
        const profile = await guestUserService.getProfile();
        if (profile) {
          setFormData({
            email: profile.email || '',
            age: profile.age ? profile.age.toString() : '',
            occupation: profile.occupation || '',
            gender: profile.gender || '',
            location: profile.location || ''
          });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    loadProfile();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.age || !formData.occupation || !formData.gender || !formData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to continue.",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    try {
      const profileToSave = {
        email: formData.email,
        age: parseInt(formData.age),
        occupation: formData.occupation,
        gender: formData.gender,
        location: formData.location
      };

      await guestUserService.createOrUpdateProfile(profileToSave);

      toast({
        title: "Profile saved successfully!",
        description: "Your profile has been saved. Let's learn about your assessment journey.",
      });

      navigate('/assessment-explanation');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg border">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800">
            Complete Your Profile
          </CardTitle>
          <CardDescription className="text-base md:text-lg text-gray-600">
            Tell us a bit about yourself to personalize your wellbeing assessment
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="h-10 md:h-12 text-sm md:text-base"
                required
              />
            </div>

            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age" className="text-base font-medium">
                Age *
              </Label>
              <Input
                id="age"
                type="number"
                min="1"
                max="120"
                placeholder="e.g., 29"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="h-10 md:h-12 text-sm md:text-base"
                required
              />
            </div>

            {/* Occupation */}
            <div className="space-y-2">
              <Label htmlFor="occupation" className="text-base font-medium">
                Occupation *
              </Label>
              <Select
                value={formData.occupation}
                onValueChange={(value) => handleInputChange('occupation', value)}
                required
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select your occupation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employed">Employed (Full-time)</SelectItem>
                  <SelectItem value="part_time">Employed (Part-time)</SelectItem>
                  <SelectItem value="business_owner">Business Owner</SelectItem>
                  <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                  <SelectItem value="freelancer">Freelancer/Consultant</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                  <SelectItem value="homemaker">Homemaker</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-base font-medium">
                Gender *
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
                required
              >
                <SelectTrigger className="h-10 md:h-12 text-sm md:text-base">
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-base font-medium">
                Location *
              </Label>
              <Input
                id="location"
                placeholder="City, Country"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="h-12 text-base"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-base md:text-lg font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                disabled={saving}
              >
                {saving ? "Saving..." : "Continue to Assessment"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default UserInfo;

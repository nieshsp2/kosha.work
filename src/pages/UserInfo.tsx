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
    <main className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center p-3">
      <div className="w-full max-w-2xl">
        {/* Header Card */}
        <Card className="bg-white border border-gray-200 shadow-sm mb-4">
          <CardContent className="p-4 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-lg">👤</span>
              </div>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Complete Your Profile
            </h1>
            <p className="text-sm text-gray-600">
              Tell us a bit about yourself to personalize your wellbeing assessment
            </p>
          </CardContent>
        </Card>

                {/* Main Form Card */}
        <Card className="bg-white border border-gray-200 shadow-lg relative">
          {saving && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-lg z-10 flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-gray-700 font-medium">Saving your profile...</p>
                <p className="text-gray-500 text-sm">Please wait while we save to the database</p>
              </div>
            </div>
          )}
          <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="h-10 text-sm bg-white border-2 border-gray-300 hover:border-blue-500 focus:border-blue-500 text-gray-900 rounded-lg shadow-sm"
                required
              />
            </div>

            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age" className="text-sm font-semibold text-gray-700">
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
                className="h-10 text-sm bg-white border-2 border-gray-300 hover:border-blue-500 focus:border-blue-500 text-gray-900 rounded-lg shadow-sm"
                required
              />
            </div>

            {/* Occupation */}
            <div className="space-y-2">
              <Label htmlFor="occupation" className="text-sm font-semibold text-gray-700">
                Occupation *
              </Label>
              <Select
                value={formData.occupation}
                onValueChange={(value) => handleInputChange('occupation', value)}
                required
              >
                <SelectTrigger className="h-10 text-sm bg-white border-2 border-gray-300 hover:border-blue-500 focus:border-blue-500 text-gray-900 rounded-lg shadow-sm">
                  <SelectValue placeholder="Select your occupation" className="text-gray-500" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-xl rounded-lg max-h-48 overflow-y-auto">
                  <SelectItem value="employed" className="py-2 px-4 hover:bg-blue-50 cursor-pointer text-gray-900 text-sm">Employed (Full-time)</SelectItem>
                  <SelectItem value="part_time" className="py-2 px-4 hover:bg-blue-50 cursor-pointer text-gray-900 text-sm">Employed (Part-time)</SelectItem>
                  <SelectItem value="business_owner" className="py-2 px-4 hover:bg-blue-50 cursor-pointer text-gray-900 text-sm">Business Owner</SelectItem>
                  <SelectItem value="entrepreneur" className="py-2 px-4 hover:bg-blue-50 cursor-pointer text-gray-900 text-sm">Entrepreneur</SelectItem>
                  <SelectItem value="freelancer" className="py-2 px-4 hover:bg-blue-50 cursor-pointer text-gray-900 text-sm">Freelancer/Consultant</SelectItem>
                  <SelectItem value="student" className="py-2 px-4 hover:bg-blue-50 cursor-pointer text-gray-900 text-sm">Student</SelectItem>
                  <SelectItem value="retired" className="py-2 px-4 hover:bg-blue-50 cursor-pointer text-gray-900 text-sm">Retired</SelectItem>
                  <SelectItem value="unemployed" className="py-2 px-4 hover:bg-blue-50 cursor-pointer text-gray-900 text-sm">Unemployed</SelectItem>
                  <SelectItem value="homemaker" className="py-2 px-4 hover:bg-blue-50 cursor-pointer text-gray-900 text-sm">Homemaker</SelectItem>
                  <SelectItem value="other" className="py-2 px-4 hover:bg-blue-50 cursor-pointer text-gray-900 text-sm">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-sm font-semibold text-gray-700">
                Gender *
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
                required
              >
                <SelectTrigger className="h-10 text-sm bg-white border-2 border-gray-300 hover:border-blue-500 focus:border-blue-500 text-gray-900 rounded-lg shadow-sm">
                  <SelectValue placeholder="Select your gender" className="text-gray-500" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-xl rounded-lg max-h-48 overflow-y-auto">
                  <SelectItem value="female" className="py-2 px-4 hover:bg-blue-50 cursor-pointer text-gray-900 text-sm">Female</SelectItem>
                  <SelectItem value="male" className="py-2 px-4 hover:bg-blue-50 cursor-pointer text-gray-900 text-sm">Male</SelectItem>
                  <SelectItem value="non-binary" className="py-2 px-4 hover:bg-blue-50 cursor-pointer text-gray-900 text-sm">Non-binary</SelectItem>
                  <SelectItem value="prefer-not-to-say" className="py-2 px-4 hover:bg-blue-50 cursor-pointer text-gray-900 text-sm">Prefer not to say</SelectItem>
                  <SelectItem value="other" className="py-2 px-4 hover:bg-blue-50 cursor-pointer text-gray-900 text-sm">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-semibold text-gray-700">
                Location *
              </Label>
              <Input
                id="location"
                placeholder="City, Country"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="h-10 text-sm bg-white border-2 border-gray-300 hover:border-blue-500 focus:border-blue-500 text-gray-900 rounded-lg shadow-sm"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full h-10 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={saving}
              >
                {saving ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving to Database...</span>
                  </div>
                ) : (
                  "Continue to Assessment"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      </div>
    </main>
  );
};

export default UserInfo;

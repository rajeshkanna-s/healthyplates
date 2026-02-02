import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, MapPin, Calendar, FileText } from 'lucide-react';

interface ProfileFormProps {
  onSubmit: (data: {
    name: string;
    age: number;
    gender: 'male' | 'female';
    location: string;
    bio: string;
  }) => void;
  initialData?: {
    name: string;
    age: number;
    gender: 'male' | 'female';
    location: string;
    bio: string;
  };
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [age, setAge] = useState<string>(initialData?.age?.toString() || '');
  const [gender, setGender] = useState<'male' | 'female'>(initialData?.gender || 'male');
  const [location, setLocation] = useState(initialData?.location || '');
  const [bio, setBio] = useState(initialData?.bio || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!age || parseInt(age) < 18 || parseInt(age) > 100) {
      newErrors.age = 'Age must be between 18 and 100';
    }
    if (!location.trim()) newErrors.location = 'Location is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        name: name.trim(),
        age: parseInt(age),
        gender,
        location: location.trim(),
        bio: bio.trim(),
      });
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <User className="h-6 w-6 text-primary" />
          Create Your Profile
        </CardTitle>
        <CardDescription>
          Tell us about yourself to start your personality assessment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Full Name *
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="age" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Age *
            </Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              min={18}
              max={100}
              className={errors.age ? 'border-destructive' : ''}
            />
            {errors.age && <p className="text-sm text-destructive">{errors.age}</p>}
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2">Gender *</Label>
            <RadioGroup
              value={gender}
              onValueChange={(value) => setGender(value as 'male' | 'female')}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male" className="cursor-pointer">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female" className="cursor-pointer">Female</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location *
            </Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, Country"
              className={errors.location ? 'border-destructive' : ''}
            />
            {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              About You (Optional)
            </Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us a bit about yourself..."
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full bg-green-700 hover:bg-green-800">
            Continue to Assessment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;

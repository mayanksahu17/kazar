import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { UseFormReturn } from 'react-hook-form';

interface DiversityInclusionProps {
  form: UseFormReturn<any>;
  profileIndex: number;
}

export default function DiversityInclusion({ form, profileIndex }: DiversityInclusionProps) {
  const genderOptions = [
    'Male', 'Female', 'Non-binary', 'Prefer not to say', 'Other'
  ];

  const pronounOptions = [
    'He/Him', 'She/Her', 'They/Them', 'Prefer not to say', 'Other'
  ];

  const ethnicityOptions = [
    'Asian', 'Black', 'Hispanic', 'White', 'Mixed', 'Other', 'Prefer not to say'
  ];

  return (
    <div className="space-y-6 ">
      <div>
        <Label htmlFor={`profiles.${profileIndex}.diversityInclusion.gender`}>Gender</Label>
        <Select onValueChange={(value) => form.setValue(`profiles.${profileIndex}.diversityInclusion.gender`, value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent className="bg-white z-[120]">
            {genderOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor={`profiles.${profileIndex}.diversityInclusion.pronouns`}>Pronouns</Label>
        <Select onValueChange={(value) => form.setValue(`profiles.${profileIndex}.diversityInclusion.pronouns`, value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select pronouns" />
          </SelectTrigger>
          <SelectContent className="bg-white z-[120]">
            {pronounOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor={`profiles.${profileIndex}.diversityInclusion.ethnicity`}>Ethnicity</Label>
        <Select onValueChange={(value) => form.setValue(`profiles.${profileIndex}.diversityInclusion.ethnicity`, value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select ethnicity" />
          </SelectTrigger>
          <SelectContent className="bg-white z-[120]">
            {ethnicityOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
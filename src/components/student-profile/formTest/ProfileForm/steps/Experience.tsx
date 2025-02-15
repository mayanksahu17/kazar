import { Button } from "@/components/ui/button";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { X } from 'lucide-react';

interface ExperienceProps {
  form: UseFormReturn<any>;
  profileIndex: number;
}

export default function Experience({ form, profileIndex }: ExperienceProps) {
  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: `profiles.${profileIndex}.experiences`
  });

  return (
    <div className="space-y-6">
      <Button
        type="button"
        className="border border-black"
        onClick={() => append({
          title: '',
          company: '',
          startDate: '',
          endDate: null, // Explicitly set to null to avoid issues with empty values
          current: false,
          description: ''
        })}
      >
        Add Experience
      </Button>

      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Experience {index + 1}</h4>
            <Button
              type="button"
              variant="ghost"
              onClick={() => remove(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Job Title</Label>
              <Input {...form.register(`profiles.${profileIndex}.experiences.${index}.title`)} />
            </div>

            <div>
              <Label>Company</Label>
              <Input {...form.register(`profiles.${profileIndex}.experiences.${index}.company`)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <Input 
                  type="date" 
                  {...form.register(`profiles.${profileIndex}.experiences.${index}.startDate`)} 
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input 
                  type="date" 
                  {...form.register(`profiles.${profileIndex}.experiences.${index}.endDate`)}
                  disabled={form.watch(`profiles.${profileIndex}.experiences.${index}.current`)}
                />
              </div>
            </div>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...form.register(`profiles.${profileIndex}.experiences.${index}.current`)}
                className="rounded border-gray-300"
              />
              <span>I currently work here</span>
            </label>

            <div>
              <Label>Description</Label>
              <textarea
                {...form.register(`profiles.${profileIndex}.experiences.${index}.description`)}
                className="w-full p-2 border rounded-md"
                rows={4}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

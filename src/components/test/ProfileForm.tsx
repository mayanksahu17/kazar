import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

interface ProfileFormProps {
  onNext: () => void;
}

interface IProfileForm {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    linkedin?: string;
    location?: string;
    github?: string;
    portfolio?: string;
  };
  education: {
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
  }[];
  experience: {
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate?: string;
    description: string;
  }[];
  skills: { name: string; rating: number; category: string }[];
  projects: { name: string; description: string; skillsUsed: string[] }[];
}

const ProfileForm = ({ onNext }: ProfileFormProps) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IProfileForm>();
    const [education, setEducation] = useState([{ institution: "", degree: "", field: "", startDate: "", endDate: "", current: false }]);
    const [experience, setExperience] = useState([{ jobTitle: "", company: "", location: "", startDate: "", endDate: "", description: "" }]);
    const [skills, setSkills] = useState([{ name: "", rating: 3, category: "Technical" }]);
    const [projects, setProjects] = useState([{ name: "", description: "", skillsUsed: [""] }]);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
  
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const response = await fetch('/api/student-resume');
          if (!response.ok) {
            throw new Error('Failed to fetch profile');
          }
          const data = await response.json();
          if (data) {
            reset(data);
            if (data.education?.length) setEducation(data.education);
            if (data.experience?.length) setExperience(data.experience);
            if (data.skills?.length) setSkills(data.skills);
            if (data.projects?.length) setProjects(data.projects);
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
          toast({
            title: "Error",
            description: "Failed to load profile data",
            variant: "destructive",
          });
        }
      };
  
      fetchProfile();
    }, [reset, toast]);
  
    const onSubmit = async (data: IProfileForm) => {
      setLoading(true);
      try {
        const response = await fetch('/api/student-resume', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || 'Failed to save profile');
        }
  
        toast({
          title: "Success",
          description: "Profile saved successfully",
        });
        onNext();
      } catch (error) {
        console.error('Error saving profile:', error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to save profile",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
  

  const addEducation = () => {
    setEducation([...education, { institution: "", degree: "", field: "", startDate: "", endDate: "", current: false }]);
  };

  const addExperience = () => {
    setExperience([...experience, { jobTitle: "", company: "", location: "", startDate: "", endDate: "", description: "" }]);
  };

  const addSkill = () => {
    setSkills([...skills, { name: "", rating: 3, category: "Technical" }]);
  };

  const addProject = () => {
    setProjects([...projects, { name: "", description: "", skillsUsed: [""] }]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold">Personal Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                {...register("personalInfo.fullName", { required: true })}
                className={errors.personalInfo?.fullName ? "border-red-500" : ""}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("personalInfo.email", { required: true, pattern: /^\S+@\S+$/i })}
                className={errors.personalInfo?.email ? "border-red-500" : ""}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                {...register("personalInfo.phone", { required: true })}
                className={errors.personalInfo?.phone ? "border-red-500" : ""}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                {...register("personalInfo.location")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                {...register("personalInfo.linkedin")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                {...register("personalInfo.github")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio</Label>
              <Input
                id="portfolio"
                {...register("personalInfo.portfolio")}
              />
            </div>
          </div>
        </Card>

        <Card className="mt-6 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Education</h2>
            <Button type="button" variant="outline" onClick={addEducation}>
              <Plus className="w-4 h-4 mr-2" /> Add Education
            </Button>
          </div>

          <AnimatePresence>
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Institution</Label>
                    <Input {...register(`education.${index}.institution`, { required: true })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Degree</Label>
                    <Input {...register(`education.${index}.degree`, { required: true })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Field of Study</Label>
                    <Input {...register(`education.${index}.field`, { required: true })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input type="date" {...register(`education.${index}.startDate`, { required: true })} />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input type="date" {...register(`education.${index}.endDate`)} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register(`education.${index}.current`)}
                      className="rounded border-gray-300"
                    />
                    <Label>Currently Studying</Label>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </Card>

        <Card className="mt-6 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Experience</h2>
            <Button type="button" variant="outline" onClick={addExperience}>
              <Plus className="w-4 h-4 mr-2" /> Add Experience
            </Button>
          </div>

          <AnimatePresence>
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Job Title</Label>
                    <Input {...register(`experience.${index}.jobTitle`, { required: true })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input {...register(`experience.${index}.company`, { required: true })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input {...register(`experience.${index}.location`)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input type="date" {...register(`experience.${index}.startDate`, { required: true })} />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input type="date" {...register(`experience.${index}.endDate`)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea {...register(`experience.${index}.description`, { required: true })} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </Card>

        <Card className="mt-6 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Skills</h2>
            <Button type="button" variant="outline" onClick={addSkill}>
              <Plus className="w-4 h-4 mr-2" /> Add Skill
            </Button>
          </div>

          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="space-y-2">
                  <Label>Skill Name</Label>
                  <Input {...register(`skills.${index}.name`, { required: true })} placeholder="e.g., JavaScript" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input {...register(`skills.${index}.category`, { required: true })} placeholder="e.g., Technical" />
                </div>
                <div className="space-y-2">
                  <Label>Proficiency (1-5)</Label>
                  <Slider
                    defaultValue={[3]}
                    max={5}
                    min={1}
                    step={1}
                    onValueChange={(value) => {
                      const newSkills = [...skills];
                      newSkills[index].rating = value[0];
                      setSkills(newSkills);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="mt-6 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Projects</h2>
            <Button type="button" variant="outline" onClick={addProject}>
              <Plus className="w-4 h-4 mr-2" /> Add Project
            </Button>
          </div>

          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label>Project Name</Label>
                    <Input {...register(`projects.${index}.name`, { required: true })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea {...register(`projects.${index}.description`, { required: true })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Skills Used (comma-separated)</Label>
                    <Input 
                      {...register(`projects.${index}.skillsUsed`)} 
                      placeholder="e.g., React, TypeScript, Node.js"
                      onChange={(e) => {
                        const skills = e.target.value.split(',').map(skill => skill.trim());
                        const newProjects = [...projects];
                        newProjects[index].skillsUsed = skills;
                        setProjects(newProjects);
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </Card>

        <div className="mt-8 flex justify-end">
           <Button type="submit" size="lg" disabled={loading}>
           {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
           {loading ? "Saving..." : "Next Step"}
          </Button>
        </div>
      </motion.div>
    </form>
  );
};

export default ProfileForm;
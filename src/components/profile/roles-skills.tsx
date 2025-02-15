import { useState, KeyboardEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Save, X, Plus, Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Skill {
  name: string
}

interface RolesSkillsData {
  roles: string[]
  skills: Skill[]
}

interface RolesSkillsProps {
  data: RolesSkillsData
  onUpdate: (data: RolesSkillsData) => Promise<void>
}

export default function RolesSkills({ data, onUpdate }: RolesSkillsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<RolesSkillsData>({
    roles: data.roles || [],  // Default to an empty array if data.roles is undefined
    skills: data.skills || [] // Default to an empty array if data.skills is undefined
  })
  const [newSkill, setNewSkill] = useState<Skill>({ name: '' })
  const [newRole, setNewRole] = useState<string>('')

  const handleAddRole = () => {
    if (newRole) {
      setFormData(prev => ({
        ...prev,
        roles: [...prev.roles, newRole]
      }))
      setNewRole('')
    }
  }

  const handleKeyPressRole = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newRole) {
      e.preventDefault()
      handleAddRole()
    }
  }

  const handleRemoveRole = (index: number) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.filter((_, i) => i !== index)
    }))
  }

  const handleAddSkill = () => {
    if (newSkill.name) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }))
      setNewSkill({ name: '' })
    }
  }

  const handleKeyPressSkill = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newSkill.name) {
      e.preventDefault()
      handleAddSkill()
    }
  }

  const handleRemoveSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onUpdate(formData)
    setIsEditing(false)
  }

  return (
    <div className="space-y-8">
      {/* Desired Roles Section */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Desired Roles</h2>
            <p className="text-sm text-muted-foreground">You can add multiple roles you aspire to work in.</p>
          </div>
          {!isEditing ? (
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
              <Pencil className="h-4 w-4" />
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleSubmit}>
                <Save className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {formData.roles.map((role, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-full px-4 py-2 text-sm flex items-center gap-2"
              >
                <span>{role}</span>
                {isEditing && (
                  <button onClick={() => handleRemoveRole(index)} className="text-gray-400 hover:text-gray-600">
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {isEditing && (
            <div className="flex items-center gap-2">
              <Input
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                onKeyPress={handleKeyPressRole}
                placeholder="Add a new role"
                className="max-w-xs"
              />
              <Button variant="outline" size="icon" onClick={handleAddRole}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Info Box for Roles */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-blue-700">
            <Info className="h-4 w-4" />
            <p>Add roles you aspire to work in. These help companies understand your interests.</p>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Your Skills</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add your technical and professional skills.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {!isEditing ? (
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
              <Pencil className="h-4 w-4" />
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleSubmit}>
                <Save className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-full px-4 py-2 text-sm flex items-center gap-2"
              >
                <span>{skill.name}</span>
                {isEditing && (
                  <button onClick={() => handleRemoveSkill(index)} className="text-gray-400 hover:text-gray-600">
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {isEditing && (
            <div className="flex items-center gap-2">
              <Input
                value={newSkill.name}
                onChange={(e) => setNewSkill({ name: e.target.value })}
                onKeyPress={handleKeyPressSkill}
                placeholder="Add a new skill"
                className="max-w-xs"
              />
              <Button variant="outline" size="icon" onClick={handleAddSkill}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Info Box for Skills */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4 text-sm text-blue-700 flex items-center">
          <Info className="h-4 w-4 mr-2" />
          Add work experience skills to the 'Experience' section to demonstrate their use to companies.
        </div>
      </div>
    </div>
  )
}

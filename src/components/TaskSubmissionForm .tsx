import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const TaskSubmissionForm = ({ 
  taskId, 
  onSubmit, 
  onCancel, 
  isLoading 
}: { 
  taskId: string;
  onSubmit: (content: string) => void;
  onCancel: () => void;
  isLoading: boolean;
}) => {
  const [submissionContent, setSubmissionContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(submissionContent);
  };

  return (
    <Card className="mt-4">
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="submission">Your Submission</Label>
            <Textarea
              id="submission"
              placeholder="Enter your task submission here..."
              value={submissionContent}
              onChange={(e) => setSubmissionContent(e.target.value)}
              className="min-h-32"
              required
            />
          </div>
          <div className="flex space-x-2">
            <Button 
              type="submit" 
              disabled={isLoading || !submissionContent.trim()}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
            <Button 
              type="button" 
              onClick={onCancel}
              variant="outline"
              className="border-gray-300"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskSubmissionForm;
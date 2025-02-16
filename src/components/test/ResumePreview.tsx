import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Download, Printer, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface ResumePreviewProps {
  onBack: () => void;
}

const ResumePreview = ({ onBack }: ResumePreviewProps) => {
  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/student-resume');
        if (!response.ok) {
          throw new Error('Failed to fetch resume data');
        }
        const data = await response.json();
        setResumeData(data);
      } catch (error) {
        console.error('Error fetching resume:', error);
        toast({
          title: "Error",
          description: "Failed to load resume data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, [toast]);

  const handleDownload = async () => {
    if (!resumeData?.pdfUrl) {
      toast({
        title: "Error",
        description: "PDF not available yet",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(resumeData.pdfUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast({
        title: "Error",
        description: "Failed to download PDF",
        variant: "destructive",
      });
    }
  };

  const handlePrint = () => {
    if (resumeData?.pdfUrl) {
      const printWindow = window.open(resumeData.pdfUrl);
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print();
        };
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">Preview Your Resume</h2>
        <p className="text-gray-500 mt-2">Review and download your optimized resume</p>
        {resumeData?.atsScore && (
          <div className="mt-4">
            <span className="text-lg font-medium">
              ATS Score: <span className="text-green-600">{resumeData.atsScore}</span>
            </span>
          </div>
        )}
      </div>

      <Card className="p-6 min-h-[600px] bg-white shadow-lg">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : resumeData?.pdfUrl ? (
          <iframe
            src={resumeData.pdfUrl}
            className="w-full h-full min-h-[600px] border-0"
            title="Resume Preview"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <FileText className="w-12 h-12" />
          </div>
        )}
      </Card>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <div className="space-x-4">
          <Button variant="outline" onClick={handlePrint} disabled={!resumeData?.pdfUrl}>
            <Printer className="w-4 h-4 mr-2" /> Print
          </Button>
          <Button 
            onClick={handleDownload} 
            disabled={loading || !resumeData?.pdfUrl}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            Download PDF
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumePreview;
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Upload } from 'lucide-react';
import { toast } from 'sonner';

const jobInterviewSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  role: z.string().min(1, 'Role is required'),
  jobPosting: z.string().optional(),
  format: z.string().min(1, 'Interview format is required'),
  concerns: z.string().optional(),
});

const salesCallSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  contactRole: z.string().min(1, 'Contact role is required'),
  product: z.string().min(1, 'Product/service is required'),
  dealStage: z.string().min(1, 'Deal stage is required'),
  painPoints: z.string().optional(),
  competitors: z.string().optional(),
});

export default function NewBriefFormPage() {
  const params = useParams();
  const router = useRouter();
  const type = params.type as string;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [jobDescFile, setJobDescFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isJobDescDragging, setIsJobDescDragging] = useState(false);

  const isJobInterview = type === 'job-interview';
  const schema = isJobInterview ? jobInterviewSchema : salesCallSchema;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    const toastId = toast.loading('Generating your brief...');

    try {
      const formData = new FormData();
      formData.append('meetingType', type);
      formData.append('data', JSON.stringify(data));
      if (file) {
        formData.append('resume', file);
      }
      if (jobDescFile) {
        formData.append('jobDescription', jobDescFile);
      }

      const response = await fetch('/api/briefs', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create brief');
      }

      const result = await response.json();
      toast.success('Brief generated successfully!', { id: toastId });
      router.push(`/dashboard/briefs/${result.id}`);
    } catch (error) {
      console.error('Error creating brief:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to create brief. Please try again.',
        { id: toastId }
      );
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf' ||
          droppedFile.type === 'application/msword' ||
          droppedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFile(droppedFile);
      } else {
        toast.error('Please upload a PDF or DOCX file');
      }
    }
  };

  const handleJobDescFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setJobDescFile(e.target.files[0]);
    }
  };

  const handleJobDescDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsJobDescDragging(true);
  };

  const handleJobDescDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsJobDescDragging(false);
  };

  const handleJobDescDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsJobDescDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setJobDescFile(droppedFile);
      } else {
        toast.error('Please upload a PDF file');
      }
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {isJobInterview ? 'Job Interview Brief' : 'Sales Call Brief'}
        </h1>
        <p className="mt-2 text-gray-600">
          Fill in the details and we'll generate a comprehensive brief for you
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Meeting Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {isJobInterview ? (
              <>
                <div>
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    {...register('companyName')}
                    placeholder="e.g., Nike, Google, Microsoft"
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.companyName.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="role">Role/Position *</Label>
                  <Input
                    id="role"
                    {...register('role')}
                    placeholder="e.g., Senior Designer, Software Engineer"
                  />
                  {errors.role && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.role.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="resume">Your Resume (PDF/DOCX)</Label>
                  <div className="mt-2">
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`relative rounded-md border-2 border-dashed p-6 transition-colors ${
                        isDragging
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 bg-white hover:border-gray-400'
                      }`}
                    >
                      <label className="flex cursor-pointer items-center justify-center">
                        <div className="text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <span className="mt-2 block text-sm text-gray-600">
                            {file ? file.name : 'Click to upload or drag & drop'}
                          </span>
                          <span className="mt-1 block text-xs text-gray-500">
                            PDF or DOCX up to 10MB
                          </span>
                        </div>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="jobPosting">Job Posting (Text)</Label>
                  <Textarea
                    id="jobPosting"
                    {...register('jobPosting')}
                    placeholder="Paste the full job description here... (or upload PDF below)"
                    rows={6}
                  />
                  {errors.jobPosting && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.jobPosting.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="jobDescPdf">Job Description (PDF)</Label>
                  <div className="mt-2">
                    <div
                      onDragOver={handleJobDescDragOver}
                      onDragLeave={handleJobDescDragLeave}
                      onDrop={handleJobDescDrop}
                      className={`relative rounded-md border-2 border-dashed p-6 transition-colors ${
                        isJobDescDragging
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 bg-white hover:border-gray-400'
                      }`}
                    >
                      <label className="flex cursor-pointer items-center justify-center">
                        <div className="text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <span className="mt-2 block text-sm text-gray-600">
                            {jobDescFile ? jobDescFile.name : 'Click to upload or drag & drop'}
                          </span>
                          <span className="mt-1 block text-xs text-gray-500">
                            PDF up to 10MB (optional if you pasted text above)
                          </span>
                        </div>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleJobDescFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="format">Interview Format *</Label>
                  <Select onValueChange={(value) => setValue('format', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      <SelectItem value="phone">Phone Screen</SelectItem>
                      <SelectItem value="video">Video Call</SelectItem>
                      <SelectItem value="in-person">In-Person</SelectItem>
                      <SelectItem value="panel">Panel Interview</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.format && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.format.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="concerns">
                    Your Concerns/Questions (Optional)
                  </Label>
                  <Textarea
                    id="concerns"
                    {...register('concerns')}
                    placeholder="Any specific concerns or questions you'd like addressed..."
                    rows={3}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label htmlFor="companyName">Prospect Company Name *</Label>
                  <Input
                    id="companyName"
                    {...register('companyName')}
                    placeholder="e.g., Acme Corp"
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.companyName.message as string}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactName">Contact Name *</Label>
                    <Input
                      id="contactName"
                      {...register('contactName')}
                      placeholder="e.g., John Smith"
                    />
                    {errors.contactName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.contactName.message as string}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="contactRole">Contact Role *</Label>
                    <Input
                      id="contactRole"
                      {...register('contactRole')}
                      placeholder="e.g., VP of Sales"
                    />
                    {errors.contactRole && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.contactRole.message as string}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="product">Your Product/Service *</Label>
                  <Input
                    id="product"
                    {...register('product')}
                    placeholder="e.g., CRM software, Marketing automation"
                  />
                  {errors.product && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.product.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="dealStage">Deal Stage *</Label>
                  <Select
                    onValueChange={(value) => setValue('dealStage', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      <SelectItem value="discovery">Discovery</SelectItem>
                      <SelectItem value="demo">Demo/Presentation</SelectItem>
                      <SelectItem value="negotiation">Negotiation</SelectItem>
                      <SelectItem value="closing">Closing</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.dealStage && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.dealStage.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="painPoints">
                    Known Pain Points (Optional)
                  </Label>
                  <Textarea
                    id="painPoints"
                    {...register('painPoints')}
                    placeholder="What problems are they trying to solve?"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="competitors">
                    Competitors They're Evaluating (Optional)
                  </Label>
                  <Input
                    id="competitors"
                    {...register('competitors')}
                    placeholder="e.g., Salesforce, HubSpot"
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Brief...
              </>
            ) : (
              'Generate Brief'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

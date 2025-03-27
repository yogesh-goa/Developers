"use client"

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUp } from "lucide-react";
import { useForm } from "react-hook-form";

interface ModelConfigFormProps {
  config: any;
  onConfigChange: (config: any) => void;
  onDatasetUpload: (file: File) => void;
  disabled?: boolean;
}

export default function ModelConfigForm({
  config,
  onConfigChange,
  onDatasetUpload,
  disabled = false,
}: ModelConfigFormProps) {
  const form = useForm({
    defaultValues: config,
    mode: "onChange",
  });

  const handleFormSubmit = (data: any) => {
    onConfigChange(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onDatasetUpload(e.target.files[0]);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="modelType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value} disabled={disabled}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select model type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="regression">Regression</SelectItem>
                  <SelectItem value="classification">Classification</SelectItem>
                  <SelectItem value="clustering">Clustering</SelectItem>
                  <SelectItem value="neuralNetwork">Neural Network</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select the type of model you want to train</FormDescription>
            </FormItem>
          )}
        />

        {/* File Upload Section */}
        <FormItem>
          <FormLabel>Upload Dataset</FormLabel>
          <FormControl>
            <div className="flex items-center gap-4">
              <Input type="file" accept=".csv,.json" onChange={handleFileChange} disabled={disabled} />
              <Button type="button" variant="outline" disabled>
                <FileUp className="w-5 h-5" />
              </Button>
            </div>
          </FormControl>
          <FormDescription>Upload your dataset in CSV or JSON format.</FormDescription>
        </FormItem>

        <Button type="submit" disabled={disabled} className="w-full">
          Save Configuration
        </Button>
      </form>
    </Form>
  );
}

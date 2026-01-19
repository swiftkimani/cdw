"use client";

import { createClassifiedAction } from "@/app/_actions/classified";
import { ClassifiedAISchema } from "@/app/schemas/classified-ai.schema";
import {
  SingleImageSchema,
  type SingleImageType,
} from "@/app/schemas/images.schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { ImageUploader } from "./single-image-uploader";
import {
  StreamableSkeleton,
  type StreamableSkeletonProps,
} from "./streamable-skeleton";

export const CreateClassifiedDialog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, startUploadTransition] = useTransition();
  const [isCreating, startCreateTransition] = useTransition();
  const [classifiedData, setClassifiedData] =
    useState<StreamableSkeletonProps | null>(null);

  const imageForm = useForm<SingleImageType>({
    resolver: zodResolver(SingleImageSchema),
  });

  const createForm = useForm<StreamableSkeletonProps>({
    resolver: zodResolver(
      ClassifiedAISchema.extend({
        make: z.object({
          id: z.number().int(),
          name: z.string(),
          image: z.string(),
          createdAt: z.date(),
          updatedAt: z.date(),
        }),
      })
    ),
  });

  const handleImageUpload = (url: string) => {
    imageForm.setValue("image", url);
  };

  const onImageSubmit: SubmitHandler<SingleImageType> = (data) => {
    startUploadTransition(async () => {
      try {
        // Call the new API route
        const response = await fetch("/api/generate-classified", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: data.image }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to generate classified");
        }

        const result = await response.json();

        // Update the form and display the result
        setClassifiedData(result);
        createForm.reset(result);
      } catch (error) {
        toast({
          title: "Error",
          description:
            error instanceof Error
              ? error.message
              : "Failed to generate classified",
          type: "background",
          duration: 2500,
          variant: "destructive",
        });
      }
    });
  };

  const onCreateSubmit: SubmitHandler<StreamableSkeletonProps> = (data) => {
    startCreateTransition(async () => {
      setClassifiedData(null);
      const { success, message } = await createClassifiedAction(data);

      if (!success) {
        toast({
          title: "Error",
          description: message,
          type: "background",
          duration: 2500,
          variant: "destructive",
        });

        return;
      }

      // Close modal on success
      setIsModalOpen(false);
    });
  };

  const handleCancel = () => {
    setClassifiedData(null);
    setIsModalOpen(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button className="ml-4" size="sm">
          Create New
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("max-w-6xl bg-white")}>
        <DialogHeader>
          <DialogTitle>Create New Classified</DialogTitle>
        </DialogHeader>
        {classifiedData ? (
          <Form {...createForm}>
            <form
              className="space-y-4"
              onSubmit={createForm.handleSubmit(onCreateSubmit)}>
              <div className="w-full">
                <StreamableSkeleton {...classifiedData} done={true} />
              </div>
              <div className="flex justify-between gap-2">
                <Button variant="outline" type="button" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  disabled={isCreating || isUploading}
                  type="submit"
                  className="flex items-center gap-x-2">
                  {isCreating || isUploading ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                  ) : null}
                  {isUploading ? "Uploading..." : "Create"}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <Form {...imageForm}>
            <form
              className="space-y-4"
              onSubmit={imageForm.handleSubmit(onImageSubmit)}>
              <ImageUploader onUploadComplete={handleImageUpload} />
              <div className="flex justify-between gap-2">
                <Button variant="outline" type="button" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  disabled={isUploading}
                  type="submit"
                  className="flex items-center gap-x-2">
                  {isUploading && <Loader2 className="animate-spin h-4 w-4" />}
                  {isUploading ? "Generating..." : "Upload"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

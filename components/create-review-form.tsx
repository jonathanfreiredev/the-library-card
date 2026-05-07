"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createBookReviewAction } from "@/server/book-reviews/book-reviews.actions";
import { createBookReviewSchema } from "@/server/book-reviews/book-reviews.schema";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

type CreateReviewFormValues = z.input<typeof createBookReviewSchema>;

export function CreateReviewForm() {
  const router = useRouter();

  const form = useForm<CreateReviewFormValues>({
    resolver: zodResolver(createBookReviewSchema),
    defaultValues: {
      title: "",
      author: "",
      buyUrl: null,
      content: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: CreateReviewFormValues) {
    const result = await createBookReviewAction({
      ...values,
      buyUrl: values.buyUrl || null,
    });

    if (result?.data) {
      toast.success("Book review created successfully!", {
        position: "bottom-right",
      });
      form.reset();
      router.push("/");
      return;
    }

    const errorMessage =
      result?.serverError || "Failed to create book review. Please try again.";

    toast.error("Failed to create review", {
      description: errorMessage,
      position: "bottom-right",
    });
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create Book Review</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Book title"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Author name"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="buyUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Buy URL (optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://example.com/book"
                      autoComplete="off"
                      value={field.value ?? ""}
                      onChange={(event) => {
                        const value = event.target.value.trim();
                        field.onChange(value === "" ? null : value);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a valid URL where this book can be purchased.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your review..."
                      className="min-h-40"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? "Creating..." : "Create Review"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

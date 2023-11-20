'use client';

import { AnswerSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Button } from '../ui/button';
import { Stars } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';
import { useTheme } from '@/context/ThemeProvider';

const type: any = 'create';

const Answer = () => {
  const { mode } = useTheme();
  console.log(mode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorRef = useRef(null);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof AnswerSchema>) => {
    console.log('post answer clicked');
    setIsSubmitting(true);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <FormLabel className="text-dark300_light700 font-bold">Write your answer here</FormLabel>
              <Button className="light-border-2 gap-2 rounded-lg bg-slate-100  text-primary-500 dark:bg-slate-900">
                <Stars className="w-[15px]" /> Generate AI answer
              </Button>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormControl className="mt-3.5">
                <Editor
                  apiKey={process.env.TINY_MCE_API_KEY}
                  onInit={(evt, editor) =>
                    // @ts-ignore

                    (editorRef.current = editor)
                  }
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue=""
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      'advlist',
                      'autolink',
                      'lists',
                      'link',
                      'image',
                      'charmap',
                      'preview',
                      'anchor',
                      'searchreplace',
                      'visualblocks',
                      'codesample',
                      'fullscreen',
                      'insertdatetime',
                      'media',
                      'table'
                    ],
                    toolbar:
                      'undo redo | ' +
                      'codesample| bold italic forecolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style: 'body { font-family:Inter; font-size:16px }',
                    skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
                    content_css: mode === 'dark' ? 'dark' : 'light'
                  }}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            className="primary-gradient mt-6 w-fit !text-light-900"
            disabled={isSubmitting}>
            {isSubmitting ? (
              <>{type === 'edit' ? 'editing...' : 'posting...'}</>
            ) : (
              <>{type === 'edit' ? 'Edit Answer' : 'Post Answer'}</>
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Answer;

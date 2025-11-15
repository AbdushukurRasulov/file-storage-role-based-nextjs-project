import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";

const formSchema = z.object({
  query: z.string().min(0).max(200)
});

const SearchBar = ({ setQuery }: { setQuery: React.Dispatch<React.SetStateAction<string>> }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: ""
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setQuery(values.query);
    // form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-3">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitted} className="flexc gap-1">
          {form.formState.isSubmitted && <Loader2 className="size-4 animate-spin shrink-0" />}
          <Search />
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;

"use client";

import qs from "query-string";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const NavbarSearchBar = () => {
  const [value, setValue] = useState("");
  const router = useRouter();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: { term: value },
      },
      { skipEmptyString: true }
    );

    router.push(url);
  }

  function onClear() {
    setValue("");
  }
  return (
    <form
      onSubmit={onSubmit}
      className="md:w-[33%] lg:w-[30%] bg-zinc-900 rounded-md flex items-center"
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
        className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 w-full border-none outline-none bg-transparent"
      />
      {value && (
        <X
          role="button"
          onClick={onClear}
          className="cursor-pointer w-5 h-5 text-muted-foreground mr-2"
        />
      )}
      <Button type="submit" size={"sm"} variant={"ghost"}>
        <SearchIcon className="w-4 h-4" />
      </Button>
    </form>
  );
};

export default NavbarSearchBar;

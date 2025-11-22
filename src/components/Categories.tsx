import React from "react";
import { fetchData } from "@/app/actions/Server";
import CategoryList from "./CategoryList";

const Categories = async () => {
  const categoriesResponse = await fetchData({
    resourceName: "categories",
    cache: "force-cache",
    tags: ["categories"],
  });

  const categories = categoriesResponse?.data?.docs || [];

  return <CategoryList categories={categories} />;
};

export default Categories;

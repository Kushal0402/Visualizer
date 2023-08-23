"use client";

import { ProjectInterface, SessionInterface } from "@/common.types";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import Formfield from "./Formfield";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustomMenu";
import Button from "./Button";
import { createNewProject, fetchToken, updateProject } from "@/lib/actions";
import { useRouter } from "next/navigation";

const ProjectForm = ({
  type,
  session,
  project
}: {
  type?: string;
  session?: SessionInterface;
  project?: ProjectInterface;
}) => {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { token } = await fetchToken();
    try {
      if (type === "create") {
        await createNewProject(form, session?.user?.id!, token);
        router.push("/");
      } 

      if(type === 'edit') {
        await updateProject(form, project?.id as string, token);
        router.push('/');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file || !file.type.includes("image"))
      return alert("Please upload an Image file");

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange("image", result);
    };
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    title:project?.title || "",
    description:project?.description || "",
    image:project?.image || "",
    liveSiteUrl:project?.liveSiteUrl || "",
    githubUrl:project?.githubUrl || "",
    category:project?.category || "",
  });

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create" ? true : false}
          className="form_image-input"
          onChange={(e) => handleChangeImage(e)}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="image"
            fill
          />
        )}
      </div>

      <Formfield
        title="Title"
        state={form.title}
        placeholder="Visualizer"
        setState={(value) => handleStateChange("title", value)}
      />

      <Formfield
        title="Description"
        state={form.description}
        placeholder="Tell more about your project"
        setState={(value) => handleStateChange("description", value)}
      />

      <Formfield
        type="url"
        title="Website url"
        state={form.liveSiteUrl}
        placeholder="https://visualizer.com"
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />

      <Formfield
        type="url"
        title="Github Url"
        state={form.githubUrl}
        placeholder="https://gitbub.com/Kushal0402"
        setState={(value) => handleStateChange("githubUrl", value)}
      />

      <CustomMenu
        title="category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />

      <div className="flexStart w-full">
        <Button
          title={
            isSubmitting
              ? `${type === "create" ? "Creating" : "Editing"}`
              : `${type === "create" ? "Create" : "Edit"} `
          }
          type="submit"
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;

"use client";

import axiosInstance from "@/app/axiosInstance";
import { useAlertsContext } from "@/app/lib/contexts/AlertContext";
import { useAuthContext } from "@/app/lib/contexts/AppContext";
import { useIsClient } from "@/app/lib/contexts/useIsClient";
import {
  locationValidation,
  projectDescriptionValidation,
  projectEndDateValidation,
  projectStartDateValidation,
  projectTitleValidation,
} from "@/app/lib/forms/validationSchemas";
import { fetchLocations } from "@/app/lib/locations";
import { SelectInput, TextInput } from "@/components/formElements";
import TextAreaInput from "@/components/formElements/TextAreaInput";
import { differenceInDays } from "date-fns";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

// Project duration more than 90 days is considered long term
const SHORT_TERM_THRESHOLD = 90; // in days

export default function Projects() {
  const [locations, setLocations] = useState<any>();
  const isClient = useIsClient();
  const { addAlert, dismissAlert } = useAlertsContext();
  const { org, getOrg } = useAuthContext();

  const handleSubmit = async (values: any) => {
    // Calculate the duration in days and set the time commitment
    let timeCommitment;
    const difference = differenceInDays(values.endDate, values.startDate);
    timeCommitment =
      difference <= SHORT_TERM_THRESHOLD ? "SHORT_TERM" : "LONG_TERM";

    // Change date to ISO format
    values.startDate = new Date(values.startDate).toISOString();
    values.endDate = new Date(values.endDate).toISOString();

    try {
      const res = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/projects`,
        {
          organizationId: org.id,
          timeCommitment: timeCommitment,
          ...values,
        },
      );

      if (res.status === 201) {
        await getOrg(org.id);
        const id = addAlert({
          severity: "success",
          message: "Project created successfully",
        });
        setTimeout(() => {
          dismissAlert(id);
        }, 3000);
        handleClose();
      }
    } catch (error: any) {
      const id = addAlert({
        severity: "error",
        message:
          error?.response?.data?.message ||
          "Failed to create project. Please try again.",
      });
      setTimeout(() => {
        dismissAlert(id);
      }, 3000);
    }
  };

  // Close the modal
  const handleClose = () => {
    isClient &&
      (
        document.getElementById("create_new_project_modal") as HTMLDialogElement
      ).close();
  };

  // Fetch locations on page load
  useEffect(() => {
    fetchLocations().then((data) => {
      setLocations(data);
    });
  }, []);

  return (
    <div>
      <div className="flex w-full flex-row items-center justify-between text-2xl">
        <h3>Projects</h3>
        <button
          className="btn btn-primary"
          onClick={() =>
            isClient &&
            (
              document.getElementById(
                "create_new_project_modal",
              ) as HTMLDialogElement
            ).showModal()
          }
        >
          Create new project
        </button>
      </div>

      {/* Create new project dialog */}
      <dialog id="create_new_project_modal" className="modal">
        <div className="prose modal-box rounded-md lg:prose-lg">
          <h3>Add a New Project</h3>

          <Formik
            initialValues={{
              title: "",
              description: "",
              locationId: "",
              startDate: "",
              endDate: "",
            }}
            validationSchema={Yup.object({
              title: projectTitleValidation,
              description: projectDescriptionValidation,
              locationId: locationValidation.optional(),
              startDate: projectStartDateValidation,
              endDate: projectEndDateValidation,
            })}
            onSubmit={async (values) => {
              handleSubmit(values);
            }}
          >
            <Form className="flex flex-col gap-4">
              <TextInput
                label="Project Title"
                required
                props={{
                  name: "title",
                  type: "text",
                }}
              />

              <TextAreaInput
                label="Description"
                required
                props={{
                  name: "description",
                  rows: 4,
                }}
              />

              <SelectInput
                label="Location"
                props={{
                  name: "locationId",
                }}
              >
                <option>--Select your location--</option>
                {locations &&
                  locations.map((location: any) => {
                    return (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    );
                  })}
              </SelectInput>

              <div className="flex flex-row gap-3">
                <TextInput
                  label="Start Date"
                  required
                  props={{
                    name: "startDate",
                    type: "date",
                  }}
                />

                <TextInput
                  label="End Date"
                  required
                  props={{
                    name: "endDate",
                    type: "date",
                  }}
                />
              </div>

              <div className="flex flex-row gap-2">
                <button
                  className="btn btn-outline flex-grow"
                  type="reset"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button className="btn btn-primary flex-grow" type="submit">
                  Add Project
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </dialog>
    </div>
  );
}

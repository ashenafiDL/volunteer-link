"use client";

import axiosInstance from "@/app/axiosInstance";
import { useAlertsContext } from "@/app/lib/contexts/AlertContext";
import { useIsClient } from "@/app/lib/contexts/useIsClient";
import { TextInput } from "@/components/formElements";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import * as Yup from "yup";

export default function LocationsPage() {
  const [locations, setLocations] = useState<Array<any>>();
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const isClient = useIsClient();
  const { addAlert, dismissAlert } = useAlertsContext();

  const showModal = (id: string) => {
    isClient && (document.getElementById(id) as HTMLDialogElement).showModal();
  };

  const closeModal = (id: string) => {
    isClient && (document.getElementById(id) as HTMLDialogElement).close();
  };

  const handleAdd = async (values: { name: string; code: string }) => {
    try {
      const res = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/locations`,
        {
          name: values.name,
          code: values.code.toUpperCase(),
        },
      );

      if (res.status === 201) {
        const id = addAlert({
          message: "Location added successfully",
          severity: "success",
        });
        setTimeout(() => {
          dismissAlert(id);
        }, 3000);
        fetchLocations();
      }
    } catch (error: any) {
      const id = addAlert({
        message: error?.response?.data?.message || "Failed to add location",
        severity: "error",
      });
      setTimeout(() => {
        dismissAlert(id);
      }, 3000);
    } finally {
      closeModal("add_location_modal");
    }
  };

  const handleUpdate = async (
    values: { name: string; code: string },
    id: string,
  ) => {
    try {
      const res = await axiosInstance.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/locations/${id}`,
        {
          name: values.name,
          code: values.code.toUpperCase(),
        },
      );

      if (res.status === 200) {
        const id = addAlert({
          message: "Location updated successfully",
          severity: "success",
        });
        setTimeout(() => {
          dismissAlert(id);
        }, 3000);
        fetchLocations();
      }
    } catch (error: any) {
      const id = addAlert({
        message: error?.response?.data?.message || "Failed to update location",
        severity: "error",
      });
      setTimeout(() => {
        dismissAlert(id);
      }, 3000);
    } finally {
      closeModal("add_location_modal");
      setCurrentLocation(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await axiosInstance.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/locations/${id}`,
      );

      if (res.status === 200) {
        const id = addAlert({
          message: "Location deleted successfully",
          severity: "success",
        });
        setTimeout(() => {
          dismissAlert(id);
        }, 3000);
        fetchLocations();
      }
    } catch (error: any) {
      const id = addAlert({
        message: error?.response?.data?.message || "Failed to delete location",
        severity: "error",
      });
      setTimeout(() => {
        dismissAlert(id);
      }, 3000);
    } finally {
      closeModal("add_location_modal");
      setCurrentLocation(null);
    }
  };

  const fetchLocations = async () => {
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_URL}/locations`,
    );

    if (res.status === 200) {
      setLocations(res.data);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <>
      <div className="space-y-3 overflow-x-auto">
        <div className="flex flex-row items-center justify-between">
          <div className="card-title">Locations</div>

          <button
            className="btn btn-primary"
            onClick={() => showModal("add_location_modal")}
          >
            Add location
          </button>
        </div>

        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Short Code</th>
              <th>Name</th>
              <th>Users</th>
              <th>Projects</th>
              <th>Organizations</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {locations && locations.length > 0 ? (
              <>
                {locations.map((location, index) => {
                  return (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>
                        <div className="badge rounded-md">{location.code}</div>
                      </td>
                      <td>{location.name}</td>
                      <td>{location._count.users}</td>
                      <td>{location._count.projects}</td>
                      <td>{location._count.organizations}</td>
                      <td>
                        <div className="flex flex-row gap-2">
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              setCurrentLocation(location);
                              showModal("add_location_modal");
                            }}
                          >
                            <MdEdit size={16} />
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              setCurrentLocation(location);
                              handleDelete(location.id);
                            }}
                          >
                            <MdDelete size={16} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <tr className="text-center italic">
                <td colSpan={6}>There are no location data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add location dialog */}
      <dialog id="add_location_modal" className="modal">
        <div className="modal-box">
          <div className="card-title">Add location</div>
          <Formik
            initialValues={{
              name: currentLocation ? currentLocation.name : "",
              code: currentLocation ? currentLocation.name : "",
            }}
            validationSchema={Yup.object({
              name: Yup.string(),
              code: Yup.string(),
            })}
            onSubmit={async (values, { resetForm }) => {
              currentLocation
                ? handleUpdate(values, currentLocation.id)
                : handleAdd(values);

              resetForm();
            }}
          >
            <Form className="flex flex-col gap-4">
              <TextInput
                label="Short Code"
                props={{
                  name: "code",
                  type: "text",
                }}
              />

              <TextInput
                label="Name"
                props={{
                  name: "name",
                  type: "text",
                }}
              />

              <div className="space-x-2">
                <button
                  type="reset"
                  className="btn btn-outline"
                  onClick={() => closeModal("add_location_modal")}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {currentLocation ? "Update" : "Add"}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </dialog>
    </>
  );
}

"use client";

import axiosInstance from "@/app/axiosInstance";
import { useAlertsContext } from "@/app/lib/contexts/AlertContext";
import {
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  passwordValidation,
  repeatPasswordValidation,
  usernameValidation,
} from "@/app/lib/forms/validationSchemas";
import { TextInput } from "@/components/formElements";
import { formatDate } from "date-fns";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

export default function UsersPage() {
  const [users, setUsers] = useState<Array<any>>();
  const { addAlert, dismissAlert } = useAlertsContext();

  const handleUpdate = async (id: string, values: any) => {
    try {
      const res = await axiosInstance.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
        values,
      );

      if (res.status === 200) {
        const id = addAlert({
          message: "Updated successfully",
          severity: "success",
        });
        setTimeout(() => {
          dismissAlert(id);
        }, 3000);
        fetchUsers();
      }
    } catch (error: any) {
      const id = addAlert({
        message: error?.response?.data?.message || "Failed to update user",
        severity: "error",
      });
      setTimeout(() => {
        dismissAlert(id);
      }, 3000);
    }
  };

  const handleAdd = async (values: any) => {
    try {
      const res = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register-admin`,
        values,
      );

      if (res.status === 201) {
        const id = addAlert({
          severity: "success",
          message: "Admin created successfully.",
        });
        setTimeout(() => {
          dismissAlert(id);
        }, 3000);
        fetchUsers();
        (
          document.getElementById("add_admin_modal") as HTMLDialogElement
        ).close();
      }
    } catch (error: any) {
      const id = addAlert({
        severity: "error",
        message:
          error?.response?.data?.message ||
          "Failed to create admin. Please try again.",
      });
      setTimeout(() => {
        dismissAlert(id);
      }, 3000);
    }
  };

  const fetchUsers = async () => {
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users`,
    );

    if (res.status === 200) {
      setUsers(res.data);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="space-y-5">
        <div className="flex flex-row items-center justify-between">
          <div className="card-title">Users</div>

          <button
            className="btn btn-primary"
            onClick={() =>
              (
                document.getElementById("add_admin_modal") as HTMLDialogElement
              ).showModal()
            }
          >
            Add Admin
          </button>
        </div>

        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Email</th>
              <th>Bio</th>
              <th>Organization</th>
              <th>Location</th>
              <th>Social Links</th>
              <th>Last Logged in</th>
              <th>Role</th>
              <th>Created at</th>
              <th>Is Active?</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              <>
                {users.map((user, index) => {
                  return (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.username}</td>
                      <td>{user?.gender || "-"}</td>
                      <td>{user?.age || "-"}</td>
                      <td>{user.email}</td>
                      <td>{user?.bio || "-"}</td>
                      <td>{user?.organization?.name || "-"}</td>
                      <td>{user?.location?.name}</td>
                      <td>
                        {user?.socialLinks?.map((link: any, index: number) => {
                          return (
                            link.url && (
                              <span key={index}>{`${link.url}, `}</span>
                            )
                          );
                        })}
                      </td>
                      <td>
                        {user.lastLoggedInAt &&
                          formatDate(
                            user.lastLoggedInAt,
                            "MMM dd, yyyy hh:mm a",
                          )}
                      </td>
                      <td>{user.role.name}</td>
                      <td>{formatDate(user.createdAt, "MMM dd, yyyy")}</td>
                      <td>
                        {user.isActive ? (
                          <button
                            className="btn btn-error btn-xs"
                            onClick={() =>
                              handleUpdate(user.id, { isActive: false })
                            }
                          >
                            Deactivate
                          </button>
                        ) : (
                          <button
                            className="btn btn-success btn-xs"
                            onClick={() =>
                              handleUpdate(user.id, { isActive: true })
                            }
                          >
                            Activate
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <tr className="text-center italic">
                <td colSpan={14}>There are no users data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <dialog id="add_admin_modal" className="modal">
        <div className="modal-box">
          <h3 className="card-title mb-3">Add a new admin</h3>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              username: "",
              password: "",
              repeatPassword: "",
            }}
            validationSchema={Yup.object({
              firstName: firstNameValidation,
              lastName: lastNameValidation,
              email: emailValidation,
              username: usernameValidation,
              password: passwordValidation,
              repeatPassword: repeatPasswordValidation,
            })}
            onSubmit={async (values) => {
              handleAdd(values);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-2">
                <div className="flex flex-grow gap-4 xl:flex-row">
                  <TextInput
                    label="First Name"
                    props={{
                      name: "firstName",
                      type: "text",
                      autoComplete: "off",
                    }}
                  />

                  <TextInput
                    label="Last Name"
                    props={{
                      name: "lastName",
                      type: "text",
                      autoComplete: "off",
                    }}
                  />
                </div>

                <div className="flex flex-col gap-4 xl:flex-row">
                  <TextInput
                    label="Email"
                    props={{
                      name: "email",
                      type: "email",
                      autoComplete: "off",
                    }}
                  />

                  <TextInput
                    label="Username"
                    props={{
                      name: "username",
                      type: "text",
                      autoComplete: "off",
                    }}
                  />
                </div>

                <div className="flex flex-col gap-4 xl:flex-row">
                  <TextInput
                    label="Password"
                    props={{
                      name: "password",
                      type: "password",
                    }}
                  />

                  <TextInput
                    label="Repeat Password"
                    props={{
                      name: "repeatPassword",
                      type: "password",
                    }}
                  />
                </div>

                <div className="flex flex-row gap-2">
                  <button
                    disabled={isSubmitting}
                    type="reset"
                    className="btn btn-outline flex-grow"
                    onClick={() =>
                      (
                        document.getElementById(
                          "add_admin_modal",
                        ) as HTMLDialogElement
                      ).close()
                    }
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="btn btn-primary flex-grow"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </dialog>
    </>
  );
}

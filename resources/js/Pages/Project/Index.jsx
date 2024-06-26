import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import Pagination from "@/Components/Pagination.jsx";
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP} from "@/constants.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import TableHeading from "@/Components/TableHeading.jsx";
import {
     EyeIcon,
    PencilSquareIcon,
    PlusCircleIcon,
    TrashIcon
} from "@heroicons/react/16/solid/index.js";

export  default function Index({ auth, projects, queryParams = null, success }){
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("project.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("project.index"), queryParams);
  };

  const deleteProject = (project) => {
    if (!window.confirm("Are you sure you want to delete the project?")) {
      return;
    }
    router.delete(route("project.destroy", project.id));
  };


    return (
         <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Projects
                    </h2>

                      <Link className={"display-block"} href={route("project.create")}>
                           <PrimaryButton>
                              <PlusCircleIcon width={20}></PlusCircleIcon>
                               &ensp;Project
                         </PrimaryButton>
                      </Link>

                </div>
            }
         >
             <Head title="Projects"/>

             <div className="py-12">
                 <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                     {success && (
                         <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                             {success}
                         </div>)
                     }
                     <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <table
                                    className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead
                                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                      <TableHeading
                                        name="id"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}
                                      >
                                        ID
                                      </TableHeading>
                                      <th className="px-3 py-3">Image</th>
                                      <TableHeading
                                        name="name"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}
                                      >
                                        Name
                                      </TableHeading>

                                      <TableHeading
                                        name="status"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}
                                      >
                                        Status
                                      </TableHeading>

                                      <TableHeading
                                        name="created_at"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}
                                      >
                                        Create Date
                                      </TableHeading>

                                      <TableHeading
                                        name="due_date"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}
                                      >
                                        Due Date
                                      </TableHeading>
                                        <th className="px-3 py-3">Created By</th>
                                        <th className="px-3 py-3 text-center">Actions</th>
                                    </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3">
                                            <TextInput
                                                className="w-full"
                                                defaultValue={queryParams.name}
                                                placeholder="Project Name"
                                                onBlur={(e) =>
                                                    searchFieldChanged("name", e.target.value)
                                                }
                                                onKeyPress={(e) => onKeyPress("name", e)}
                                            />
                                        </th>
                                        <th className="px-3 py-3">
                                            <SelectInput
                                                className="w-full"
                                                defaultValue={queryParams.status}
                                                onChange={(e) =>
                                                    searchFieldChanged("status", e.target.value)
                                                }
                                            >
                                                <option value="">All Status</option>
                                                <option value="pending">Pending</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </SelectInput>
                                        </th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {projects.data.map((project) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            key={project.id}
                                        >
                                            <td className="px-3 py-2">
                                                <PrimaryButton className="ms-4">
                                                    {project.id}
                                                </PrimaryButton>
                                            </td>
                                            <td className="px-3 py-2">
                                                <img src={project.image_path} style={{width: 60}} alt={project.name}/>
                                            </td>
                                            <th className="px-3 py-2 text-gray-100 text-nowrap hover:underline">
                                                <Link href={route("project.show", project.id)}>
                                                    {project.name}
                                                </Link>
                                            </th>
                                            <td className="px-3 py-2">
                                                <span className={"px-2 py-1 rounded text-white " +
                                                    PROJECT_STATUS_CLASS_MAP[project.status]
                                                }
                                                >
                                                  {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">
                                                {project.created_at}
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">
                                                {project.due_date}
                                            </td>
                                            <td className="px-3 py-2">{project.createdBy.name}</td>
                                            <td className="px-3 py-2 text-nowrap">

                                                <button
                                                    className="inline-flex items-center px-3 py-2 bg-white dark:bg-indigo-500 border border-indigo-300 dark:border-indigo-500 rounded-md font-semibold text-xs text-gray-600 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150"
                                                >
                                                    <Link href={route("project.show", project.id)}
                                                    >
                                                       <EyeIcon width={15} color={"white"} />
                                                    </Link>
                                                </button>&ensp;&ensp;

                                                <button
                                                    className="inline-flex items-center px-3 py-2 bg-white dark:bg-indigo-500 border border-indigo-300 dark:border-indigo-500 rounded-md font-semibold text-xs text-gray-600 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150"
                                                >
                                                    <Link href={route("project.edit", project.id)}
                                                    >
                                                       <PencilSquareIcon width={15} color={"white"} />
                                                    </Link>
                                                </button>&ensp;&ensp;

                                                <button
                                                    onClick={(e) => deleteProject(project)}
                                                    className="inline-flex items-center px-3 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                                >
                                                    <TrashIcon width={15}/>
                                                </button>

                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={projects.meta.links}/>
                        </div>
                     </div>
                 </div>
             </div>
         </AuthenticatedLayout>
    )
}

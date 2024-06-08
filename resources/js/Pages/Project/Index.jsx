import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import Pagination from "@/Components/Pagination.jsx";

export  default function Index({ auth, projects }){
    return (
         <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Projects</h2>}
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <table
                                    className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead
                                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3">ID</th>
                                        <th className="px-3 py-3">Image</th>
                                        <th className="px-3 py-3">Name</th>
                                        <th className="px-3 py-3">Status</th>
                                        <th className="px-3 py-3">Due Date</th>
                                        <th className="px-3 py-3">Created By</th>
                                        <th className="px-3 py-3 text-right">Actions</th>
                                    </tr>
                                    </thead>
                                    <thead
                                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>

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
                                                   { project.id }
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
                                            <th className="px-3 py-2 text-gray-100 text-nowrap hover:underline">
                                                    {project.status}
                                            </th>
                                            {/*<td className="px-3 py-2">*/}
                                            {/*    /!*<span className={"px-2 py-1 rounded text-white " +*!/*/}
                                            {/*    /!*        PROJECT_STATUS_CLASS_MAP[project.status]*!/*/}
                                            {/*    /!*    }*!/*/}
                                            {/*    /!*>*!/*/}
                                            {/*    /!*  {PROJECT_STATUS_TEXT_MAP[project.status]}*!/*/}
                                            {/*    /!*</span>*!/*/}
                                            {/*</td>*/}
                                            <td className="px-3 py-2 text-nowrap">
                                                {project.due_date}
                                            </td>
                                            <td className="px-3 py-2">{project.createdBy.name}</td>
                                            <td className="px-3 py-2 text-nowrap">
                                                <SecondaryButton>
                                                     <Link
                                                    href={route("project.edit", project.id)}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:cursor-pointer"
                                                >
                                                    Edit
                                                </Link>
                                                </SecondaryButton>&ensp;&ensp;

                                                <DangerButton>
                                                    <Link
                                                    href={route("project.destroy", project.id)}
                                                    className="font-medium text-white-600 dark:text-white-500 hover:cursor-pointer"
                                                >
                                                    Delete
                                                </Link>
                                                </DangerButton>

                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                             <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
         </AuthenticatedLayout>
    )
}

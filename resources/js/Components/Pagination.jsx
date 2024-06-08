import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
  return (
    <nav className="text-center mt-4">
      {links.map((link) => (
        <Link
          preserveScroll
          href={link.url || ""}
          key={link.label}
          className={
            "inline-block py-2 px-4 m-1 rounded-md text-gray-200 text-xs " +
            (link.active ? "bg-indigo-500 " : " ") +
            (!link.url ? "!text-gray-300 cursor-not-allowed" : "hover:bg-indigo-500")
          }
          dangerouslySetInnerHTML={{ __html: link.label }}
        ></Link>
      ))}
    </nav>
  );
}

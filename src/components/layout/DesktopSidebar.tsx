import { NavContent } from "./NavContent";

export function DesktopSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-md md:flex md:flex-col">
      <NavContent />
    </aside>
  );
}

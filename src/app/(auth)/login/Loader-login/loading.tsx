/* eslint-disable @typescript-eslint/no-unused-vars */
import { Loader2 } from "lucide-react";

export function LoadingForm() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid gap-2">
        <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-md" />
        <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-md" />
      </div>
      <div className="space-y-4">
        <div className="h-20 bg-slate-100 dark:bg-slate-800 rounded-md" />
        <div className="h-20 bg-slate-100 dark:bg-slate-800 rounded-md" />
        <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-md" />
      </div>
    </div>
  );
}
import React from 'react';
import useToastStore from '../store/ToastStore';

export default function Toaster() {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none font-sans">
      {toasts.map((toast) => {
        let bgClass = "bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800 shadow-xl";
        let icon = "info";
        let iconColor = "text-blue-500";

        if (toast.type === "success") {
          bgClass = "bg-emerald-50/95 dark:bg-emerald-950/95 text-emerald-800 dark:text-emerald-250 border-emerald-250 dark:border-emerald-900 shadow-xl";
          icon = "check_circle";
          iconColor = "text-emerald-500";
        } else if (toast.type === "error") {
          bgClass = "bg-rose-50/95 dark:bg-rose-950/95 text-rose-800 dark:text-rose-250 border-rose-250 dark:border-rose-900 shadow-xl";
          icon = "error";
          iconColor = "text-rose-500";
        } else if (toast.type === "warning") {
          bgClass = "bg-amber-50/95 dark:bg-amber-950/95 text-amber-800 dark:text-amber-250 border-amber-250 dark:border-amber-900 shadow-xl";
          icon = "warning";
          iconColor = "text-amber-500";
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 animate-in slide-in-from-top-4 ${bgClass}`}
          >
            <span className={`material-symbols-outlined ${iconColor} mt-0.5 text-[20px]`}>{icon}</span>
            <div className="flex-1 text-sm font-medium leading-relaxed">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-muted-foreground hover:text-foreground active:scale-90 transition-transform p-0.5 rounded-full cursor-pointer flex items-center"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

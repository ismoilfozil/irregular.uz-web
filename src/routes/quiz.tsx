import { createFileRoute, Outlet, Link, useLocation } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/quiz")({
  component: QuizLayout,
});

function QuizLayout() {
  const location = useLocation();
  const isHub = location.pathname === "/quiz" || location.pathname === "/quiz/";

  return (
    <div>
      {!isHub && (
        <div className="container mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Quiz rejimlariga qaytish
          </Link>
        </div>
      )}
      <Outlet />
    </div>
  );
}

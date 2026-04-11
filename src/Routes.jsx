import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";

import TariffSimulationBuilder from "./pages/tariff-simulation-builder";
import ScenarioComparison from "./pages/scenario-comparison";
import NMEOOPProgressTracker from "./pages/nmeo-op-progress-tracker";
import OverviewDashboard from "./pages/overview-dashboard";
import LandCultivationAnalysis from "./pages/land-cultivation-analysis";

import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import AuditLogsPage from "./pages/audit/AuditLogsPage";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>

          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Root redirect to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Protected Routes */}
          <Route
            path="/tariff-simulation-builder"
            element={
              <ProtectedRoute>
                <TariffSimulationBuilder />
              </ProtectedRoute>
            }
          />

          <Route
            path="/scenario-comparison"
            element={
              <ProtectedRoute>
                <ScenarioComparison />
              </ProtectedRoute>
            }
          />

          <Route
            path="/nmeo-op-progress-tracker"
            element={
              <ProtectedRoute>
                <NMEOOPProgressTracker />
              </ProtectedRoute>
            }
          />

          <Route
            path="/overview-dashboard"
            element={
              <ProtectedRoute>
                <OverviewDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/land-cultivation-analysis"
            element={
              <ProtectedRoute>
                <LandCultivationAnalysis />
              </ProtectedRoute>
            }
          />

          {/* Audit Logs Route */}
          <Route
            path="/audit-logs"
            element={
              <ProtectedRoute>
                <AuditLogsPage />
              </ProtectedRoute>
            }
          />

          {/* Catch All */}
          <Route path="*" element={<NotFound />} />

        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
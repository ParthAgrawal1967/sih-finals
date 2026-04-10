import Icon from "../AppIcon";

const API_BASE = import.meta.env.VITE_REACT_API_BASE_URL;

const ExportFormatModal = ({ onClose, simulationData }) => {

  const downloadExcel = async () => {
    const res = await fetch(`${API_BASE}/export/excel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(simulationData)
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "simulation_results.xlsx";
    a.click();

    onClose();
  };

  const downloadPDF = async () => {
    const res = await fetch(`${API_BASE}/export/pdf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(simulationData)
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "simulation_report.pdf";
    a.click();

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-80">
        <h2 className="text-lg font-semibold mb-4">Export Format</h2>

        <button
          onClick={downloadExcel}
          className="w-full px-4 py-2 mb-3 bg-primary text-white rounded-md flex items-center justify-center"
        >
          <Icon name="FileSpreadsheet" size={18} className="mr-2" />
          Export as Excel
        </button>

        <button
          onClick={downloadPDF}
          className="w-full px-4 py-2 bg-accent text-white rounded-md flex items-center justify-center"
        >
          <Icon name="FileText" size={18} className="mr-2" />
          Export as PDF
        </button>

        <button
          onClick={onClose}
          className="w-full mt-4 text-sm text-muted-foreground hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ExportFormatModal;
